import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useIntParam } from "../../../frontendHelpers"
import { ModuleDTO } from "../../../models/shared_models/ModuleDTO"
import { useModuleEditData, useSaveModule } from "../../../services/moduleService"
import { showNotification, useShowErrorDialog } from "../../../services/notifications"
import { LoadingFrame } from "../../HOC/LoadingFrame"
import { EpistoEntry } from "../../universal/EpistoEntry"
import { AdminSubpageHeader } from "../AdminSubpageHeader"

export const EditModuleSubpage = () => {

    const [moduleName, setModuleName] = useState("");

    const moduleId = useIntParam("moduleId");
    const { moduleEditData } = useModuleEditData(moduleId);
    const { saveModuleAsync } = useSaveModule();
    const showError = useShowErrorDialog();

    const handleSaveModuleAsync = async () => {

        try {

            await saveModuleAsync({
                id: moduleId,
                name: moduleName
            } as ModuleDTO);
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
    }, [moduleEditData]);

    return <LoadingFrame
        className="whall"
        loadingState={[]}>

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editModuleRoute
            ]}
            px="20px"
            onSave={handleSaveModuleAsync}>

            <EpistoEntry
                label="Modul neve"
                value={moduleName}
                setValue={setModuleName} />

        </AdminSubpageHeader>
    </LoadingFrame>
}