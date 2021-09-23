import Cookies from "universal-cookie";
import { hasValue, useReactQuery } from "../frontendHelpers";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { PersonalityAssessmentDTO } from "../models/shared_models/PersonalityAssessmentDTO";
import { PersonalityDataDTO } from "../models/shared_models/PersonalityDataDTO";
import { httpGetAsync } from "./httpClient";

export const useCurrentCourseItemCode = () => {

    const qr = useReactQuery(
        ["getCurrentCourseItemCode"],
        () => httpGetAsync("/get-current-course-item-code"));

    return hasValue(qr.data) ? qr.data as string : null;
}

export const usePersonalityData = () => {

    const qr = useReactQuery<PersonalityAssessmentDTO>(
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

export const tipOfTheDay = "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!"