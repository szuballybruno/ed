import { PretestService } from '../services/PretestService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PretestController {

    private _pretestService: PretestService;

    constructor(serviceProvider: ServiceProvider) {

        this._pretestService = serviceProvider.getService(PretestService);
    }

    @XControllerAction(apiRoutes.pretest.getPretestData)
    getPretestDataAction = async (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return await this._pretestService
            .getPretestDataAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.pretest.getPretestResults)
    getPretestResultsAction = async (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._pretestService
            .getPretestResultsAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.pretest.finishPretest, { isPost: true })
    async finishPretestAction(params: ActionParams) {

        const answerSessionId = params
            .getFromParameterized(apiRoutes.pretest.finishPretest)
            .body
            .getValue(x => x.answerSessionId, 'int');

        return this._pretestService
            .finishPretestAsync(params.principalId, answerSessionId);
    }
}