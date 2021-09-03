import Cookies from "universal-cookie";
import { useReactQuery } from "../frontendHelpers";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { httpGetAsync } from "./httpClient";

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

export const useOverviewPageDTO = () => {

    const queryRes = useReactQuery<OverviewPageDTO>(
        ["overviewPageDTOQuery"],
        () => httpGetAsync("data/get-overview-page-dto"));

    return {
        pageDTO: queryRes.data,
        status: queryRes.status,
        error: queryRes.error
    }
}