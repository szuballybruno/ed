import { PretestService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class PretestController implements XController<PretestController> {

    private _pretestService: PretestService;

    constructor(serviceProvider: ServiceProvider) {

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
