import { CourseRatingGroupDTO } from '@episto/communication';
import { CourseRatingQuestionAnswersDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const useCourseRatingGroups = (courseId: Id<'Course'>) => {

    const qr = QueryService.useXQuery<CourseRatingGroupDTO[]>(apiRoutes.courseRating.getCourseRatingGroups, { courseId });

    return {
        courseRatingGroups: qr.data ?? [],
        courseRatingGroupsState: qr.state,
        courseRatingGroupsError: qr.error,
        refetchCourseRatingGroupsAsync: qr.refetch
    };
};

export const useSaveCourseRatingGroupAnswers = () => {

    const qr = usePostDataUnsafe<CourseRatingQuestionAnswersDTO, void>(apiRoutes.courseRating.saveCourseRatingGroupAnswers);

    return {
        saveCourseRatingGroupAnswers: qr.postDataAsync,
        saveCourseRatingGroupAnswersState: qr.state
    };
};