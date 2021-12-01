import { SessionActivityType } from "../models/shared_models/types/sharedTypes";
import { CoinAcquireService } from "./coinAcquireService";
import { SQLFunctionsService } from "./sqlServices/SQLFunctionsService";

export class UserSessionActivityService {
    private _funcService: SQLFunctionsService;
    private _coinAcquireService: CoinAcquireService;

    constructor(funcService: SQLFunctionsService, coinAcquireService: CoinAcquireService) {

        this._funcService = funcService;
        this._coinAcquireService = coinAcquireService;
    }

    saveUserSessionActivityAsync = async (userId: number, type: SessionActivityType) => {

        const activitySessionId = await this._funcService.saveUserSessionActivity(userId, type);

        // handle coin acqure 
        const coinAcquireResult = await this._coinAcquireService
            .handleSessionActivityCoinsAsync(userId, activitySessionId);
    }
}