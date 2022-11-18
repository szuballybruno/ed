import { CourseItemEditDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const CourseItemApiService = {

    useCourseItemEditData: (videoVersionId: Id<'VideoVersion'> | null, examVersionId: Id<'ExamVersion'> | null, endabled: boolean) => {

        const qr = QueryService.useXQuery<CourseItemEditDTO>(apiRoutes.courseItem.getCourseItemEditData, { videoVersionId, examVersionId }, endabled);

        return {
            courseItemEditData: qr.data,
            courseItemEditDataState: qr.state
        };
    }
};