import { CourseItemEditDTO } from '../../shared/dtos/CourseItemEditDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';

export const CourseItemApiService = {

    useCourseItemEditData: (videoVersionId: Id<'VideoVersion'> | null, examVersionId: Id<'ExamVersion'> | null, endabled: boolean) => {

        const qr = QueryService.useXQuery<CourseItemEditDTO>(apiRoutes.courseItem.getCourseItemEditData, { videoVersionId, examVersionId }, endabled);

        return {
            courseItemEditData: qr.data,
            courseItemEditDataState: qr.state
        };
    }
};