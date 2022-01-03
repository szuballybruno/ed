import { useReactQuery2 } from "../../static/frontendHelpers";
import { ModuleAdminEditDTO } from "../../models/shared_models/ModuleAdminEditDTO";
import { ModuleCreateDTO } from "../../models/shared_models/ModuleCreateDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from "../core/httpClient";

export const useCreateModule = () => {

    const qr = usePostDataUnsafe<ModuleCreateDTO, void>(apiRoutes.module.createModule);

    return {
        createModuleAsync: qr.postDataAsync,
    };
}

export const useDeleteModule = () => {

    const qr = usePostDataUnsafe<{ moduleId: number }, void>(apiRoutes.module.deleteModule);

    return {
        deleteModuleAsync: (moduleId: number) => qr.postDataAsync({ moduleId }),
    };
}

export const useSaveModule = () => {

    const qr = usePostMultipartDataUnsafe<ModuleAdminEditDTO>(apiRoutes.module.saveModule);

    return {
        saveModuleAsync: qr.postMultipartDataAsync
    };
}

export const useModuleEditData = (moduleId: number) => {

    const qr = useReactQuery2<ModuleAdminEditDTO>(apiRoutes.module.getModuleEditData, { moduleId });

    return {
        moduleEditData: qr.data,
        moduleEditDataError: qr.error,
        moduleEditDataState: qr.state,
        refetchModuleEditDataAsync: qr.refetch
    }
}