import { CourseRatingGroupDTO } from "../../models/shared_models/CourseRatingGroupDTO";
import { CourseRatingQuestionAnswerDTO } from "../../models/shared_models/CourseRatingQuestionAnswerDTO";
import { CourseRatingQuestionAnswersDTO } from "../../models/shared_models/CourseRatingQuestionAnswersDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useCourseRatingGroups = (courseId: number) => {

    const qr = useReactQuery2<CourseRatingGroupDTO[]>(apiRoutes.courseRating.getCourseRatingGroups, { courseId });

    return {
        courseRatingGroups: qr.data ?? [],
        courseRatingGroupsState: qr.state,
        courseRatingGroupsError: qr.error
    }
}

export const useCourseRatingAnswers = (courseId: number, groupId: number, enabled: boolean) => {

    const qr = useReactQuery2<CourseRatingQuestionAnswerDTO[]>(apiRoutes.courseRating.getCourseRatingAnswers, { courseId, courseRatingGroupId: groupId }, enabled);

    return {
        courseRatingAnswers: qr.data ?? [],
        courseRatingAnswersState: qr.state,
        courseRatingAnswersError: qr.error
    }
}

export const useSaveCourseRatingGroupAnswers = () => {

    const qr = usePostDataUnsafe<CourseRatingQuestionAnswersDTO, void>(apiRoutes.courseRating.saveCourseRatingGroupAnswers);

    return {
        saveCourseRatingGroupAnswers: qr.postDataAsync,
        saveCourseRatingGroupAnswersState: qr.state
    }
}