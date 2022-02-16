import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useCourseRatingGroups = () => {

    const qr = useReactQuery2(apiRoutes.courseRating.getCourseRatingGroups);

    return {
        courseRatingGroups: qr.data ?? [],
        courseRatingGroupsState: qr.state,
        courseRatingGroupsError: qr.error
    }
}