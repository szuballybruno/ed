import { CourseProgressShortDTO } from '@episto/communication';
import { UserCoursesDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { QueryService } from '../../static/QueryService';

export const CourseProgressApiService = {

    useCourseProgressData: () => {

        const qr = QueryService.useXQuery<UserCoursesDataDTO>(apiRoutes.courseProgress.getCourseProgressData);

        return {
            coursesData: qr.data,
            coursesDataError: qr.error,
            coursesDataStatus: qr.state
        };
    },

    useCourseProgressShortDtos: () => {

        const qr = QueryService.useXQuery<CourseProgressShortDTO[]>(apiRoutes.courseProgress.getCourseProgressShort);

        return {
            courseProgressShortDtos: qr.data ?? [],
            courseProgressShortError: qr.error,
            courseProgressShortState: qr.state
        };
    }
};