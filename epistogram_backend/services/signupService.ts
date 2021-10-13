import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { UserSignupCompletedView } from "../models/views/UserSignupCompletedView";
import { staticProvider } from "../staticProvider";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { sendInvitaitionMailAsync } from "./emailService";
import { toQuestionAnswerDTO, toQuestionDTO } from "./mappings";
import { hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { answerSignupQuestionFn } from "./sqlServices/sqlFunctionsService";
import { createInvitationToken, verifyInvitaionToken } from "./tokenService";
import { getUserByEmail, getUserById } from "./userService";

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

    const user = await createUserAsync(
        email,
        firstName,
        lastName,
        organizationId,
        null,
        roleId,
        jobTitle,
        true);

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
    organizationId: number | null,
    phoneNumber: string | null,
    roleId: number | null,
    jobTitle: string | null,
    isInvited: boolean) => {

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists. Email: " + email, "bad request");

    // hash user password 
    const hashedDefaultPassword = await hashPasswordAsync("guest");

    // set default user fileds
    const user = {
        email,
        roleId: roleId ?? UserRoleEnum.userId,
        firstName,
        lastName,
        jobTitle,
        phoneNumber,
        organizationId,
        password: hashedDefaultPassword,
        isPendingInvitation: isInvited,
        isTrusted: isInvited
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
            isSignupAnswerSession: true,
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

export const answerSignupQuestionAsync = async (userId: number, questionAnswer: QuestionAnswerDTO) => {

    await answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
}

export const getSignupDataAsync = async (userId: number) => {

    const questions = await getSignupQuestionsAsync();
    const questionAnswers = await getSignupQuestionAnswersAsync(userId);

    const userSignupCompltedView = await staticProvider
        .ormConnection
        .getRepository(UserSignupCompletedView)
        .findOneOrFail({
            where: {
                userId
            }
        });

    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers,
        isCompleted: userSignupCompltedView.isCompletedSignup
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
