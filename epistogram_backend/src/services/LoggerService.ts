import { GlobalConfiguration, LogScopeType } from './misc/GlobalConfiguration';
import { logError } from './misc/logger';

type LogType = 'SECONDARY';

export class LoggerService {

    private _logId: number = 0;
    private _showLogId: boolean = true;

    constructor(private _config: GlobalConfiguration) {

    }

    logScoped(scope: LogScopeType, type: LogType, obj: any): void;
    logScoped(scope: LogScopeType, obj: any): void;
    logScoped(scope: LogScopeType, objOrType: any, obj?: any): void {

        if (!this._config.logging.enabledScopes.some(x => x === scope) && scope !== 'ERROR')
            return;

        const isTyped = !!obj;
        const logObj = isTyped ? obj : objOrType;
        const type = isTyped ? objOrType as LogType : undefined;

        this._logId++;

        if (typeof logObj !== 'string') {

            console.log(`Object log (${this._logId})`);
            console.log(logObj);
            return;
        }

        if (scope === 'ERROR') {

            logError(`[${scope}] ${logObj}`);
            return;
        }

        console.log(`[${scope}] ${this._logId ? `(${this._logId}) ` : ''}${type === 'SECONDARY' ? '--' : ''}${logObj}`);
    }
}