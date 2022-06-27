import { PretestService } from '../services/PretestService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PretestController {

    private _pretestService: PretestService;

    constructor(serviceProvider: ServiceProvider) {

        this._pretestService = serviceProvider.getService(PretestService);
    }

    @XControllerAction(apiRoutes.pretest.getPretestData)
    getPretestDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ courseId: number }>();

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return await this._pretestService
            .getPretestDataAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.pretest.getPretestResults)
    getPretestResultsAction = async (params: ActionParams) => {

        return this._pretestService
            .getPretestResultsAsync(params.principalId, params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));
    };

    @XControllerAction(apiRoutes.pretest.getPretestExamId)
    getPretestExamIdAction = async (params: ActionParams) => {

        return this._pretestService
            .getPretestExamIdAsync(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));
    };
}