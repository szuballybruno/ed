import { useHistory } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { ApplicationRoute } from "../../models/types";
import { verboseLogging } from "../../static/Environemnt";
import { getUrl } from "../../static/frontendHelpers";

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string | ApplicationRoute, params?: any, query?: any) => {

        const pathAsAny = path as any;
        const replacedPath = getUrl(pathAsAny.route ? pathAsAny.route : path, params, query);

        if (verboseLogging)
            console.log("Navigating to: " + replacedPath);

        history.push(replacedPath);
    }

    return {
        navigate,
        navigateToPlayer: (descriptorCode: string) => navigate(applicationRoutes.playerRoute.route, { itemCode: descriptorCode }),
        history
    };
}