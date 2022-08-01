import { GlobalConfiguration, LogScopeType } from './misc/GlobalConfiguration';
import { log, logError, logSecondary } from './misc/logger';

type LogType = 'SECONDARY' | 'ERROR';

export class LoggerService {

    constructor(private _config: GlobalConfiguration) {

    }

    /**
     * @deprecated use scoped logging 
     */
    log(text: string) {

        log(text);
    }

    logScoped(scope: LogScopeType, type: LogType, obj: any): void;
    logScoped(scope: LogScopeType, obj: any): void;
    logScoped(scope: LogScopeType, objOrType: any, obj?: any): void {

        if (!this._config.logging.enabledScopes.some(x => x === scope))
            return;

        const isTyped = !!obj;
        const logObj = isTyped ? obj : objOrType;
        const type = isTyped ? objOrType as LogType : undefined;

        if (typeof logObj !== 'string') {

            console.log(logObj);
            return;
        }

        if (type === 'ERROR') {

            logError(`[${scope}] ${logObj}`);
            return;
        }

        console.log(`[${scope}] ${type === 'SECONDARY' ? '--' : ''}${logObj}`);
    }

    /**
     * @deprecated use logScoped 
     */
    logSecondary(text: string) {

        logSecondary(text);
    }
}