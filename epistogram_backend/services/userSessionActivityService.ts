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

        const currentActivity = {
            type,
            userId
        } as UserSessionActivity;

        await staticProvider
            .ormConnection
            .getRepository(UserSessionActivity)
            .insert(currentActivity);

        await this.handleCoinsAsync(userId, currentActivity.id);
    }

    handleCoinsAsync = async (userId: number, currentActivityId: number) => {

        const today = trimTimeFromDate(new Date());

        const todaysInfo = await this._connService
            .getRepository(UserSessionDailyView)
            .createQueryBuilder("us")
            .where('us.userId = :userId', { userId })
            .andWhere("us.date = :today", { today })
            .getOneOrFail();

        // if (todaysInfo.sessionCount > 3)
        //     return;

        const sessionFirstActivityId = await this._funcService
            .getUserSessionFirstActivityId(userId, currentActivityId);

        await this._funcService
            .insertCoinAcquiredFn(10, sessionFirstActivityId, null, null);
    }
}