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