import { Module } from '../models/entity/module/Module';
import { ModuleData } from '../models/entity/module/ModuleData';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { ModuleEditView } from '../models/views/ModuleEditView';
import { ModulePlayerView } from '../models/views/ModulePlayerView';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { ModuleEditDTO } from '../shared/dtos/ModuleEditDTO';
import { Id } from '../shared/types/versionId';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { CourseItemSimpleType } from '../shared/types/sharedTypes';
import { VersionCode } from '../shared/types/versionCode';
import { VersionMigrationResult } from '../utilities/misc';
import { CourseItemService } from './CourseItemService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { VersionSaveService } from './VersionSaveService';
import { ModulePlayerDTO } from '../shared/dtos/ModulePlayerDTO';
import { AuthorizationService } from './AuthorizationService';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { User } from '../models/entity/User';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class ModuleService {

    private _authorizationService: AuthorizationService;

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _courseItemService: CourseItemService,
        private _versionSaveService: VersionSaveService,
        private _fileService: FileService,
        private authorizationService: AuthorizationService) {

        this._authorizationService = authorizationService;
    }

    /**
     * Gets a detailed module dto.
     */
    async getModuleDetailedDTOAsync(moduleId: Id<'Module'>): Promise<ModulePlayerDTO> {

        const view = await this._ormService
            .query(ModulePlayerView, { moduleId })
            .where('moduleId', '=', 'moduleId')
            .getSingle();

        return this._mapperService
            .mapTo(ModulePlayerDTO, [view]);
    }

    /**
     * get module edit dtos 
     * for module admin
     */
    getModuleEditDTOsAsync(principalId: PrincipalId, courseVersionId: Id<'CourseVersion'>): ControllerActionReturnType {

        return {
            action: async () => {
                const modules = await this._ormService
                    .query(ModuleEditView, { courseVersionId })
                    .where('courseVersionId', '=', 'courseVersionId')
                    .getMany();

                return this._mapperService
                    .mapTo(ModuleEditDTO, [modules]);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'EDIT_COMPANY_COURSES', { companyId });
            }
        };


    }

    /**
     * Saves module's thumbnail image
     */
    saveModuleThumbnailImageAsync(principalId: PrincipalId, moduleVersionId: Id<'ModuleVersion'>, fileBuffer: Buffer): ControllerActionReturnType {

        return {
            action: async () => {

                const moduleVersion = await this._ormService
                    .getSingleById(ModuleVersion, moduleVersionId);

                await this._fileService
                    .uploadAssigendFileAsync({
                        entitySignature: ModuleData,
                        entityId: moduleVersion.moduleDataId,
                        fileBuffer: fileBuffer,
                        fileCode: 'module_thumbnail',
                        storageFileIdField: 'imageFileId'
                    });
            },

            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'EDIT_COMPANY_COURSES', { companyId });
            }
        };
    }

    /**
     * Save modules
     */
    async saveModulesAsync({
        courseVersionMigrations,
        itemMutations,
        moduleMutations
    }: {
        courseVersionMigrations: VersionMigrationResult<'CourseVersion'>[],
        itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
        moduleMutations: Mutation<ModuleEditDTO, 'versionId'>[]
    }) {

        // get old course version id
        const oldCoruseVersionId = courseVersionMigrations
            .single(x => true)
            .oldVersionId;

        // save modules
        const moduleVersionMigrations = await this
            ._versionSaveService
            .saveAsync({
                entitySignature: Module,
                dataSignature: ModuleData,
                versionSignature: ModuleVersion,
                dtoSignature: ModuleEditDTO,
                getDataId: x => x.moduleDataId,
                getEntityId: x => x.moduleId,
                getDefaultData: x => ({
                    description: '',
                    imageFileId: null,
                    name: '',
                    orderIndex: 0
                }),
                getNewEntity: x => ({ isPretestModule: false }),
                getNewVersion: x => ({
                    courseVersionId: x.newParentVersionId,
                    moduleDataId: x.newDataId,
                    moduleId: x.entityId
                }),
                getVersionId: x => x.key,
                muts: moduleMutations,
                overrideDataProps: (data, mutation) => {

                    const { description, name, orderIndex } = XMutatorHelpers
                        .mapMutationToPartialObject(mutation);

                    if (description)
                        data.description = description;

                    if (name)
                        data.name = name;

                    if (orderIndex)
                        data.orderIndex = orderIndex;

                    return data;
                },
                parentVersionIdField: 'courseVersionId',
                getParentOldVersionId: _ => oldCoruseVersionId,
                parentVersionIdMigrations: courseVersionMigrations
            });

        // save items
        const { examMutations, videoMutations } = await this
            ._separateCourseItemMutations(itemMutations);

        await this._courseItemService
            .saveAsync(moduleVersionMigrations, videoMutations, examMutations);
    }

    /**
     * Separate course item mutations into video / exam mutations 
     */
    private async _separateCourseItemMutations(itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        const filterMutations = (
            versionType: CourseItemSimpleType) => {

            return itemMutations
                .filter(x => VersionCode.read(x.key).versionType === versionType);
        };

        const videoMutations = filterMutations('video');
        const examMutations = filterMutations('exam');

        return { videoMutations, examMutations };
    }
}