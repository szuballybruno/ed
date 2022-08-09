import { DailyTipEditDataDTO } from '../shared/dtos/DailyTipEditDataDTO';
import { DailyTipService } from '../services/DailyTipService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { Id } from '../shared/types/versionId';

export class DailyTipController {

    private _dailyTipService: DailyTipService;

    constructor(serviceProvider: ServiceProvider) {

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