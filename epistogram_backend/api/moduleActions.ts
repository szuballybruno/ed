import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { createModuleAsync, deleteModulesAsync, getModuleEditDataAsync, saveModuleAsync } from "../services/moduleService";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const createModuleAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<ModuleCreateDTO>(params.req?.body);

    await createModuleAsync(dto);
}

export const deleteModuleAction = async (params: ActionParamsType) => {

    const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

    await deleteModulesAsync([moduleId]);
}

export const getModuleEditDataAction = async (params: ActionParamsType) => {

    const moduleId = withValueOrBadRequest<number>(params.req.query.moduleId, "number");

    return getModuleEditDataAsync(moduleId);
}

export const saveModuleAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<ModuleDTO>(params.req.body);

    return saveModuleAsync(dto);
}