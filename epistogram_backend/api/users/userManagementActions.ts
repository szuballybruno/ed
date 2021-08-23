import { Request } from "express";
import { CreateInvitedUserDTO } from "../../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../../models/shared_models/FinalizeUserRegistrationDTO";
import { getUserIdFromRequest, setAuthCookies } from "../../services/authentication";
import { createInvitedUserAsync, finalizeUserRegistrationAsync } from "../../services/userManagementService";
import { ExpressResponse, withValueOrBadRequest } from "../../utilities/helpers";

export const createInvitedUserAction = async (req: Request) => {

    const currentUserId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as CreateInvitedUserDTO;

    await createInvitedUserAsync(dto, currentUserId);
};

export const finalizeUserRegistrationAction = async (req: Request, res?: ExpressResponse) => {

    const dto = withValueOrBadRequest(req.body) as FinalizeUserRegistrationDTO;

    const { accessToken, refreshToken } = await finalizeUserRegistrationAsync(dto);

    setAuthCookies(res as ExpressResponse, accessToken, refreshToken);
};