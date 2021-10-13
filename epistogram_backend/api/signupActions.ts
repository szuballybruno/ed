import { Request } from "express";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { createInvitedUserAsync } from "../services/signupService";
import { withValueOrBadRequest } from "../utilities/helpers";

export const createInvitedUserAction = async (req: Request) => {

    const currentUserId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as CreateInvitedUserDTO;

    await createInvitedUserAsync(dto, currentUserId);
};