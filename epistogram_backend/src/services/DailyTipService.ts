import { DailyTip } from '../models/entity/misc/DailyTip';
import { DailyTipOccurrence } from '../models/entity/misc/DailyTipOccurrence';
import { DailyTipDTO } from '../shared/dtos/DailyTipDTO';
import { DailyTipEditDataDTO } from '../shared/dtos/DailyTipEditDataDTO';
import { DailyTipView } from '../models/views/DailyTipView';
import { getRandomNumber } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { Id } from '../shared/types/versionId';
import { AuthorizationService } from './AuthorizationService';

export class DailyTipService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService, authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
    }

    /**
     * Deletes a daily tip.
     */
    deleteDailyTipAsync(principalId: PrincipalId, id: Id<'DailyTip'>) {

        return {
            action: async () => {
                await this._ormService
                    .softDelete(DailyTip, [id]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'VIEW_DAILY_TIP_ADMIN');
            }
        };
    }

    /**
     * Creates a new daily tip, but with isLive switched off, 
     * thus it won't be shown to users until it's enabled manually.
     */
    createDailyTipAsync(principalId: PrincipalId, personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean) {

        return {
            action: async () => {
                await this._ormService
                    .createAsync(DailyTip, {
                        personalityTraitCategoryId,
                        description: '',
                        isLive: false,
                        isMax
                    } as DailyTip);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'VIEW_DAILY_TIP_ADMIN');
            }
        };
    }

    /**
     * Returns edit data of a specified daily tip.
     */
    async getDailyTipEditDataAsync(principalId: PrincipalId, dailyTipId: Id<'DailyTip'>) {

        return {
            action: async () => {
                const dailyTip = await this._ormService
                    .getSingleById(DailyTip, dailyTipId);

                return this._mapperService
                    .mapTo(DailyTipEditDataDTO, [dailyTip]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'VIEW_DAILY_TIP_ADMIN');
            }
        };


    }

    /**
     * Saves a daily tip.
     */
    async saveDailyTipAsync(principalId: PrincipalId, dto: DailyTipEditDataDTO) {

        return {
            action: async () => {
                await this._ormService
                    .save(DailyTip, {
                        id: dto.id,
                        description: dto.description,
                        isLive: dto.isLive
                    });

                const dailyTip = await this._ormService
                    .query(DailyTip, { id: dto.id })
                    .where('id', '=', 'id')
                    .getSingle();

                return this._mapperService
                    .mapTo(DailyTipEditDataDTO, [dailyTip]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'VIEW_DAILY_TIP_ADMIN');
            }
        };


    }

    /**
     * Returns a daily tip for the user, 
     * and registers that this tip was shown on this day.
     * If a user calls this the next day, this will return a different daily tip. 
     * This will go on until we run out of suitable daily tips, and the cycle will start again. 
     */
    async getDailyTipAsync(principalId: PrincipalId) {

        // get daily tip views 
        const dailyTips = await this._ormService
            .query(DailyTipView, { principalId })
            .where('userId', '=', 'principalId')
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
                .createAsync(DailyTipOccurrence, {
                    dailyTipId: tip.dailyTipId,
                    userId: principalId.getId()
                } as DailyTipOccurrence);
        }

        // map tip
        return this._mapperService
            .mapTo(DailyTipDTO, [tip]);
    }
}