import { Id } from '@episto/commontypes';
import { InsertEntity } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType } from './XORM/XORMTypes';

export class VersionCreateService {

    constructor(private _ormService: ORMConnectionService) {

    }

    async createVersionAsync<TEntity extends EntityType, TData extends EntityType, TVersion extends EntityType>({
        data,
        entity,
        version,
        createEntity,
        createData,
        createVersion
    }: {
        entity: ClassType<TEntity>,
        data: ClassType<TData>,
        version: ClassType<TVersion>,
        createEntity: () => InsertEntity<TEntity>,
        createData: () => InsertEntity<TData>,
        createVersion: (opts: { entityId: Id<any>, dataId: Id<any> }) => InsertEntity<TVersion>,
    }) {

        // create course
        const { id: entityId } = await this._ormService
            .createAsync(entity, createEntity());

        // create course data
        const { id: dataId } = await this._ormService
            .createAsync(data, createData());

        const { id: versionId } = await this._ormService
            .createAsync(version, createVersion({ dataId, entityId }));

        // create course version 
        return {
            versionId
        };
    }
}