import { CourseProgressService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { ServiceProvider } from '../startup/ServiceProvider';

export class CourseProgressController {

    private _courseProgressService: CourseProgressService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseProgressService = serviceProvider
            .getService(CourseProgressService);
    }

    @XControllerAction(apiRoutes.courseProgress.getCourseProgressShort)
    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseProgressService
            .getCourseProgressShortAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.courseProgress.getCourseProgressData)
    getCourseProgressDataAction = (params: ActionParams) => {

        return this._courseProgressService
            .getCourseProgressDataAsync(params.principalId);
    };
}