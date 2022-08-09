import { CourseProgressShortDTO } from '../../shared/dtos/CourseProgressShortDTO';
import { UserCoursesDataDTO } from '../../shared/dtos/UserCoursesDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const CourseProgressApiService = {

    useCourseProgressData: () => {

        const qr = useReactQuery2<UserCoursesDataDTO>(apiRoutes.courseProgress.getCourseProgressData);

        return {
            coursesData: qr.data,
            coursesDataError: qr.error,
            coursesDataStatus: qr.state
        };
    },

    useCourseProgressShortDtos: () => {

        const qr = useReactQuery2<CourseProgressShortDTO[]>(apiRoutes.courseProgress.getCourseProgressShort);

        return {
            courseProgressShortDtos: qr.data ?? [],
            courseProgressShortError: qr.error,
            courseProgressShortState: qr.state
        };
    }
};