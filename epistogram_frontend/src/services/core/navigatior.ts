import { useHistory } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { CourseStageNameType } from "../../models/shared_models/types/sharedTypes";
import { ApplicationRoute } from "../../models/types";
import { verboseLogging } from "../../static/Environemnt";
import { getUrl } from "../../static/frontendHelpers";

// asd
export const useNavigation = () => {

    const history = useHistory();

    const navigate = (path: string | ApplicationRoute, params?: any, query?: any) => {

        const pathAsAny = path as any;
        const replacedPath = getUrl(pathAsAny.route ? pathAsAny.route : path, params, query);

        if (verboseLogging)
            console.log("Navigating to: " + replacedPath);

        history.push(replacedPath);
    }

    const openNewTab = (url: string) => (window as any).open(url, '_blank').focus();

    const navigateToPlayer = (descriptorCode: string) => navigate(applicationRoutes.playerRoute.watchRoute, { descriptorCode });

    const navigateToCourseDetails = (courseId: number, descriptorCode?: string) => navigate(applicationRoutes.courseDetailsRoute, { courseId }, { descriptorCode });

    const navigateToWatchPrequiz = (courseId: number) => navigate(applicationRoutes.playerRoute.prequizRoute, { courseId });

    const navigateToWatchPretest = (courseId: number) => navigate(applicationRoutes.playerRoute.pretestRoute, { courseId });

    const playCourse = (courseId: number, stageName: CourseStageNameType, currentItemCode: string | null) => {

        if (currentItemCode) {

            navigateToPlayer(currentItemCode);
            return;
        }

        if (stageName === "pretest") {

            navigateToWatchPretest(courseId);
            return;
        }

        navigateToWatchPrequiz(courseId);
    }

    return {
        history,
        navigate,
        navigateToPlayer,
        navigateToCourseDetails,
        openNewTab,
        navigateToWatchPrequiz,
        navigateToWatchPretest,
        playCourse
    };
}