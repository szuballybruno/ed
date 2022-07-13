import { Mutation } from '../shared/dtos/mutations/Mutation';
import { Id } from '../shared/types/versionId';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { log } from './misc/logger';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType } from './XORM/XORMTypes';

type SaveActionType = {
    mutation: Mutation<any, any> | null;
    oldVersionId: Id<any>;
    action: 'ADD' | 'UPDATE' | 'INCREMENT';
}

export class VersionSaveService {

    constructor(
        private _ormService: ORMConnectionService) {
    }

    /**
     * SAVE
     */
    async saveAsync<
        TDTO,
        TMutationKey extends keyof TDTO,
        TVersion extends EntityType,
        TData extends EntityType,
        TEntity extends EntityType,
        TParentVersionName extends String
    >(opts: {
        dtoSignature: ClassType<TDTO>,
        versionSignature: ClassType<TVersion>,
        dataSignature: ClassType<TData>,
        entitySignature: ClassType<TEntity>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdMigrations: VersionMigrationResult<TParentVersionName>[],
        muts: Mutation<TDTO, TMutationKey>[],
        getParentOldVersionId: (dto: Partial<TDTO>) => Id<TParentVersionName> | null | undefined,
        getDataId: (version: TVersion) => TData['id'],
        getEntityId: (version: TVersion) => TEntity['id'],
        getVersionId: (mutation: Mutation<TDTO, TMutationKey>) => TVersion['id'],
        getDefaultData: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        overrideDataProps: (data: InsertEntity<TData>, mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        getNewEntity: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TEntity>,
        getNewVersion: (opts: { newDataId: TData['id'], entityId: TEntity['id'], newParentVersionId: Id<TParentVersionName> }) => InsertEntity<TVersion>
    }) {

        const {
            muts,
            parentVersionIdMigrations,
            dtoSignature,
            versionSignature,
            dataSignature,
            entitySignature,
            parentVersionIdField,
            getParentOldVersionId,
            getDataId,
            getDefaultData,
            getEntityId,
            getVersionId,
            getNewEntity,
            getNewVersion,
            overrideDataProps
        } = opts;

        this._log(`Saving ${entitySignature.name}...`);

        // get all old versions of parent 
        const oldVersions = await this
            ._getAllOldVersionsByParent(
                versionSignature,
                parentVersionIdField,
                parentVersionIdMigrations,
                muts,
                getVersionId);

        // get old verison ids 
        const { oldVersionIds } = this
            ._getOldVersionIds(muts, oldVersions, getVersionId);

        // get old data
        const { getOldData } = await this
            ._getOldDataView({
                data: dataSignature,
                entity: entitySignature,
                oldVersions,
                getDataId,
                getEntityId,
            });

        // mutations
        const mutaitonsOrdered = muts
            .filter(x => x.action !== 'delete')
            .orderBy(x => x.action === 'add' ? 1 : 2);

        // get increment save actions
        const incrementSaveActions = oldVersionIds
            .filter(oldVersionId => !mutaitonsOrdered
                .some(mut => getVersionId(mut) === oldVersionId))
            .map(oldVersionId => ({ oldVersionId }));

        //
        // CREATE VIDEO DATAS
        const newDatas = mutaitonsOrdered
            .map((mutation) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getOldData(getVersionId(mutation)).oldData
                    : getDefaultData(mutation);

                return overrideDataProps(defaultData, mutation);
            });

        const dataIds = await this._ormService
            .createManyAsync(dataSignature, newDatas);

        //
        // CREATE ENTITES (FROM ADD MUTATIONS ONLY)
        const newEntities = mutaitonsOrdered
            .filter(x => x.action === 'add')
            .map(getNewEntity);

        const newEntityIds = await this._ormService
            .createManyAsync(entitySignature, newEntities);

        //
        // CREATE VERSIONS 
        const saveActions = mutaitonsOrdered
            .map(x => ({
                mutation: x,
                oldVersionId: getVersionId(x),
                action: x.action === 'add' ? 'ADD' : 'UPDATE'
            }) as SaveActionType)
            .concat(incrementSaveActions
                .map(x => ({
                    mutation: null,
                    oldVersionId: x.oldVersionId,
                    action: 'INCREMENT'
                } as SaveActionType)));

        const newVersions = saveActions
            .map(({ mutation, oldVersionId }, i) => {

                // if no mutation (increment) use old
                // ELSE use new
                const newDataId = mutation
                    ? dataIds[i]
                    : getOldData(oldVersionId).oldData.id;

                // if no mutation (increment) OR mutation is update, 
                // use exisitng entity id
                // ELSE use new entity id
                const entityId = !mutation || mutation.action === 'update'
                    ? getOldData(oldVersionId).oldEntity.id
                    : newEntityIds[i];

                // new entity: mutation has parent version id 
                // otherwise use mutation or old data (mutation is priorized)
                const oldParentVersionId = ((): Id<TParentVersionName> => {

                    if (!mutation)
                        return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any;

                    if (mutation.action === 'add')
                        return XMutatorHelpers.getFieldValueOrFail(mutation)(getParentOldVersionId) as any;

                    const oldParentVersionId = XMutatorHelpers.getFieldValue(mutation)(getParentOldVersionId);
                    if (oldParentVersionId)
                        return oldParentVersionId;

                    return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any
                })();

                const newParentVersionId = VersionMigrationHelpers
                    .getNewVersionId<TParentVersionName>(parentVersionIdMigrations, oldParentVersionId);

                return getNewVersion({
                    entityId,
                    newDataId,
                    newParentVersionId
                });
            });

        const newVersionIds = await this._ormService
            .createManyAsync(versionSignature, newVersions);

        const res = VersionMigrationHelpers
            .create(oldVersionIds, newVersionIds);

        this._log(res
            .map((x, i) => `${x.oldVersionId} -> ${x.newVersionId} [${saveActions[i].action}]`).join('\n'));

        this._log(`Saved ${entitySignature.name}.`);

        return res;
    }

