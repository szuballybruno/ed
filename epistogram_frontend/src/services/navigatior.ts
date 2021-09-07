import { useHistory } from "react-router";

export const getCourseItemUrl = (descriptorCode: string) =>
    `/watch/${descriptorCode}`;

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string) => {

        console.log("Navigating to: " + path);
        history.push(path);
    }

    return {
        navigate,
        navigateToPlayer: (descriptorCode: string) =>
            navigate(getCourseItemUrl(descriptorCode)),
        history
    };
}