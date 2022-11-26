import { CourseProgressService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IXGatewayServiceProvider } from '@episto/x-gateway';

export class CourseProgressController {

    private _courseProgressService: CourseProgressService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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