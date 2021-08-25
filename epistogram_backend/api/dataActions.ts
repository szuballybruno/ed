import { Request } from "express";
import { getAdminPageUsersList } from "../services/adminService";
import { getUserIdFromRequest } from "../services/authentication";
import { getOverviewPageDTOAsync } from "../services/dataService";

export const getOverviewPageDTOAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOverviewPageDTOAsync(userId);
}

export const getUsersAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const adminPageUserDTOs = await getAdminPageUsersList(userId, (req.query.searchData as string) ?? "");

    return adminPageUserDTOs;
};