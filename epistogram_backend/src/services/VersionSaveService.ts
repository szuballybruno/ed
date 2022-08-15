import { Mutation } from '../shared/dtos/mutations/Mutation';
import { Id } from '../shared/types/versionId';
import { InsertEntity, VersionMigrationContainer } from '../utilities/misc';
import { LoggerService } from './LoggerService';
import { ClassType } from './misc/advancedTypes/ClassType';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType, GetIdType } from './XORM/XORMTypes';

type SaveActionType = {
    mutation: Mutation<any, any> | null;
    oldVersionId: Id<any>;
    action: 'ADD' | 'UPDATE' | 'INCREMENT';
}

export class VersionSaveService {

    constructor(
        private _ormService: ORMConnectionService,
        private _loggerService: LoggerService) {
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
        TParentName extends String
    >({
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
        overrideDataProps,
        getDataDisplayNameArg
    }: {
        dtoSignature: ClassType<TDTO>,
        versionSignature: ClassType<TVersion>,
        dataSignature: ClassType<TData>,
        entitySignature: ClassType<TEntity>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdMigrations: VersionMigrationContainer<TParentName>,
        muts: Mutation<TDTO, TMutationKey>[],
        getParentOldVersionId: (dto: Partial<TDTO>) => Id<TParentName> | null | undefined,
        getDataId: (version: TVersion) => TData['id'],
        getEntityId: (version: TVersion) => TEntity['id'],
        getVersionId: (mutation: Mutation<TDTO, TMutationKey>) => TVersion['id'],
        getDefaultData: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        overrideDataProps: (data: InsertEntity<TData>, mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TData>,
        getNewEntity: (mutation: Mutation<TDTO, TMutationKey>) => InsertEntity<TEntity>,
        getNewVersion: (opts: { newDataId: TData['id'], entityId: TEntity['id'], newParentVersionId: Id<TParentName> }) => InsertEntity<TVersion>,
        getDataDisplayNameArg?: (data: TData) => string
    }) {

        // override getDataDisplayName with a fn 
        // that returns the data enituy's id
        const getDataDisplayName = getDataDisplayNameArg
            ? (x: TData) => getDataDisplayNameArg(x)
                .substring(0, 10)
            : (data: TData) => (data.id ?? '-') + '';

        this._loggerService
            .logScoped('VERSION SAVE', `Saving ------------- ${entitySignature.name}...`);

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
        const { getOldData, oldData } = await this
            ._getOldDataView({
                data: dataSignature,
                entity: entitySignature,
                oldVersions,
                getDataId,
                getEntityId,
            });

        // get ordered non-delete mutations
        // order by add/update:
        // adds go first, updates go last
        const mutaitonsOrdered = muts
            .filter(x => x.action !== 'delete')
            .orderBy(x => x.action === 'add' ? 1 : 2);

        // get save actions for incrementing
        // unchanged items 
        const incrementSaveActions = oldVersionIds
            .filter(oldVersionId => !mutaitonsOrdered
                .some(mut => getVersionId(mut) === oldVersionId))
            .map(oldVersionId => ({ oldVersionId }));

        /**
         * Get save actions,
         * these will decide on what will happen to the item 
         */
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

                const newData = overrideDataProps(defaultData, mutation);

                return {
                    newData,
                    mutation
                };
            });

        const dataIds = await this._ormService
            .createManyAsync(dataSignature, newDatas.map(x => x.newData));

        //
        // CREATE ENTITES (FROM ADD MUTATIONS ONLY)
        const newEntities = mutaitonsOrdered
            .filter(x => x.action === 'add')
            .map(getNewEntity);

        const newEntityIds = await this._ormService
            .createManyAsync(entitySignature, newEntities);

        //
        // CREATE VERSIONS 
        const newVersions = saveActions
            .map(({ mutation, oldVersionId }, i) => {

                // if no mutation (increment) use old
                // ELSE use new
                const newDataId: Id<any> = mutation
                    ? dataIds[i]
                    : getOldData(oldVersionId).oldData.id;

                // if no mutation (increment) OR mutation is update, 
                // use exisitng entity id
                // ELSE use new entity id
                const entityId: Id<any> = !mutation || mutation.action === 'update'
                    ? getOldData(oldVersionId).oldEntity.id
                    : newEntityIds[i];

                // new entity: mutation has parent version id 
                // otherwise use mutation or old data (mutation is priorized)
                const oldParentVersionId = ((): Id<TParentName> => {

                    if (!mutation)
                        return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any;

                    if (mutation.action === 'add')
                        return XMutatorHelpers.getFieldValueOrFail(mutation)(getParentOldVersionId) as any;

                    const oldParentVersionId = XMutatorHelpers.getFieldValue(mutation)(getParentOldVersionId);
                    if (oldParentVersionId)
                        return oldParentVersionId;

                    return getOldData(oldVersionId).oldVersion[parentVersionIdField] as any;
                })();

                const newParentVersionId = parentVersionIdMigrations
                    .getNewVersionId(oldParentVersionId);

                return getNewVersion({
                    entityId,
                    newDataId,
                    newParentVersionId
                });
            });

        const newVersionIds = await this._ormService
            .createManyAsync(versionSignature, newVersions);

        const aggregated = saveActions
            .map((saveAction, index) => {

                const oldData = saveAction.oldVersionId as any > 0
                    ? getOldData(saveAction.oldVersionId).oldData
                    : null;

                const newData = newDatas
                    .firstOrNull(x => x.mutation.key === saveAction.mutation?.key)
                    ?.newData as TData;

                const currentData: TData = oldData || newData;

                const newVersion = newVersions[index];
                const newVersionId = newVersionIds[index];
                const parentVersionId = (newVersion as any)[parentVersionIdField];
                const parentSlug = parentVersionIdMigrations
                    .getSlug(parentVersionId);

                const childSlug = `${getDataDisplayName(currentData)} (${newVersionId})`;

                const slug = parentSlug + ' / ' + childSlug;

                return {
                    oldData,
                    newData,
                    saveAction,
                    parentVersionId,
                    newVersion,
                    slug,
                    newVersionId
                };
            });

        const versionMigrations = new VersionMigrationContainer<GetIdType<TVersion['id']>>(
            aggregated.map(x => x.saveAction.oldVersionId),
            aggregated.map(x => x.newVersionId as Id<any>),
            aggregated.map(x => x.slug));

        const log = aggregated
            .groupBy(aggData => aggData.parentVersionId)
            .flatMap((aggDataGrouping) => aggDataGrouping
                .items
                .map((aggData) => {

                    const { slug, saveAction, newVersionId } = aggData;

                    return `${slug} | VersionId: ${saveAction.oldVersionId} -> ${newVersionId}`;
                }))
            .join('\n');

        this._loggerService
            .logScoped('VERSION SAVE', '\n' + log);

        return versionMigrations;
    }

