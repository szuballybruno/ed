
import React from 'react';
import { useParams } from 'react-router-dom';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserEditDTO } from '../../../models/shared_models/UserEditDTO';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { useEditUserData, useUpdateUser } from '../../../services/userManagementService';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditUserControl } from './EditUserControl';

const AdminEditUserSubpage = () => {

    const params = useParams<{ userId: string }>();
    const editedUserId = parseInt(params.userId);
    const { userEditData } = useEditUserData(editedUserId);
    const { updateUserAsync } = useUpdateUser();
    const showError = useShowErrorDialog();

    const handleSaveUserAsync = async (dto: UserEditDTO) => {

        try {

            await updateUserAsync(dto);
            showNotification("A változtatások sikeresen mentésre kerültek.");
        }
        catch (e) {

            showError(e);
        }
    }

    return <AdminSubpageHeader
        tabMenuItems={[
            applicationRoutes.administrationRoute.usersRoute.editRoute,
            applicationRoutes.administrationRoute.usersRoute.statsRoute,
            applicationRoutes.administrationRoute.usersRoute.tasksRoute
        ]}>
        <EditUserControl
            editDTO={userEditData}
            saveUserAsync={handleSaveUserAsync} />
    </AdminSubpageHeader>
};

export default AdminEditUserSubpage;
