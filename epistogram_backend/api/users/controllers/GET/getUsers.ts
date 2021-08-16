import { NextFunction, Request, Response } from "express";
import { getAdminPageUsersList } from '../../../../services/adminService';
import { getUserIdFromRequest } from '../../../../services/authentication';

export const getUsersAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const adminPageUserDTOs = await getAdminPageUsersList(userId, (req.query.searchData as string) ?? "");

    return adminPageUserDTOs;
};
