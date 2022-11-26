import { PretestService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class PretestController implements Controller<PretestController> {

    private _pretestService: PretestService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._pretestService = serviceProvider.getService(PretestService);
    }

    @XControllerAction(apiRoutes.pretest.getPretestData)
    async getPretestDataAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._pretestService
            .getPretestDataAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.pretest.getPretestResults)
    getPretestResultsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._pretestService
            .getPretestResultsAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.pretest.finishPretest, { isPost: true })
    finishPretestAction(params: ActionParams) {

        const answerSessionId = params
            .getFromParameterized(apiRoutes.pretest.finishPretest)
            .body
            .getValue(x => x.answerSessionId, 'int');

        return this._pretestService
            .finishPretestAsync(params.principalId, answerSessionId);
    }
}
