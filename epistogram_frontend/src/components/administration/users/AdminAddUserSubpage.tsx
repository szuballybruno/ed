import React, { useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCreateInviteUserAsync } from '../../../services/api/registrationApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
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
        navigate2(applicationRoutes.administrationRoute.usersRoute);
    }, [showNotification, refetchUsersFunction, navigate2]);

    const handleCreateInvitedUser = usePostCallback(createInvitedUser, [postCreateInvitedUser]);

    return <AdminBreadcrumbsHeader
        breadcrumbDatas={[]}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />
        <AdminSubpageHeader background="var(--transparentWhite10)"
            className='roundBorders'>

            <AdminEditUserControl
                refetchTrigger={refetchTrigger}
                editDTO={null}
                saveUserAsync={handleCreateInvitedUser}></AdminEditUserControl>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminAddUserSubpage;
