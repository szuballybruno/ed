import { useHistory } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { verboseLogging } from "../../static/Environemnt";
import { getUrl } from "../../static/frontendHelpers";

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string, params?: any, query?: any) => {

        const replacedPath = getUrl(path, params, query);

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