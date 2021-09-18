import { Request } from "express";
import { getUserIdFromRequest } from "../services/authentication";
import { deleteUserAsync } from "../services/userManagementService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const deleteUserAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const deleteUserId = withValueOrBadRequest(withValueOrBadRequest(req.body).userId);

    return deleteUserAsync(userId, deleteUserId);
});