import { DailyTip } from "../models/entity/DailyTip";
import { DailyTipOccurrence } from "../models/entity/DailyTipOccurrence";
import { DailyTipDTO } from "../shared/dtos/DailyTipDTO";
import { DailyTipEditDataDTO } from "../shared/dtos/DailyTipEditDataDTO";
import { DailyTipView } from "../models/views/DailyTipView";
import { getRandomNumber } from "../utilities/helpers";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class DailyTipService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Deletes a daily tip.
     * 
     * @param id 
     */
    async deleteDailyTipAsync(id: number) {

        await this._ormService
            .getRepository(DailyTip)
            .delete(id);
    }

    /**
     * Creates a new daily tip, but with isLive switched off, 
     * thus it won't be shown to users until it's enabled manually.
     * 
     * @param personalityTraitCategoryId 
     * @param isMax 
     */
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

    /**
     * Returns edit data of a specified daily tip.
     * 
     * @param dailyTipId 
     * @returns 
     */
    async getDailyTipEditDataAsync(dailyTipId: number) {

        const dailyTip = await this._ormService
            .getSingleById(DailyTip, dailyTipId)

        return this._mapperService
            .map(DailyTip, DailyTipEditDataDTO, dailyTip);
    }

    /**
     * Saves a daily tip.
     * 
     * @param dto 
     * @returns 
     */
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

    /**
     * Returns a daily tip for the user, 
     * and registers that this tip was shown on this day.
     * If a user calls this the next day, this will return a different daily tip. 
     * This will go on until we run out of suitable daily tips, and the cycle will start again. 
     * 
     * @returns 
     */
    async getDailyTipAsync(userId: number) {

        // get daily tip views 
        const dailyTips = await this._ormService
            .getRepository(DailyTipView)
            .createQueryBuilder("dtv")
            .where("dtv.userId = :userId", { userId })
            .getMany();

        // get a tip 
        const tip = (() => {

            // check if there are daily tips 
            if (dailyTips.length === 0)
                return null;

            // is current tip available 
            const todaysTip = dailyTips
                .firstOrNull(x => x.isCurrentTip);

            if (todaysTip)
                return todaysTip;

            // is new tip available  
            const newTip = dailyTips
                .firstOrNull(x => x.isNew);

            if (newTip)
                return newTip;

            // reuse already shown tip
            const newCurrentTip = dailyTips
                .splice(0, dailyTips.length > 3
                    ? dailyTips.length - 3
                    : dailyTips.length)
                .orderBy(_ => getRandomNumber())
                .first();

            return newCurrentTip;
        })();

        // no tips found :(
        if (!tip)
            return null;

        // if tip is not current, 
        // meaning it already has an occurance for today, 
        // insert a new occurance 
        if (!tip.isCurrentTip) {

            await this._ormService
                .getRepository(DailyTipOccurrence)
                .insert({
                    dailyTipId: tip.dailyTipId,
                    userId
                });
        }

        // map tip
        return this._mapperService
            .map(DailyTipView, DailyTipDTO, tip);
    }
}