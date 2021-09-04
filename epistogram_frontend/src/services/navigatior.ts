import { useHistory } from "react-router";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";

export const getCourseItemUrl = (courseItemId: number, courseItemType: CourseItemType) =>
    "/watch/" + courseItemId + "?type=" + courseItemType;

export const useNavigation = () => {

    const history = useHistory();
    const navigate = (path: string) => history.push(path);

    return {
        navigate,
        navigateToPlayer: (courseItemId: number, courseItemType: CourseItemType) =>
            navigate(getCourseItemUrl(courseItemId, courseItemType)),
        history
    };
}