import { SessionActivityType } from '../shared/types/sharedTypes';
import { CoinAcquireService } from './CoinAcquireService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';

export class UserSessionActivityService {

    private _funcService: SQLFunctionsService;
    private _coinAcquireService: CoinAcquireService;

    constructor(funcService: SQLFunctionsService, coinAcquireService: CoinAcquireService) {

        this._funcService = funcService;
        this._coinAcquireService = coinAcquireService;
    }

    saveUserSessionActivityAsync = async (userId: number, type: SessionActivityType, itemVersionId?: number) => {

        const activitySessionId = await this._funcService.saveUserSessionActivity(userId, type, itemVersionId);

        // handle coin acqure 
        const coinAcquireResult = await this._coinAcquireService
            .handleSessionActivityCoinsAsync(userId, activitySessionId);
    };
}