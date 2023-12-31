import { DailyTipEditDataDTO } from '@episto/communication';
import { DailyTipService } from '@episto/server-services';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { Id } from '@episto/commontypes';

export class DailyTipController {

    private _dailyTipService: DailyTipService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._dailyTipService = serviceProvider.getService(DailyTipService);
    }

    @XControllerAction(apiRoutes.dailyTip.getDailyTip, { isPost: true })
    deleteDailyTipAction = async (params: ActionParams) => {

        const tipId = Id
            .create<'DailyTip'>(params
                .getBody<any>()
                .getValue(x => x.dailyTipId, 'int'));

        await this._dailyTipService
            .deleteDailyTipAsync(params.principalId, tipId);
    };

    @XControllerAction(apiRoutes.dailyTip.createDailyTip, { isPost: true })
    createDailyTipAction = async (params: ActionParams) => {

        const body = params
            .getBody<any>();

        const personalityTraitCategoryId = Id
            .create<'PersonalityTraitCategory'>(body
                .getValue(x => x.personalityTraitCategoryId, 'int'));

        const isMax = body
            .getValue(x => x.isMax, 'boolean');

        await this._dailyTipService
            .createDailyTipAsync(params.principalId, personalityTraitCategoryId, isMax);
    };

    @XControllerAction(apiRoutes.dailyTip.getDailyTipEditData)
    getDailyTipEditDataAction = async (params: ActionParams) => {

        const dailyTipId = Id
            .create<'DailyTip'>(params
                .getQuery<any>()
                .getValue(x => x.dailyTipId, 'int'));

        return await this._dailyTipService
            .getDailyTipEditDataAsync(params.principalId, dailyTipId);
    };

    @XControllerAction(apiRoutes.dailyTip.saveDailyTip, { isPost: true })
    saveDailyTipAction = async (params: ActionParams) => {

        const dto = params
            .getBody<DailyTipEditDataDTO>()
            .data;

        return await this._dailyTipService
            .saveDailyTipAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.dailyTip.getDailyTip)
    getDailyTipAction = async (params: ActionParams) => {

        return await this._dailyTipService
            .getDailyTipAsync(params.principalId);
    };
}