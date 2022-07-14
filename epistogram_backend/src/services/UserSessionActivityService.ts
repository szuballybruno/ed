import { SessionActivityType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { CoinAcquireService } from './CoinAcquireService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';

export class UserSessionActivityService {

    private _funcService: SQLFunctionsService;
    private _coinAcquireService: CoinAcquireService;

    constructor(funcService: SQLFunctionsService, coinAcquireService: CoinAcquireService) {

        this._funcService = funcService;
        this._coinAcquireService = coinAcquireService;
    }

    saveUserSessionActivityAsync = async (userId: Id<'User'>, type: SessionActivityType, itemVersionId?: Id<'VideoVersion'> | Id<'ExamVersion'>) => {

        const activitySessionId = await this._funcService.saveUserSessionActivity(userId, type, itemVersionId);

        // handle coin acqure 
        const coinAcquireResult = await this._coinAcquireService
            .handleSessionActivityCoinsAsync(userId, activitySessionId);
    };
}