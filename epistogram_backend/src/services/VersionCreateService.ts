import { Course } from '../models/entity/course/Course';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { Id } from '../shared/types/versionId';
import { InsertEntity } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class VersionCreateService {

    constructor(private _ormService: ORMConnectionService) {

    }

    async createVersionAsync<TEntity, TData, TVersion>({
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
        const entityId = await this._ormService
            .createAsync(entity, createEntity());

        // create course data
        const dataId = await this._ormService
            .createAsync(data, createData());

        // create course version 
        return {
            versionId: await this._ormService
                .createAsync(version, createVersion({ dataId, entityId }))
        };
    }
}