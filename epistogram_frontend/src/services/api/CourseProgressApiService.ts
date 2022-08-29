import { CourseProgressShortDTO } from '../../shared/dtos/CourseProgressShortDTO';
import { UserCoursesDataDTO } from '../../shared/dtos/UserCoursesDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
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