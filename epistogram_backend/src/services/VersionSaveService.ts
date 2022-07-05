import { Mutation } from '../shared/dtos/mutations/Mutation';
import { VersionCode } from '../shared/types/versionCode';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType } from './XORM/XORMTypes';

type GetVersionDataPairsFnType<TMutation, TVerion, TData, TEntity> = {
    getOldData: (mutation: TMutation) => OldData<TVerion, TData, TEntity>,
    oldVersionIds: number[]
}

export class VersionSaveService {

    constructor(
        private _ormService: ORMConnectionService) {
    }

    /**
     * Incerements video version while keeping old data version
     */
    async incrementVersionsAsync<TVersion extends EntityType>(
        versionSignature: ClassType<TVersion>,
        oldVersionIds: number[],
        parentMigrations: VersionMigrationResult[],
        getParentVersionId: (version: TVersion) => number,
        setParentVersionId: (version: TVersion, parentVersionId: number) => void) {

        const oldVersions = await this._ormService
            .query(versionSignature, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const newVersions = oldVersions
            .map(oldVersion => {

                const newParentVersionId = VersionMigrationHelpers
                    .getNewVersionId(parentMigrations, getParentVersionId(oldVersion));

                const newVersion: TVersion = { ...oldVersion };

                setParentVersionId(newVersion, newParentVersionId);

                return newVersion;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(versionSignature, newVersions);

        return VersionMigrationHelpers
            .create(oldVersionIds, newVersionIds);
    }

    /**
     * Creates new videos from 
     * video ADD mutations  
     */
    saveItemsAsync<TMutationDTO, TMutation extends Mutation<TMutationDTO, any>>(dto: ClassType<TMutationDTO>) {

        return async <TVersion extends EntityType, TData extends EntityType, TEntity extends EntityType>(opts: {
            version: ClassType<TVersion>,
            data: ClassType<TData>,
            entity: ClassType<TEntity>,
            mutationDTOParentVersionField: keyof TMutationDTO,
            getDataId: (version: TVersion) => number,
            getEntityId: (version: TVersion) => number,
            getDefaultData: (mutation: TMutation) => InsertEntity<TData>,
            overrideDataProps: (data: InsertEntity<TData>, mutation: TMutation) => InsertEntity<TData>,
            getNewEntity: (mutation: TMutation) => InsertEntity<TEntity>,
            getNewVersion: (opts: { newDataId: number, entityId: number, newParentVersionId: number }) => InsertEntity<TVersion>,
            getParentVersionId: (verison: TVersion) => number,
            muts: TMutation[],
            parentVersionIdMigrations: VersionMigrationResult[]
        }): Promise<VersionMigrationResult[]> => {

            if (opts.muts.length === 0)
                return [];

            const {
                version,
                data,
                entity,
                mutationDTOParentVersionField,
                getDataId,
                getEntityId,
                getDefaultData,
                overrideDataProps,
                getNewEntity,
                getNewVersion,
                getParentVersionId,
                parentVersionIdMigrations,
                muts
            } = opts;

            // order: add mutations first
            const mutationOrdered = muts
                .orderBy(x => x.action === 'add' ? 1 : 2);

            // get old data
            const { getOldData, oldVersionIds } = await this
                ._getOldDataView(version, data, entity, getDataId, getEntityId, mutationOrdered);

            //
            // CREATE VIDEO DATAS
            const newDatas = mutationOrdered
                .map(mutation => {

                    // get default data
                    // in case of update, default data is the previous data
                    // in case of insert, default data is just a 
                    // js object with proper default values 
                    const defaultData = mutation.action === 'update'
                        ? getOldData(mutation).oldData
                        : getDefaultData(mutation);

                    return overrideDataProps(defaultData, mutation);
                });

            const dataIds = await this._ormService
                .createManyAsync(data, newDatas);

            //
            // CREATE ENTITES (FROM ADD MUTATIONS ONLY)
            const newEntities = mutationOrdered
                .filter(x => x.action === 'add')
                .map(getNewEntity);

            const newEntityIds = await this._ormService
                .createManyAsync(entity, newEntities);

            //
            // CREATE VERSIONS 
            const newVersions = mutationOrdered
                .map((mutation, i) => {

                    const newDataId = dataIds[i];

                    // if action is add, use new entity ids
                    // indexing works, because all new mutations
                    // are ordered as first
                    const entityId = mutation.action === 'add'
                        ? newEntityIds[i]
                        : getOldData(mutation).oldEntity.id;

                    // new entity: mutation has parent version id 
                    // otherwise use mutation or old data (mutation is priorized)
                    const oldParentVersionId: number = ((): number => {

                        if (mutation.action === 'add')
                            return XMutatorHelpers.getFieldValueOrFail(mutation)(mutationDTOParentVersionField) as any as number;

                        const oldParentVersionId = XMutatorHelpers.getFieldValue(mutation)(mutationDTOParentVersionField) as any as number;
                        if (oldParentVersionId)
                            return oldParentVersionId;

                        return getParentVersionId(getOldData(mutation).oldVersion)
                    })();

                    const newParentVersionId = VersionMigrationHelpers
                        .getNewVersionId(parentVersionIdMigrations, oldParentVersionId);

                    return getNewVersion({
                        entityId,
                        newDataId,
                        newParentVersionId
                    });
                });

            const newVersionIds = await this._ormService
                .createManyAsync(version, newVersions);

            return VersionMigrationHelpers
                .create(oldVersionIds, newVersionIds);
        };
    }

    /**
     * Get item old data 
     */
    private async _getOldDataView<TMutation extends Mutation<any, any>, TVersion extends EntityType, TData extends EntityType, TEntity extends EntityType>(
        version: ClassType<TVersion>,
        data: ClassType<TData>,
        entity: ClassType<TEntity>,
        getDataId: (version: TVersion) => number,
        getEntityId: (version: TVersion) => number,
        mutations: TMutation[]): Promise<GetVersionDataPairsFnType<TMutation, TVersion, TData, TEntity>> {

        const updateMutations = mutations
            .filter(x => x.action === 'update');

        if (updateMutations.length === 0)
            return {
                getOldData: () => { throw new Error('Version data pairs have no elements!') },
                oldVersionIds: []
            };

        const oldVersionIds = updateMutations
            .map(x => VersionCode.read(x.key).versionId);

        const oldVersions = await this._ormService
            .query(version, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const oldDatas = await this._ormService
            .query(data, { ids: oldVersions.map(getDataId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldVideos = await this._ormService
            .query(entity, { ids: oldVersions.map(getEntityId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldData = oldVersions
            .map((x, i) => ({
                oldVersion: x,
                oldData: oldDatas[i],
                oldEntity: oldVideos[i]
            } as OldData<TVersion, TData, TEntity>))

        const getOldData = (mutation: TMutation) => oldData
            .single(x => x.oldVersion.id === VersionCode.read(mutation.key).versionId);

        return { getOldData, oldVersionIds };
    }
}