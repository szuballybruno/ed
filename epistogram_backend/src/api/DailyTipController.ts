import { DailyTipEditDataDTO } from '../shared/dtos/DailyTipEditDataDTO';
import { DailyTipService } from '../services/DailyTipService';
import { ActionParams } from "../utilities/ActionParams";

export class DailyTipController {

    private _dailyTipService: DailyTipService;

    constructor(dailyTipService: DailyTipService) {

        this._dailyTipService = dailyTipService;
    }

    deleteDailyTipAction = async (params: ActionParams) => {

        const tipId = params
            .getBody<any>()
            .getValue(x => x.dailyTipId, 'int');

        await this._dailyTipService
            .deleteDailyTipAsync(tipId);
    };

    createDailyTipAction = async (params: ActionParams) => {

        const body = params
            .getBody<any>();

        const personalityTraitCategoryId = body
            .getValue(x => x.personalityTraitCategoryId, 'int');

        const isMax = body
            .getValue(x => x.isMax, 'boolean');

        await this._dailyTipService
            .createDailyTipAsync(personalityTraitCategoryId, isMax);
    };

    getDailyTipEditDataAction = async (params: ActionParams) => {

        const dailyTipId = params
            .getQuery<any>()
            .getValue(x => x.dailyTipId, 'int');

        return await this._dailyTipService
            .getDailyTipEditDataAsync(dailyTipId);
    };

    saveDailyTipAction = async (params: ActionParams) => {

        const dto = params
            .getBody<DailyTipEditDataDTO>()
            .data;

        return await this._dailyTipService
            .saveDailyTipAsync(dto);
    };

    getDailyTipAction = async (params: ActionParams) => {

        return await this._dailyTipService
            .getDailyTipAsync(params.currentUserId);
    };
}