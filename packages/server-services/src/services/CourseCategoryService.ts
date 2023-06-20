import { CompanyCourseCategoriesDTO, CourseCategoryDTO, CreateCourseCategoryDTO, Mutation } from '@episto/communication';
import { Id, PrincipalId } from '@episto/x-core';
import { ClassType } from '../models/misc/ClassType';
import { CourseAccessBridge } from '../models/tables/CourseAccessBridge';
import { CourseCategory } from '../models/tables/CourseCategory';
import { CourseCategoryAssignmentBridge } from '../models/tables/CourseCategoryAssignmentBridge';
import { CompanyCourseCategoryView } from '../models/views/CompanyCourseCategoryView';
import { InsertEntity } from '../utilities/misc';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { CourseData } from '../models/tables/CourseData';
import { ErrorWithCode } from '@episto/commontypes';
import { CourseCategoryView } from '../models/views/CourseCategoryView';
import { User } from '../models/tables/User';

export class CourseCategoryService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService
    ) {

    }

    async getAvailableCourseCategoriesAsync(principalId: PrincipalId) {

        const principalUser = await this._ormService
            .query(User, { principalId })
            .where('id', '=', 'principalId')
            .getSingle()

        const courseCategories = await this._ormService
            .query(CourseCategoryView, { companyId: principalUser.companyId })
            .where('parentCategoryId', 'IS', 'NULL')
            .and('companyId', '=', 'companyId')
            .getMany();

        return this._mapperService
            .mapTo(CourseCategoryDTO, [courseCategories]);
    }

    async getCompanyCourseCategoriesAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        //TODO: Check permission

        const courseCategories = await this._ormService
            .query(CompanyCourseCategoryView, {
                companyId
            })
            .where('companyId', '=', 'companyId')
            .getMany();

        return courseCategories
    }

    async saveCompanyCourseCategoriesAsync(companyId: Id<'Company'>, mutations: Mutation<CompanyCourseCategoriesDTO, 'courseCategoryId'>[]) {
        type AssignActionType = { id: Id<'CourseCategory'>, action: 'DETACH' | 'ATTACH' };
        type UpdateActionType = { id: Id<'CourseCategory'>, name: string };

        console.log(mutations);
        console.log(mutations.map(x => x.fieldMutators))

        const handleRelationChangeAsync = async <TBridge extends { id: Id<string> }>({
            bridge,
            entity,
            createBridge,
            getCourseCategoryIdAssignActions,
            getCourseCategoryIdUpdateActions,
            getDeletedBridgesAsync
        }: {
            bridge: ClassType<TBridge>,
            entity: ClassType<CourseCategory>,
            getCourseCategoryIdAssignActions: () => AssignActionType[],
            getCourseCategoryIdUpdateActions: () => UpdateActionType[],
            getDeletedBridgesAsync: (courseCategoryIds: Id<'CourseCategory'>[]) => Promise<TBridge[]>,
            createBridge: (courseCategoryId: Id<'CourseCategory'>) => InsertEntity<TBridge>
        }) => {

            const assignActions = getCourseCategoryIdAssignActions();
            const updateActions = getCourseCategoryIdUpdateActions();

            // delete bridges 
            const deletedBridges = await getDeletedBridgesAsync(assignActions
                .filter(x => x.action === 'DETACH')
                .map(x => x.id));

            await this
                ._ormService
                .hardDelete(bridge, deletedBridges.map(x => x.id));

            // added bridges 
            const assignedCourseCategoryIds = assignActions
                .filter(x => x.action === 'ATTACH')
                .map(x => x.id);

            await this
                ._ormService
                .createManyAsync(bridge, assignedCourseCategoryIds
                    .map(createBridge));

            // updated course categories

            await this
                ._ormService
                .save(entity, updateActions);
        };

        const assignActions: AssignActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'isEnabled'))
            .map(mut => ({
                id: mut.key,
                action: mut
                    .fieldMutators
                    .single(x => x.field === 'isEnabled').value ? 'ATTACH' : 'DETACH'
            }));

        const updateActions: UpdateActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'name'))
            .map(mut => ({
                id: mut.key,
                name: mut
                    .fieldMutators
                    .single(x => x.field === 'name').value as string,
            }));

        /**
         * Save course access bridges according to mutations 
         */
        await handleRelationChangeAsync({
            bridge: CourseCategoryAssignmentBridge,
            entity: CourseCategory,
            getCourseCategoryIdAssignActions: () => assignActions,
            getCourseCategoryIdUpdateActions: () => updateActions,
            getDeletedBridgesAsync: async (courseCategoryIds) => await this
                ._ormService
                .query(CourseCategoryAssignmentBridge, { companyId, courseCategoryIds })
                .where('companyId', '=', 'companyId')
                .and('courseCategoryId', '=', 'courseCategoryIds')
                .getMany(),
            createBridge: courseCategoryId => ({
                courseCategoryId: courseCategoryId,
                companyId
            })
        });

    }

    async createCourseCategoryAsync(principalId: PrincipalId, dto: CreateCourseCategoryDTO) {

        await this._ormService
            .createAsync(CourseCategory, {
                name: dto.name,
                parentCategoryId: dto.parentCategoryId
            } as CourseCategory);
    }

    async deleteCourseCategoryAsync(principalId: PrincipalId, courseCategoryId: Id<'CourseCategory'>, companyId: Id<'Company'>) {

        const conflictingCourses = await this._ormService
            .query(CourseData, { courseCategoryId })
            .where('categoryId', '=', 'courseCategoryId')
            .or('subCategoryId', '=', 'courseCategoryId')
            .getMany();


        if (conflictingCourses.length > 0) {

            const conflictingCourseTitles = conflictingCourses
                .map(x => x.title)

            throw new ErrorWithCode('A kategória törlése sikertelen, mivel az alábbi kurzus(ok)hoz hozzá van rendelve: ' + conflictingCourseTitles.map(x => x), 'internal server error')
        }

        const deletableBridges = await this._ormService
            .query(CourseCategoryAssignmentBridge, { courseCategoryId, companyId })
            .where('courseCategoryId', '=', 'courseCategoryId')
            .and('companyId', '=', 'companyId')
            .getMany();

        await this._ormService
            .hardDelete(CourseCategoryAssignmentBridge, deletableBridges.map(x => x.id));

        const conflictingCompanies = await this._ormService
            .query(CompanyCourseCategoryView, { courseCategoryId })
            .where('courseCategoryId', '=', 'courseCategoryId')
            .and('isEnabled', 'IS', 'true')
            .getMany();

        if (conflictingCompanies.length > 0) {

            const conflictingCompanyIds = conflictingCompanies
                .map(x => x.companyId)

            throw new ErrorWithCode('A kategória törlése sikertelen, mivel az alábbi cég(ek)hez hozzá van rendelve: ' + conflictingCompanyIds.map(x => x), 'internal server error')
        }

        try {

            await this._ormService
                .hardDelete(CourseCategory, [courseCategoryId]);
        } catch (e) {

            console.error(e)
            throw new ErrorWithCode('A kategória törlése sikertelen, mivel feltehetőleg egy kurzus tartozik hozzá.', 'internal server error')
        }
    }
}