    /**
     * Get old versions  
     */
    private async _getAllOldVersionsByParent<TVersion extends EntityType, TParentVersionName extends String>(
        versionSignature: ClassType<TVersion>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdMigrations: VersionMigrationResult<TParentVersionName>[],
        mutations: Mutation<any, any>[],
        getVersionId: (mutation: Mutation<any, any>) => TVersion['id']) {

        const oldParentVersionIds = parentVersionIdMigrations
            .map(x => Id.read(x.oldVersionId));

        const oldVersions = await this._ormService
            .query(versionSignature, { oldParentVersionIds })
            .where(parentVersionIdField, '=', 'oldParentVersionIds')
            .getMany();

        const delMutations = mutations
            .filter(x => x.action === 'delete');

        const nonDeleted = oldVersions
            .filter(oldVer => !delMutations
                .some(delMut => getVersionId(delMut) === oldVer.id))

        return nonDeleted;
    }

    /**
     * Get item old data 
     */
    private async _getOldDataView<
        TVersion extends EntityType,
        TData extends EntityType,
        TEntity extends EntityType>(opts: {
            data: ClassType<TData>,
            entity: ClassType<TEntity>,
            oldVersions: TVersion[],
            getDataId: (version: TVersion) => TData['id'],
            getEntityId: (version: TVersion) => TEntity['id'],
        }) {

        const { data, entity, getDataId, getEntityId, oldVersions } = opts;

        const oldData: OldData<TVersion, TData, TEntity>[] = oldVersions.length === 0
            ? [] as OldData<TVersion, TData, TEntity>[]
            : await (async () => {

                const oldDataIds = oldVersions.map(x => Id.read(getDataId(x)));
                const oldEntityIds = oldVersions.map(x => Id.read(getEntityId(x)));

                const oldDatas = await this._ormService
                    .query(data, { oldDataIds })
                    .where('id', '=', 'oldDataIds')
                    .getMany();

                const oldVideos = await this._ormService
                    .query(entity, { oldEntityIds })
                    .where('id', '=', 'oldEntityIds')
                    .getMany();

                const oldData = oldVersions
                    .map((ver) => ({
                        oldVersion: ver,
                        oldData: oldDatas.single(data => data.id === getDataId(ver)),
                        oldEntity: oldVideos.single(ent => ent.id === getEntityId(ver))
                    } as OldData<TVersion, TData, TEntity>));

                return oldData;
            })();

        const getOldData = (versionId: TVersion['id']) => {

            return oldData
                .single(x => x.oldVersion.id === versionId);
        };

        return { getOldData };
    }

    /**
     * get old version ids 
     */
    private _getOldVersionIds<
        TMutation extends Mutation<any, any>,
        TVersion extends EntityType,
        >(
            mutations: TMutation[],
            oldVersions: EntityType[],
            getVersionId: (mut: TMutation) => TVersion['id']) {

        const addMutationOldVersionIds = mutations
            .filter(x => x.action === 'add')
            .map(x => getVersionId(x));

        const oldVersionIds = addMutationOldVersionIds
            .concat(oldVersions.map(x => x.id));

        return { oldVersionIds };
    }

    /**
     * Log
     */
    private _log(text: string) {

        log(text, { noStamp: true });
    }
}