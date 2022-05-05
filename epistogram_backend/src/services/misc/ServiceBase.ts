import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ClassType } from '../../models/DatabaseTypes';
import { MapperService } from '../MapperService';
import { ORMConnectionService } from '../ORMConnectionService/ORMConnectionService';

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

    public async insertBulkAsync(objs: QueryDeepPartialEntity<TMainEntity>[]) {

        this._ormService
            .getRepository(this._mainEntityClass)
            .insert(objs);
    }

    public async updateAsync(obj: DeepPartial<TMainEntity>) {

        await this._ormService
            .getRepository(this._mainEntityClass)
            .save(obj);
    }

    public async createAsync(entity: QueryDeepPartialEntity<TMainEntity>) {

        await this._ormService
            .getRepository(this._mainEntityClass)
            .insert(entity);
    }

    public async deleteAsync(entity: FindOptionsWhere<TMainEntity>) {

        await this._ormService
            .getRepository(this._mainEntityClass)
            .delete(entity);
    }

    public async getOrFailAsync(obj: FindOptionsWhere<TMainEntity>) {

        return await this._ormService
            .getRepository(this._mainEntityClass)
            .findOneOrFail({
                where: obj
            });
    }

    public async getAsync(obj: FindOptionsWhere<TMainEntity>) {

        return await this._ormService
            .getRepository(this._mainEntityClass)
            .findOne({
                where: obj
            });
    }
}