    /**
     * Get old versions  
     */
    private async _getAllOldVersionsByParent<TVersion extends EntityType, TParentName extends String>(
        versionSignature: ClassType<TVersion>,
        parentVersionIdField: keyof TVersion,
        parentVersionIdMigrations: VersionMigrationContainer<TParentName>,
        mutations: Mutation<any, any>[],
        getVersionId: (mutation: Mutation<any, any>) => TVersion['id']) {

        const oldParentVersionIds = parentVersionIdMigrations
            .getMigrations()
            .map(x => Id.read(x.oldVersionId));

        const oldVersions = await this._ormService
            .query(versionSignature, { oldParentVersionIds })
            .where(parentVersionIdField, '=', 'oldParentVersionIds')
            .getMany();

        const delMutations = mutations
            .filter(x => x.action === 'delete');

        const nonDeleted = oldVersions
            .filter(oldVer => !delMutations
                .some(delMut => getVersionId(delMut) === oldVer.id));

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

        const getOldData = (oldVersionId: TVersion['id']) => {

            try {

                return oldData
                    .single(x => x.oldVersion.id === oldVersionId);
            }
            catch (e: any) {

                throw new Error(`Old data not found by old version id: ${oldVersionId}! ${e.message}`);
            }
        };

        return { getOldData, oldData };
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
}