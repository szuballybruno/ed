import { CompanyFeatureDTO, CourseFeatureDTO, FeatureDTO, Mutation } from '@episto/communication';
import { Id, PrincipalId } from '@episto/x-core';
import { ClassType } from '../models/misc/ClassType';
import { Feature } from '../models/tables/Feature';
import { FeatureAssignmentBridge } from '../models/tables/FeatureAssignmentBridge';
import { User } from '../models/tables/User';
import { CompanyFeatureView } from '../models/views/CompanyFeatureView';
import { CourseFeatureView } from '../models/views/CourseFeatureView';
import { UserFeatureView } from '../models/views/UserFeatureView';
import { InsertEntity } from '../utilities/misc';
import { CompanyService } from './CompanyService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { QueryServiceBase } from './misc/ServiceBase';

export class FeatureService extends QueryServiceBase<Feature> {

    private _companyService: CompanyService;

    constructor(
        ormService: ORMConnectionService,
        companyService: CompanyService,
        mapperService: MapperService) {

        super(mapperService, ormService, Feature);

        this._companyService = companyService;
    }

    async checkFeatureAsync(principalId: PrincipalId, dto: FeatureDTO) {

        const type = await this
            ._getFeatureTypeAsync(dto.featureCode);

        const user = await this._ormService
            .query(User, { userId: dto.userId || principalId.getId() })
            .where('id', '=', 'userId')
            .getSingle();

        const userCompanyId = user.companyId;

        const principalCompanyId = await this
            ._companyService
            .getPrincipalCompanyId(principalId);

        const usedCompanyId = (() => {

            if (dto.userId)
                return userCompanyId;

            if (dto.companyId)
                return dto.companyId;

            return principalCompanyId;
        })()

        if (type === 'COURSE' && dto.courseId === null)
            throw new Error('This feature is course specific but the courseId is missing');

        if (type === 'VIDEO' && dto.videoId === null)
            throw new Error('This feature is video specific but the videoId is missing');

        if (type === 'EXAM' && dto.examId === null)
            throw new Error('This feature is exam specific but the examId is missing');

        if (type === 'SHOP_ITEM' && dto.shopItemId === null)
            throw new Error('This feature is shop item specific but the shopItemId is missing');

        const isEnabledByCompany = await this._ormService
            .query(UserFeatureView, {
                featureCode: dto.featureCode,
                companyId: usedCompanyId,
            })
            .where('featureCode', '=', 'featureCode')
            .and('companyId', '=', 'companyId')
            .getOneOrNull();

        const isEnabledByUser = await this._ormService
            .query(UserFeatureView, {
                userId: dto.userId ? dto.userId : principalId,
                featureCode: dto.featureCode
            })
            .where('featureCode', '=', 'featureCode')
            .and('userId', '=', 'userId')
            .and('isDeassigning', 'IS NOT', 'true')
            .getOneOrNull();

        const isDeassignedAtUserLevel = await this._ormService
            .query(UserFeatureView, {
                userId: dto.userId ? dto.userId : principalId,
                featureCode: dto.featureCode
            })
            .where('featureCode', '=', 'featureCode')
            .and('userId', '=', 'userId')
            .and('isDeassigning', 'IS', 'true')
            .getOneOrNull();

        const isEnabledByItem = await this._ormService
            .query(UserFeatureView, {
                featureCode: dto.featureCode,
                courseId: dto.courseId || -1
            })
            .where('featureCode', '=', 'featureCode')
            .and('courseId', '=', 'courseId')
            .getOneOrNull();

        if (isDeassignedAtUserLevel) {

            return false;
        }

        const isEnabled = !!(!!isEnabledByCompany || !!isEnabledByUser || !!isEnabledByItem);

        /*   console.log("isEnabledByCompany: " + isEnabledByCompany);
          console.log("isEnabledByUser: " + isEnabledByUser);
          console.log("isEnabledByItem: " + JSON.stringify(isEnabledByItem));
          console.log("isEnabled: " + isEnabled); */

        return isEnabled;

    }

    async getCompanyFeaturesAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        //TODO: Check permission

        const features = await this._ormService
            .query(CompanyFeatureView, {
                companyId
            })
            .where('companyId', '=', 'companyId')
            .getMany();

