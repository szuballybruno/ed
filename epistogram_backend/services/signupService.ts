import { AnswerSession } from "../models/entity/AnswerSession";
import { User } from "../models/entity/User";
import { AnswerSignupQuestionDTO } from "../models/shared_models/AnswerSignupQuestionDTO";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { SignupQuestionView } from "../models/views/SignupQuestionView";
import { SignupCompletedView } from "../models/views/SignupCompletedView";
import { staticProvider } from "../staticProvider";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { sendInvitaitionMailAsync } from "./emailService";
import { toSignupDataDTO } from "./mappings";
import { hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { createInvitationToken } from "./tokenService";
import { getUserByEmail, getUserById } from "./userService";

const SIGNUP_EXAM_ID = 1;

export const createInvitedUserAsync = async (dto: CreateInvitedUserDTO, currentUserId: number) => {

    const currentUser = await getUserById(currentUserId);

    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.roleId === UserRoleEnum.administratorId
        ? withValueOrBadRequest<number>(dto.organizationId, "number")
        : currentUser.organizationId;

    if (!organizationId)
        throw new TypedError("Current user is not an administrator, but has rights to add users, but has no organization, in which he/she could add users.", "bad request")

    return createInvitedUserWithOrgAsync(dto, organizationId, true);
}

export const createInvitedUserWithOrgAsync = async (dto: CreateInvitedUserDTO, organizationId: number, sendEmail: boolean) => {

    // get and check sent data 
    const email = withValueOrBadRequest<string>(dto.email);
    const roleId = withValueOrBadRequest<number>(dto.roleId, "number");
    const firstName = withValueOrBadRequest<string>(dto.firstName);
    const lastName = withValueOrBadRequest<string>(dto.lastName);
    const jobTitleId = withValueOrBadRequest<number>(dto.jobTitleId, "number");
    const userFullName = `${lastName} ${firstName}`;

    const user = await createUserAsync(
        email,
        firstName,
        lastName,
        organizationId,
        null,
        roleId,
        jobTitleId,
        true,
        "guest");

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
    jobTitleId: number | null,
    isInvited: boolean,
    password: string) => {

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists. Email: " + email, "bad request");

    // hash user password 
    const hashedPassword = await hashPasswordAsync(password);

    // set default user fileds
    const user = {
        email,
        roleId: roleId ?? UserRoleEnum.userId,
        firstName,
        lastName,
        jobTitleId,
        phoneNumber,
        organizationId,
        password: hashedPassword,
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

export const answerSignupQuestionAsync = async (userId: number, questionAnswer: AnswerSignupQuestionDTO) => {

    await staticProvider
        .services
        .sqlFunctionService
        .answerSignupQuestionFn(userId, questionAnswer.questionId, questionAnswer.answerId);
}

export const getSignupDataAsync = async (userId: number) => {

    const userSignupCompltedView = await staticProvider
        .ormConnection
        .getRepository(SignupCompletedView)
        .findOneOrFail({
            where: {
                userId
            }
        });

    const questions = await staticProvider
        .ormConnection
        .getRepository(SignupQuestionView)
        .createQueryBuilder("sqv")
        .where("sqv.userId = :userId", { userId })
        .getMany();

    return toSignupDataDTO(questions, userSignupCompltedView.isSignupComplete);
}
