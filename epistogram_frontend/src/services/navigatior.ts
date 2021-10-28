import { useHistory } from "react-router";
import { verboseLogging } from "../Environemnt";
import { stringifyQueryObject } from "../frontendHelpers";

export const getCourseItemUrl = (descriptorCode: string) =>
    `/watch/${descriptorCode}`;

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string, params?: any, query?: any) => {

        let replacedPath = path;

        if (params) {
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {

                    const element = params[key];
                    const token = ":" + key;

                    replacedPath = replacedPath.replace(token, element);
                }
            }
        }

        if (query) {

            replacedPath += stringifyQueryObject(query);
        }

        if (verboseLogging)
            console.log("Navigating to: " + replacedPath);

        history.push(replacedPath);
    }

    return {
        navigate,
        navigateToPlayer: (descriptorCode: string) =>
            navigate(getCourseItemUrl(descriptorCode)),
        history
    };
}