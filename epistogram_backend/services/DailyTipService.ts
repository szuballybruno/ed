import { DailyTip } from "../models/entity/DailyTip";
import { DailyTipOccurrence } from "../models/entity/DailyTipOccurrence";
import { DailyTipDTO } from "../models/shared_models/DailyTipDTO";
import { DailyTipEditDataDTO } from "../models/shared_models/DailyTipEditDataDTO";
import { DailyTipView } from "../models/views/DailyTipView";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class DailyTipService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    async deleteDailyTipAsync(id: number) {

        await this._ormService
            .getRepository(DailyTip)
            .delete(id);
    }

    async createDailyTipAsync(personalityTraitCategoryId: number, isMax: boolean) {

        await this._ormService
            .getRepository(DailyTip)
            .insert({
                personalityTraitCategoryId,
                description: "",
                isLive: false,
                isMax
            });
    }

    async getDailyTipEditDataAsync(dailyTipId: number) {

        const dailyTip = await this._ormService
            .getRepository(DailyTip)
            .findOneOrFail(dailyTipId);

        return this._mapperService
            .map(DailyTip, DailyTipEditDataDTO, dailyTip);
    }

    async saveDailyTipAsync(dto: DailyTipEditDataDTO) {

        const dailyTip = await this._ormService
            .getRepository(DailyTip)
            .save({
                id: dto.id,
                description: dto.description,
                isLive: dto.isLive
            });

        return this._mapperService
            .map(DailyTip, DailyTipEditDataDTO, dailyTip);
    }

    async getDailyTipAsync() {

        const dailyTipViews = await this._ormService
            .getRepository(DailyTipView)
            .find();

        // filter for todays tip,
        // if it's found, there is no need to do anything else, just return it
        const todaysTip = dailyTipViews.firstOrNull(x => x.isCurrentTip);
        if (todaysTip)
            return this._mapperService
                .map(DailyTipView, DailyTipDTO, todaysTip);

        // first is used here since the tips are in order of relevance
        const newCurrentTip = dailyTipViews.first(x => true);

        // insert new occurrence, this sets it as current in the DB as well
        await this._ormService
            .getRepository(DailyTipOccurrence)
            .insert({
                dailyTipId: newCurrentTip.dailyTipId
            });

        return this._mapperService
            .map(DailyTipView, DailyTipDTO, newCurrentTip);
    }
}