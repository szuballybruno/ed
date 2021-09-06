import { User } from "../models/entity/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { getUserLoginTokens } from "./authentication";
import { sendInvitaitionMailAsync } from "./emailService";
import { hashPasswordAsync } from "./misc/crypt";
import { getJWTToken, verifyJWTToken } from "./misc/jwtGen";
import { log } from "./misc/logger";
import { answerQuestionAsync } from "./questionAnswerService";
import { getQuestionAnswersAsync, getStartupQuestionsAsync } from "./questionService";
import { getUserByEmail, getUserById, getUserDTOById } from "./userService";

export const createInvitedUserAsync = async (dto: CreateInvitedUserDTO, currentUserId: number) => {

    const currentUser = await getUserById(currentUserId);

    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.role === "admin"
        ? withValueOrBadRequest(dto.organizationId)
        : currentUser.organizationId;

    return createInvitedUserWithOrgAsync(dto, organizationId, true);
}

export const createInvitedUserWithOrgAsync = async (dto: CreateInvitedUserDTO, organizationId: number, sendEmail: boolean) => {

    // get and check sent data 
    const email = withValueOrBadRequest(dto.email);
    const role = withValueOrBadRequest(dto.role);
    const firstName = withValueOrBadRequest(dto.firstName);
    const lastName = withValueOrBadRequest(dto.lastName);
    const jobTitle = withValueOrBadRequest(dto.jobTitle);
    const userFullName = `${lastName} ${firstName}`;

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists.", "bad request");

    // hash user password 
    const hashedDefaultPassword = await hashPasswordAsync("guest");

    const user = {
        isActive: true,
        email: email,
        role: role,
        firstName: firstName,
        lastName: lastName,
        organizationId: organizationId,
        password: hashedDefaultPassword,
        jobTitle: jobTitle,
        isInvitedOnly: true
    } as User;

    const insertResults = await staticProvider
        .ormConnection
        .getRepository(User)
        .insert(user);

    const userId = user.id;

    // send invitaion mail
    const invitationToken = getJWTToken<InvitationTokenPayload>(
        { userId: userId },
        staticProvider.globalConfig.mail.tokenMailSecret,
        "9924h");

    await await staticProvider
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

export const finalizeUserRegistrationAsync = async (dto: FinalizeUserRegistrationDTO) => {

    const invitationToken = withValueOrBadRequest(dto.invitationToken);
    const controlPassword = withValueOrBadRequest(dto.controlPassword);
    const password = withValueOrBadRequest(dto.password);
    const phoneNumber = withValueOrBadRequest(dto.phoneNumber);

    const tokenPayload = verifyJWTToken<InvitationTokenPayload>(invitationToken, staticProvider.globalConfig.mail.tokenMailSecret);
    if (!tokenPayload)
        throw new TypedError("Invitation token is invalid or expired!", "forbidden");

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

    const { accessToken, refreshToken } = await getUserLoginTokens(userDTO);

    return {
        accessToken,
        refreshToken
    }
}

export const answerSignupQuestionAsync = async (invitationToken: string, questionAnswer: QuestionAnswerDTO) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);

    await answerQuestionAsync(userId, questionAnswer.questionId, questionAnswer.answerId);
}

export const getSignupDataAsync = async (invitationToken: string) => {

    const userId = await verifyInvitationTokenAsync(invitationToken);
    const questions = await getStartupQuestionsAsync();
    const questionAnswers = await getQuestionAnswersAsync(userId);

    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers
    } as SignupDataDTO;

    return dataDTO;
}

const verifyInvitationTokenAsync = async (invitationToken: string) => {

    const invitationTokenPayload = verifyJWTToken<InvitationTokenPayload>(
        invitationToken, staticProvider.globalConfig.mail.tokenMailSecret);

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