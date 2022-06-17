import { CourseItemEditDTO } from '../../shared/dtos/CourseItemEditDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const CourseItemApiService = {

    useCourseItemEditData: (videoVersionId: number | null, examVersionId: number | null) => {

        const qr = useReactQuery2<CourseItemEditDTO>(apiRoutes.courseItem.getCourseItemEditData, { videoVersionId, examVersionId });

        return {
            courseItemEditData: qr.data,
            courseItemEditDataState: qr.state
        };
    }
};