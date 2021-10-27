import { useHistory } from "react-router";
import { verboseLogging } from "../Environemnt";

export const getCourseItemUrl = (descriptorCode: string) =>
    `/watch/${descriptorCode}`;

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string, params?: any) => {

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