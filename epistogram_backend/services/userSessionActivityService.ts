import { ActivitySession } from "../models/entity/ActivitySession";
import { CoinAcquire } from "../models/entity/CoinAcquire";
import { UserSessionActivity } from "../models/entity/UserSessionActivity";
import { SessionActivityType } from "../models/shared_models/types/sharedTypes";
import { UserSessionDailyView } from "../models/views/UserActivityDailyView";
import { UserSessionView } from "../models/views/UserSessionView";
import { staticProvider } from "../staticProvider";
import { fakeUtcShiftDate, toSqlDate, trimTimeFromDate } from "../utilities/helpers";
import { DbConnectionService } from "./databaseConnectionService";
import { SQLFunctionsService } from "./sqlServices/sqlFunctionsService";

export class UserSessionActivityService {
    private _funcService: SQLFunctionsService;
    private _connService: DbConnectionService;

    constructor(funcService: SQLFunctionsService, connService: DbConnectionService) {

        this._funcService = funcService;
        this._connService = connService;
    }

    saveUserSessionActivityAsync = async (userId: number, type: SessionActivityType) => {

        const activitySessionId = await this._funcService.saveUserSessionActivity(userId, type);
        await this.handleCoinsAsync(userId, activitySessionId);
    }

    handleCoinsAsync = async (userId: number, activitySessionId: number) => {

        // check if it's not more than 3 sessions today
        const today = trimTimeFromDate(new Date());

        const todaysInfo = await this._connService
            .getRepository(UserSessionDailyView)
            .createQueryBuilder("us")
            .where('us.userId = :userId', { userId })
            .andWhere("us.date = :today", { today })
            .getOneOrFail();

        // if (todaysInfo.sessionCount > 3)
        //     return;

        // check if current session has a coin acquire 
        const acquireForCurrentSession = await this._connService
            .getRepository(CoinAcquire)
            .findOne({
                where: {
                    activitySessionId: activitySessionId
                }
            });

        if (acquireForCurrentSession)
            return;

        // add acquire 
        await this._funcService
            .insertCoinAcquiredFn(userId, 10, activitySessionId, null, null);
    }
}