import { DeepPartial, FindConditions } from "typeorm";
import { ClassType } from "../../models/Types";
import { MapperService } from "../MapperService";
import { ORMConnectionService } from "../sqlServices/ORMConnectionService";

export class ServiceBase {

    protected _mapperService: MapperService;
    protected _ormService: ORMConnectionService;

    constructor(mapperService: MapperService, ormService: ORMConnectionService) {

        this._mapperService = mapperService;
        this._ormService = ormService;
    }
}

export class QueryServiceBase<TMainEntity> extends ServiceBase {

    protected _mainEntityClass: ClassType<TMainEntity>;

    constructor(mapperService: MapperService, ormService: ORMConnectionService, mainEntityClass: ClassType<TMainEntity>) {

        super(mapperService, ormService);
        this._mainEntityClass = mainEntityClass;
    }

    public updateAsync(obj: DeepPartial<TMainEntity>) {

        this._ormService
            .getRepository(this._mainEntityClass)
            .save(obj);
    }

    public getOrFailAsync(obj: FindConditions<TMainEntity>) {

        return this._ormService
            .getRepository(this._mainEntityClass)
            .findOneOrFail({
                where: obj
            });
    }
}