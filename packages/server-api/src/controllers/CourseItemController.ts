import { CourseItemService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class CourseItemController implements IController<CourseItemController> {

    private _courseItemService: CourseItemService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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