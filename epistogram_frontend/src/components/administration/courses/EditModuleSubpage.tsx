import { useEffect, useState } from "react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useIntParam } from "../../../static/frontendHelpers"
import { ModuleAdminEditDTO } from "../../../models/shared_models/ModuleAdminEditDTO"
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications"
import { LoadingFrame } from "../../system/LoadingFrame"
import { EpistoEntry } from "../../universal/EpistoEntry"
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import { useModuleEditData, useSaveModule } from "../../../services/api/moduleApiService"

export const EditModuleSubpage = () => {

    const [moduleName, setModuleName] = useState("");
    const [moduleDescription, setModuleDescription] = useState("");

    const moduleId = useIntParam("moduleId");
    const { moduleEditData } = useModuleEditData(moduleId);
    const { saveModuleAsync } = useSaveModule();
    const showError = useShowErrorDialog();

    const handleSaveModuleAsync = async () => {

        try {

            await saveModuleAsync({
                id: moduleId,
                name: moduleName,
                description: moduleDescription
            } as ModuleAdminEditDTO);
            showNotification("Modul sikeresen mentve.");
        }
        catch (e) {

            showError(e);
        }
    }

    useEffect(() => {

        if (!moduleEditData)
            return;

        setModuleName(moduleEditData.name);
        setModuleDescription(moduleEditData.description)
    }, [moduleEditData]);

    return <LoadingFrame
        className="whall"
        loadingState={[]}>

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editModuleRoute
            ]}
            px="20px"
            onSave={handleSaveModuleAsync}>

            <EpistoEntry
                label="Modul neve"
                value={moduleName}
                setValue={setModuleName} />

            <EpistoEntry
                label="Modul leirasa"
                value={moduleDescription}
                setValue={setModuleDescription}
                isMultiline />

        </AdminSubpageHeader>
    </LoadingFrame>
}
