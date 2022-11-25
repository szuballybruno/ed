import { CourseItemService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class CourseItemController implements XController<CourseItemController> {

    private _courseItemService: CourseItemService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseItemService = serviceProvider.getService(CourseItemService);
    }

    @XControllerAction(apiRoutes.courseItem.getCourseItemEditData)
    getCourseItemEditDataAction(params: ActionParams) {

        const bod = params
            .getQuery();

        const videoVersionId = Id
            .create<'VideoVersion'>(bod
                .getValueOrNull(x => x.videoVersionId, 'int'));

        const examVersionId = Id
            .create<'ExamVersion'>(bod
                .getValueOrNull(x => x.examVersionId, 'int'));

        return this._courseItemService
            .getCourseItemEditDataAsync(params.principalId, videoVersionId, examVersionId);
    }
}