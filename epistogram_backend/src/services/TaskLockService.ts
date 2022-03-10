import { TaskLock } from "../models/entity/TaskLock";
import { TaskCodeType as TaskCodeType } from "../models/Types";
import { sleepAsync } from "../utilities/helpers";
import { MapperService } from "./MapperService";
import { QueryServiceBase } from "./misc/ServiceBase";
import { SQLFunctionsService } from "./sqlServices/FunctionsService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class TaskLockService extends QueryServiceBase<TaskLock> {

    private _sqlFuncService: SQLFunctionsService;

    constructor(
        mapperSerivce: MapperService,
        ormSerivce: ORMConnectionService,
        sqlFuncService: SQLFunctionsService) {

        super(mapperSerivce, ormSerivce, TaskLock);

        this._sqlFuncService = sqlFuncService;
    }

    async acquireTaskLockAsync(code: TaskCodeType): Promise<boolean> {

        console.log(`Acquireing lock for task '${code}'...`);

        const res = await this._sqlFuncService
            .acquireTaskLockAsync(code);

        console.log(`Code acquired: '${res}'.`);

        return res;
    }

    async dissolveLockAsync(taskCode: TaskCodeType) {

        await sleepAsync(5);
        console.log(`Dissolving lock for: '${taskCode}'...`);
        await this.deleteAsync({ taskCode });
    }
}