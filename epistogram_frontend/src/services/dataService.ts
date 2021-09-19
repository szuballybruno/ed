import Cookies from "universal-cookie";
import { hasValue, useReactQuery } from "../frontendHelpers";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { PersonalityDataDTO } from "../models/shared_models/PersonalityDataDTO";
import { httpGetAsync } from "./httpClient";

export const useCurrentCourseItemCode = () => {

    const qr = useReactQuery(
        ["getCurrentCourseItemCode"],
        () => httpGetAsync("/get-current-course-item-code"));

    return hasValue(qr.data) ? qr.data as string : null;
}

export const usePersonalityData = () => {

    const qr = useReactQuery<PersonalityDataDTO>(
        ["usePersonalityData"],
        () => httpGetAsync("/get-user-personality-data"));

    return {
        personalityData: qr.data,
        personalityDataState: qr.status,
        personalityDataError: qr.error
    };
}

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