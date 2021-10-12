import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { getUserLoginTokens } from "./authenticationService";
import { sendInvitaitionMailAsync } from "./emailService";
import { toQuestionAnswerDTO, toQuestionDTO } from "./mappings";
import { hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { answerSignupQuestionFn } from "./sqlServices/sqlFunctionsService";
import { createInvitationToken, verifyInvitaionToken, verifyRegistrationToken } from "./tokenService";
import { getUserByEmail, getUserById, getUserDTOById } from "./userService";

const SIGNUP_EXAM_ID = 1;

export const createInvitedUserAsync = async (dto: CreateInvitedUserDTO, currentUserId: number) => {

    const currentUser = await getUserById(currentUserId);

    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.roleId === UserRoleEnum.administratorId
        ? withValueOrBadRequest(dto.organizationId)
        : currentUser.organizationId;

    return createInvitedUserWithOrgAsync(dto, organizationId, true);
}

export const createInvitedUserWithOrgAsync = async (dto: CreateInvitedUserDTO, organizationId: number, sendEmail: boolean) => {

    // get and check sent data 
    const email = withValueOrBadRequest(dto.email);
    const roleId = withValueOrBadRequest(dto.roleId);
    const firstName = withValueOrBadRequest(dto.firstName);
    const lastName = withValueOrBadRequest(dto.lastName);
    const jobTitle = withValueOrBadRequest(dto.jobTitle);
    const userFullName = `${lastName} ${firstName}`;

    const user = await createUserAsync(email, firstName, lastName, null, roleId, jobTitle);
    const userId = user.id;
    const invitationToken = createInvitationToken(userId);

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            invitationToken: invitationToken
        });

    if (sendEmail) {

        log("Sending mail... to: " + email);
        await sendInvitaitionMailAsync(invitationToken, email, userFullName);
    }

    return { invitationToken, user };
}

export const createUserAsync = async (
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    roleId: number | null,
    jobTitle: string | null) => {

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists. Email: " + email, "bad request");

    // hash user password 
    const hashedDefaultPassword = await hashPasswordAsync("guest");

    // set default user fileds
    const user = {
        email,
        roleId,
        firstName,
        lastName,
        jobTitle,
        phoneNumber,
        password: hashedDefaultPassword,
        isActive: true,
        isInvitedOnly: true
    } as User;

    // insert user
    await staticProvider
        .ormConnection
        .getRepository(User)
        .insert(user);

    const userId = (user as User).id;

    // insert signup answer session
    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert({
            examId: SIGNUP_EXAM_ID,
            userId: userId
        });

    // insert practise answer session
    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert({
            userId: userId,
            isPractiseAnswerSession: true
        });

    return user;
}

export const finalizeUserRegistrationAsync = async (dto: FinalizeUserRegistrationDTO) => {

    const invitationToken = withValueOrBadRequest(dto.invitationToken);
    const controlPassword = withValueOrBadRequest(dto.controlPassword);
    const password = withValueOrBadRequest(dto.password);
    const phoneNumber = withValueOrBadRequest(dto.phoneNumber);
    const tokenPayload = verifyInvitaionToken(invitationToken);

    const userDTO = await getUserDTOById(tokenPayload.userId);
    if (!userDTO)
        throw new TypedError("Invited user not found by id: " + tokenPayload.userId, "bad request");

    if (password != controlPassword)
        throw new TypedError("Passwords are not equal!", "bad request");

    // hash password
    const hashedPassword = await hashPasswordAsync(password);

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: tokenPayload.userId,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            invitationToken: "",
            isInvitedOnly: false
        });

    const { accessToken, refreshToken } = await getUserLoginTokens(userDTO.id);

    return {
        accessToken,
        refreshToken
    }
}

export const answerSignupQuestionAsync = async (invitationToken: string, questionAnswer: QuestionAnswerDTO) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);

    await answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);

    // const signupAnswerSession = await staticProvider
    //     .ormConnection
    //     .getRepository(AnswerSession)
    //     .findOneOrFail({
    //         where: {
    //             examId: SIGNUP_EXAM_ID,
    //             userId: userId
    //         }
    //     });

    // await answerQuestionAsync(
    //     signupAnswerSession.id,
    //     questionAnswer.questionId,
    //     questionAnswer.answerId,
    //     true);
}

export const getSignupDataAsync = async (invitationToken: string, isRegistration: boolean) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);
    const questions = await getSignupQuestionsAsync();
    const questionAnswers = await getSignupQuestionAnswersAsync(userId);

    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers
    } as SignupDataDTO;

    return dataDTO;
}

const verifyInvitationTokenAsync = async (invitationToken: string) => {

    const invitationTokenPayload = verifyInvitaionToken(invitationToken);
    const userId = invitationTokenPayload.userId;

    const user = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("u")
        .where("u.id = :userId", { userId })
        .getOneOrFail();

    // check if token matches user's in the DB
    // this also protects agains modifying users data 
    // with the same token after the user is registerd,
    // since the token is removed from the DB after finalization
    if (user.invitationToken != invitationToken)
        throw new TypedError("Bad token.", "bad request");

    return userId;
}

const getSignupQuestionsAsync = async () => {

    const exam = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .where("e.courseId IS NULL AND e.id = 1")
        .leftJoinAndSelect("e.questions", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getOneOrFail();

    return exam
        .questions
        .map(x => toQuestionDTO(x));
}

const getSignupQuestionAnswersAsync = async (userId: number) => {

    const exam = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .where("e.courseId IS NULL AND e.id = 1")
        .leftJoinAndSelect("e.questions", "q")
        .leftJoinAndSelect("q.questionAnswers", "qa")
        .leftJoinAndSelect("qa.answerSession", "as")
        .where("as.userId = :userId", { userId })
        .getOne();

    return exam
        ?.questions
        ?.flatMap(question => question
            .questionAnswers
            .orderBy(x => x.creationDate)
            .last(x => true))
        ?.map(qa => toQuestionAnswerDTO(qa)) ?? [];
}
