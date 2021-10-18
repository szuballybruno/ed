import { Request } from "express";
import { getUserIdFromRequest } from "../services/authenticationService";
import { deleteUserAsync } from "../services/userManagementService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const deleteUserAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<any>(req.body);
    const deleteUserId = withValueOrBadRequest<number>(dto.userId);

    return deleteUserAsync(userId, deleteUserId);
});