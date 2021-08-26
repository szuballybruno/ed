import { Request, Response } from "express";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { globalConfig } from "../server";
import { getUserIdFromRequest, setAuthCookies } from "../services/authentication";
import { sendResetPasswordMailAsync } from "../services/emailService";
import { getJWTToken } from "../services/misc/jwtGen";
import { createInvitedUserAsync, finalizeUserRegistrationAsync } from "../services/userManagementService";
import { getUserById } from "../services/userService";
import { TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const createInvitedUserAction = async (req: Request) => {

    const currentUserId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as CreateInvitedUserDTO;

    await createInvitedUserAsync(dto, currentUserId);
};

export const finalizeUserRegistrationAction = async (req: Request, res?: Response) => {

    const dto = withValueOrBadRequest(req.body) as FinalizeUserRegistrationDTO;

    const { accessToken, refreshToken } = await finalizeUserRegistrationAsync(dto);

    setAuthCookies(res as Response, accessToken, refreshToken);
};

export const resetUserPasswordAction = async (req: Request) => {

    const userId = parseInt(req.params.userId);

    // get user 
    const user = await getUserById(userId);
    if (!user)
        throw new TypedError("User not found.", "bad request");

    // get reset token
    const resetPawsswordToken = await getJWTToken({ userId: user.id }, globalConfig.mail.tokenMailSecret, "24h");

    // send mail
    const userFullName = `${user.lastName} ${user.firstName}`;
    await sendResetPasswordMailAsync(user.email, userFullName, resetPawsswordToken);
};