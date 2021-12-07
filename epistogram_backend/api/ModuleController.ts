import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleAdminEditDTO } from "../models/shared_models/ModuleAdminEditDTO";
import { createModuleAsync, deleteModulesAsync, getModuleEditDataAsync, saveModuleAsync } from "../services/moduleService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class ModuleController {

    createModuleAction = async (params: ActionParams) => {

        await createModuleAsync(params.getBody<ModuleCreateDTO>().bodyData);
    }

    deleteModuleAction = async (params: ActionParams) => {

        const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

        await deleteModulesAsync([moduleId]);
    }

    getModuleEditDataAction = async (params: ActionParams) => {

        const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

        return getModuleEditDataAsync(moduleId);
    }

    saveModuleAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<ModuleAdminEditDTO>(params.req.body);

        return saveModuleAsync(dto);
    }
}