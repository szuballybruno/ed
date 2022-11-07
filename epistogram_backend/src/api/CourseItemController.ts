import { CourseItemService } from '../services/CourseItemService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

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