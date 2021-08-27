import { getTypeORMConnection } from "../database";
import { User } from "../models/entity/User";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { InvitationTokenPayload, RoleType } from "../models/shared_models/types/sharedTypes";
import { globalConfig } from "../server";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";
import { getUserLoginTokens } from "./authentication";
import { hashPasswordAsync } from "./misc/crypt";
import { sendInvitaitionMailAsync } from "./emailService";
import { getJWTToken, verifyJWTToken } from "./misc/jwtGen";
import { getUserByEmail, getUserById, getUserDTOById } from "./userService";
import { log } from "./misc/logger";

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
        jobTitle: jobTitle
    } as User;

    const insertResults = await getTypeORMConnection()
        .getRepository(User)
        .insert(user);

    const userId = user.id;

    // send invitaion mail
    const invitationToken = getJWTToken<InvitationTokenPayload>(
        { userId: userId },
        globalConfig.mail.tokenMailSecret,
        "24h");

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

    const tokenPayload = verifyJWTToken<InvitationTokenPayload>(invitationToken, globalConfig.mail.tokenMailSecret);
    if (!tokenPayload)
        throw new TypedError("Invitation token is invalid or expired!", "forbidden");

    const userDTO = await getUserDTOById(tokenPayload.userId);
    if (!userDTO)
        throw new TypedError("Invited user not found by id: " + tokenPayload.userId, "bad request");

    if (password != controlPassword)
        throw new TypedError("Passwords are not equal!", "bad request");

    // hash password
    const hashedPassword = await hashPasswordAsync(password);

    await getTypeORMConnection()
        .getRepository(User)
        .save({
            id: tokenPayload.userId,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });

    const { accessToken, refreshToken } = await getUserLoginTokens(userDTO);

    return {
        accessToken,
        refreshToken
    }
}