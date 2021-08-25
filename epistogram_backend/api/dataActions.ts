import { Request } from "express";
import { getUserIdFromRequest } from "../services/authentication";
import { getOverviewPageDTOAsync } from "../services/dataService";

export const getOverviewPageDTOAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOverviewPageDTOAsync(userId);
}