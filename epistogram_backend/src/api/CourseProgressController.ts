import { CourseProgressService } from '../services/CourseProgressService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

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
    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseProgressService
            .getCourseProgressDataAsync(params.principalId);
    };
}