import { TaskLock } from "../models/entity/TaskLock";
import { TaskCodeType as TaskCodeType } from "../models/Types";
import { sleepAsync } from "../utilities/helpers";
import { MapperService } from "./MapperService";
import { GlobalConfiguration } from "./misc/GlobalConfiguration";
import { QueryServiceBase } from "./misc/ServiceBase";
import { SQLFunctionsService } from "./sqlServices/FunctionsService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class TaskLockService extends QueryServiceBase<TaskLock> {

    private _sqlFuncService: SQLFunctionsService;
    private _config: GlobalConfiguration;
    private _isEnabled: boolean;

    constructor(
        mapperSerivce: MapperService,
        ormSerivce: ORMConnectionService,
        sqlFuncService: SQLFunctionsService,
        config: GlobalConfiguration) {

        super(mapperSerivce, ormSerivce, TaskLock);

        this._config = config;
        this._sqlFuncService = sqlFuncService;
        this._isEnabled = !config.misc.isLocalhost;
    }

    async acquireTaskLockAsync(code: TaskCodeType): Promise<boolean> {

        if (!this._isEnabled)
            return true;

        console.log(`Acquireing lock for task '${code}'...`);

        const res = await this._sqlFuncService
            .acquireTaskLockAsync(code);

        console.log(`Code acquired: '${res}'.`);

        return res;
    }

    async dissolveLockAsync(taskCode: TaskCodeType) {

        if (!this._isEnabled)
            return;

        await sleepAsync(5);
        console.log(`Dissolving lock for: '${taskCode}'...`);
        await this.deleteAsync({ taskCode });
    }
}