import { ModuleCreateDTO } from '../shared/dtos/ModuleCreateDTO';
import { ModuleAdminEditDTO } from '../shared/dtos/ModuleAdminEditDTO';
import { ActionParams } from '../utilities/ActionParams';
import { ModuleService } from '../services/ModuleService';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';

export class ModuleController {

    private _moduleService: ModuleService;

    constructor(moduleService: ModuleService) {

        this._moduleService = moduleService;
    }

    @XControllerAction(apiRoutes.module.createModule, { isPost: true })
    createModuleAction = async (params: ActionParams) => {

        await this._moduleService
            .createModuleAsync(params.getBody<ModuleCreateDTO>().data);
    };

    @XControllerAction(apiRoutes.module.deleteModule, { isPost: true })
    deleteModuleAction = async (params: ActionParams) => {

        const moduleId = params
            .getBody<{ moduleId: number }>()
            .getValue(x => x.moduleId, 'int');

        await this._moduleService
            .deleteModulesAsync([moduleId]);
    };

    @XControllerAction(apiRoutes.module.getModuleEditData)
    getModuleEditDataAction = async (params: ActionParams) => {

        const moduleId = params
            .getQuery()
            .getValue(x => x.moduleId, 'int');

        return this._moduleService
            .getModuleEditDataAsync(moduleId);
    };

    @XControllerAction(apiRoutes.module.saveModule, { isPost: true, isMultipart: true })
    saveModuleAction = async (params: ActionParams) => {

        const dto = params
            .getBody<ModuleAdminEditDTO>();

        const file = params
            .getSingleFile();

        return this._moduleService
            .saveModuleAsync(dto.data, file);
    };

    @XControllerAction(apiRoutes.module.getModuleListEditData)
    getModuleListEditAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return this._moduleService
            .getModuleListEditDataAsync(courseId);
    };
}