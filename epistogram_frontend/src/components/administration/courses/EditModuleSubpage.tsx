import { useEffect, useState } from "react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useIntParam } from "../../../static/frontendHelpers"
import { ModuleAdminEditDTO } from "../../../models/shared_models/ModuleAdminEditDTO"
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications"
import { LoadingFrame } from "../../system/LoadingFrame"
import { EpistoEntry } from "../../controls/EpistoEntry"
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import { useModuleEditData, useSaveModule } from "../../../services/api/moduleApiService"
import { SelectImage } from "../../universal/SelectImage"
import { Image } from "@chakra-ui/react";
import { EpistoLabel } from "../../controls/EpistoLabel"

export const EditModuleSubpage = () => {

    const [moduleName, setModuleName] = useState("");
    const [moduleDescription, setModuleDescription] = useState("");
    const [moduleImageSource, setMoudleImageSource] = useState<string | null>(null);
    const [moduleImageFile, setMoudleImageFile] = useState<File | null>(null);

    const moduleId = useIntParam("moduleId");
    const { moduleEditData } = useModuleEditData(moduleId);
    const { saveModuleAsync } = useSaveModule();
    const showError = useShowErrorDialog();

    const handleSaveModuleAsync = async () => {

        try {

            await saveModuleAsync(
                {
                    id: moduleId,
                    name: moduleName,
                    description: moduleDescription
                } as ModuleAdminEditDTO,
                moduleImageFile ?? undefined);

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
        setModuleDescription(moduleEditData.description);
        setMoudleImageSource(moduleEditData.imageFilePath);
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

            <EpistoLabel text="Udvozlo kep">
                <SelectImage
                    width="300px"
                    height="200px"
                    setImageSource={setMoudleImageSource}
                    setImageFile={setMoudleImageFile}>
                    <Image
                        className="whall"
                        objectFit="cover"
                        src={moduleImageSource ?? ""} />
                </SelectImage>
            </EpistoLabel>

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
