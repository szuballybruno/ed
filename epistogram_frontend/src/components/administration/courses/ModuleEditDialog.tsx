import { useState } from 'react';
import { useCreateModule, useModuleListEditData, useSaveModule } from '../../../services/api/moduleApiService';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { ModuleAdminEditDTO } from '../../../shared/dtos/ModuleAdminEditDTO';
import { usePaging } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { EditModuleModalPage } from './EditModuleModalPage';
import { ModuleEditDialogBase } from './ModuleEditDialogBase';
import { ModuleListModalPage } from './ModuleListModalPage';

export const ModuleEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic } = props;

    const courseId = useIntParam('courseId')!;
    const showError = useShowErrorDialog();

    // state
    const [editedModuleId, setEditedModuleId] = useState<number | null>(null);

    console.log(courseId);

    // http
    const {
        moduleListEditData,
        moduleListEditDataState,
        moduleListEditDataError,
        refetchModuleListEditData
    } = useModuleListEditData(courseId, logic.isOpen);
    
    const { saveModuleAsync } = useSaveModule();
    const { createModuleAsync } = useCreateModule();

    const modulesLength = moduleListEditData?.modules.length!;
    const courseName = moduleListEditData?.courseName ?? '';
    const moduleName = moduleListEditData?.modules.find(x => x.id === editedModuleId)?.name;

    // paging
    const paging = usePaging([
        {
            content: () => <ModuleListModalPage
                moduleListEditData={moduleListEditData}
                moduleListEditDataState={moduleListEditDataState}
                moduleListEditDataError={moduleListEditDataError}
                handleEditModule={handleEditModule} />,
            title: 'Modulok szerkesztése'

        },
        {
            content: () => <EditModuleModalPage
                handleSaveModuleAsync={handleSaveModuleAsync}
                editedModuleId={editedModuleId!} />,
            title: 'Statisztika'
        }
    ]);

    // selects edited module and navigates to edit page
    const handleEditModule = (moduleId: number) => {
        setEditedModuleId(moduleId);
        paging.setItem(1);
    };

    // save module
    const handleSaveModuleAsync = async (module: ModuleAdminEditDTO, moduleImageFile: File | null) => {

        try {

            await saveModuleAsync(
                module,
                moduleImageFile ?? undefined);

            showNotification('Modul sikeresen mentve.');
            refetchModuleListEditData();
            paging.setItem(0);
        }
        catch (e) {

            showError(e);
        }
    };

    // add new module
    const handleAddModuleAsync = async () => {

        try {

            await createModuleAsync({
                courseId: courseId,
                name: 'Új modul',
                orderIndex: modulesLength
            });

            showNotification('Modul sikeresen hozzáadva!');
            await refetchModuleListEditData();
        }
        catch (e) {

            showError(e);
        }
    };

    // navigates back to module list
    const handleBackToModuleList = () => {
        paging.setItem(0);
    };

    return <ModuleEditDialogBase
        courseName={courseName}
        moduleName={moduleName}
        logic={logic}
        handleBackToModuleList={handleBackToModuleList}
        handleAddModuleAsync={handleAddModuleAsync}
        currentItemIndex={paging.currentIndex}
        subpages={paging.items.map(item => item.content)} />;
};