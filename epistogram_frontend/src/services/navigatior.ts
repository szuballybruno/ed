import { useHistory } from "react-router";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string) => history.push(path);

    return {
        navigate,
        navigateToPlayer: (courseItemId: number, courseItemType: CourseItemType) =>
            navigate("/watch/" + courseItemId + "?type=" + courseItemType),
        history
    };
}