        return features
    }

    async saveCompanyFeaturesAsync(companyId: Id<'Company'>, mutations: Mutation<CompanyFeatureDTO, 'featureId'>[]) {
        type ActionType = { id: Id<'Feature'>, action: 'DETACH' | 'ATTACH' };

        const handleRelationChangeAsync = async <TBridge extends { id: Id<string> }>({
            bridge,
            createBridge,
            getFeatureIdActions,
            getDeletedBridgesAsync
        }: {
            bridge: ClassType<TBridge>,
            getFeatureIdActions: () => ActionType[],
            getDeletedBridgesAsync: (featureIds: Id<'Feature'>[]) => Promise<TBridge[]>,
            createBridge: (featureId: Id<'Feature'>) => InsertEntity<TBridge>
        }) => {

            const actions = getFeatureIdActions();

            // delete bridges 
            const deletedBridges = await getDeletedBridgesAsync(actions
                .filter(x => x.action === 'DETACH')
                .map(x => x.id));

            await this
                ._ormService
                .hardDelete(bridge, deletedBridges.map(x => x.id));

            // added bridges 
            const assignedFeatureIds = actions
                .filter(x => x.action === 'ATTACH')
                .map(x => x.id);

            await this
                ._ormService
                .createManyAsync(bridge, assignedFeatureIds
                    .map(createBridge));
        };

        const assignActions: ActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'isEnabled'))
            .map(mut => ({
                id: mut.key,
                action: mut
                    .fieldMutators
                    .single(x => x.field === 'isEnabled').value ? 'ATTACH' : 'DETACH'
            }));

        /**
         * Save course access bridges according to mutations 
         */
        await handleRelationChangeAsync({
            bridge: FeatureAssignmentBridge,
            getFeatureIdActions: () => assignActions,
            getDeletedBridgesAsync: async (featureIds) => await this
                ._ormService
                .query(FeatureAssignmentBridge, { companyId, featureIds })
                .where('companyId', '=', 'companyId')
                .and('featureId', '=', 'featureIds')
                .getMany(),
            createBridge: featureId => ({
                companyId,
                userId: null,
                featureId: featureId,
                courseId: null,
                examId: null,
                shopItemId: null,
                videoId: null,
                isDeassigning: null
            })
        });

    }

    async getCourseFeaturesAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        //TODO: Check permission

        const features = await this._ormService
            .query(CourseFeatureView, {
                courseId
            })
            .where('courseId', '=', 'courseId')
            .getMany();

        return features
    }

    async saveCourseFeaturesAsync(courseId: Id<'Course'>, mutations: Mutation<CourseFeatureDTO, 'featureId'>[]) {
        type ActionType = { id: Id<'Feature'>, action: 'DETACH' | 'ATTACH' };

        const handleRelationChangeAsync = async <TBridge extends { id: Id<string> }>({
            bridge,
            createBridge,
            getFeatureIdActions,
            getDeletedBridgesAsync
        }: {
            bridge: ClassType<TBridge>,
            getFeatureIdActions: () => ActionType[],
            getDeletedBridgesAsync: (featureIds: Id<'Feature'>[]) => Promise<TBridge[]>,
            createBridge: (featureId: Id<'Feature'>) => InsertEntity<TBridge>
        }) => {

            const actions = getFeatureIdActions();

            // delete bridges 
            const deletedBridges = await getDeletedBridgesAsync(actions
                .filter(x => x.action === 'DETACH')
                .map(x => x.id));

            await this
                ._ormService
                .hardDelete(bridge, deletedBridges.map(x => x.id));

            // added bridges 
            const assignedFeatureIds = actions
                .filter(x => x.action === 'ATTACH')
                .map(x => x.id);

            await this
                ._ormService
                .createManyAsync(bridge, assignedFeatureIds
                    .map(createBridge));
        };

        const assignActions: ActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'isEnabled'))
            .map(mut => ({
                id: mut.key,
                action: mut
                    .fieldMutators
                    .single(x => x.field === 'isEnabled').value ? 'ATTACH' : 'DETACH'
            }));

        /**
         * Save course access bridges according to mutations 
         */
        await handleRelationChangeAsync({
            bridge: FeatureAssignmentBridge,
            getFeatureIdActions: () => assignActions,
            getDeletedBridgesAsync: async (featureIds) => await this
                ._ormService
                .query(FeatureAssignmentBridge, { courseId, featureIds })
                .where('courseId', '=', 'courseId')
                .and('featureId', '=', 'featureIds')
                .getMany(),
            createBridge: featureId => ({
                courseId,
                userId: null,
                featureId: featureId,
                companyId: null,
                examId: null,
                shopItemId: null,
                videoId: null,
                isDeassigning: false
            })
        });

    }

    private async _getFeatureTypeAsync(featureCode: string) {

        const feature = await this
            ._ormService
            .query(Feature, { featureCode })
            .where('code', '=', 'featureCode')
            .getSingle();

        return feature.type;
    }

}