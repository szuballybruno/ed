import React, { useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCreateInviteUserAsync } from '../../../services/api/registrationApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, usePostCallback } from '../../../static/frontendHelpers';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';
import { AdminUserList } from './AdminUserList';

const AdminAddUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;
    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    // http 
    const { createInvitedUser, createInvitedUserState } = useCreateInviteUserAsync();

    const refetchTrigger = useEventTrigger();

    const postCreateInvitedUser = useCallback(() => {

        showNotification('Felhasználó sikeresen hozzáadva');
        refetchUsersFunction();
        navigate2(applicationRoutes.administrationRoute.usersRoute.indexRoute);
    }, [showNotification, refetchUsersFunction, navigate2]);

    const handleCreateInvitedUser = usePostCallback(createInvitedUser, [postCreateInvitedUser]);

    return <AdminBreadcrumbsHeader>

        <AdminUserList
            currentUserId={null}
            users={users}
            onUserSelected={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />

        <AdminSubpageHeader background="var(--transparentWhite10)"
            className='roundBorders'>

            <AdminEditUserControl
                editedUserId={Id.create(-1)}
                refetchTrigger={refetchTrigger}
                editDTO={null}
                saveUserAsync={handleCreateInvitedUser}></AdminEditUserControl>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminAddUserSubpage;
