import { DailyTipService } from "../services/DailyTipService";
import { ActionParams } from "../utilities/helpers";

export class DailyTipController {

    private _dailyTipService: DailyTipService;

    constructor(dailyTipService: DailyTipService) {

        this._dailyTipService = dailyTipService;
    }

    deleteDailyTipAction = async (params: ActionParams) => {

        const tipId = params
            .getBody<any>()
            .getValue(x => x.dailyTipId, "int");

        await this._dailyTipService
            .deleteDailyTipAsync(tipId);
    }

    createDailyTipAction = async (params: ActionParams) => {

        const personalityTraitCategoryId = params
            .getBody<any>()
            .getValue(x => x.personalityTraitCategoryId, "int");

        await this._dailyTipService
            .createDailyTipAsync(personalityTraitCategoryId);
    }

    getDailyTipAction = async (params: ActionParams) => {

        return await this._dailyTipService
            .getDailyTipAsync();
    };
}