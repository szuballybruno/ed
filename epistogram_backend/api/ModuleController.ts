import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleAdminEditDTO } from "../models/shared_models/ModuleAdminEditDTO";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";
import { ModuleService } from "../services/ModuleService";

export class ModuleController {

    private _moduleService: ModuleService;

    constructor(moduleService: ModuleService) {

        this._moduleService = moduleService;
    }

    createModuleAction = async (params: ActionParams) => {

        await this._moduleService
            .createModuleAsync(params.getBody<ModuleCreateDTO>().data);
    }

    deleteModuleAction = async (params: ActionParams) => {

        const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

        await this._moduleService
            .deleteModulesAsync([moduleId]);
    }

    getModuleEditDataAction = async (params: ActionParams) => {

        const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

        return this._moduleService
            .getModuleEditDataAsync(moduleId);
    }

    saveModuleAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<ModuleAdminEditDTO>(params.req.body);

        return this._moduleService
            .saveModuleAsync(dto);
    }
}