import { GlobalConfiguration, LogScopeType } from './misc/GlobalConfiguration';
import { log, logSecondary } from './misc/logger';

export class LoggerService {

    constructor(private _config: GlobalConfiguration) {

    }

    /**
     * @deprecated use scoped logging 
     */
    log(text: string) {

        log(text);
    }

    logScoped(scope: LogScopeType, type: 'SECONDARY', obj: any): void;
    logScoped(scope: LogScopeType, obj: any): void;
    logScoped(scope: LogScopeType, objOrType: any, obj?: any): void {

        if (!this._config.logging.enabledScopes.some(x => x === scope))
            return;

        const isSecondary = !!obj;

        const logObj = isSecondary ? obj : objOrType;

        if (typeof logObj === 'string') {

            console.log(`[${scope}] ${isSecondary ? '--' : ''}${logObj}`);
        }
        else {

            console.log(logObj);
        }
    }

    logSecondary(text: string) {

        logSecondary(text);
    }
}