import { CourseRatingGroupDTO } from "../../shared/dtos/CourseRatingGroupDTO";
import { CourseRatingQuestionAnswersDTO } from "../../shared/dtos/CourseRatingQuestionAnswersDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useCourseRatingGroups = (courseId: number) => {

    const qr = useReactQuery2<CourseRatingGroupDTO[]>(apiRoutes.courseRating.getCourseRatingGroups, { courseId });

    return {
        courseRatingGroups: qr.data ?? [],
        courseRatingGroupsState: qr.state,
        courseRatingGroupsError: qr.error,
        refetchCourseRatingGroupsAsync: qr.refetch
    }
}

export const useSaveCourseRatingGroupAnswers = () => {

    const qr = usePostDataUnsafe<CourseRatingQuestionAnswersDTO, void>(apiRoutes.courseRating.saveCourseRatingGroupAnswers);

    return {
        saveCourseRatingGroupAnswers: qr.postDataAsync,
        saveCourseRatingGroupAnswersState: qr.state
    }
}