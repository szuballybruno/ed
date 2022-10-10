import React, { useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCreateInviteUserAsync } from '../../../services/api/registrationApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, usePostCallback } from '../../../static/frontendHelpers';
import { AdminBreadcrumbsHeader, CompanySelectorDropdown } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';
import { AdminUserList } from './AdminUserList';

const AdminAddUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void,
    selectedCompanyId: Id<'Company'> | null,
    handleSelectCompany: (companyId: Id<'Company'> | null) => void,
    companies: CompanyDTO[]
}) => {

    const { users, refetchUsersFunction, selectedCompanyId, handleSelectCompany, companies } = props;
    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();
    const { userEditData, refetchEditUserData } = UserApiService.useEditUserData(null);

    // http 
    const { createInvitedUser, createInvitedUserState } = useCreateInviteUserAsync();

    const refetchTrigger = useEventTrigger();

    const postCreateInvitedUser = useCallback(() => {

        showNotification('Felhasználó sikeresen hozzáadva');
        refetchUsersFunction();
        //navigate2(applicationRoutes.administrationRoute.usersRoute.indexRoute);
    }, [refetchUsersFunction]);

    const handleCreateInvitedUser = usePostCallback(createInvitedUser, [postCreateInvitedUser]);

    return <AdminBreadcrumbsHeader
        headerComponent={companies.length > 1 && <CompanySelectorDropdown
            selectedCompanyId={selectedCompanyId}
            handleSelectCompany={handleSelectCompany}
            companies={companies} />}>

        <AdminUserList
            currentUserId={null}
            users={users}
            onUserSelected={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            background="var(--transparentWhite10)"
            className='roundBorders'>

            <AdminEditUserControl
                editedUserId={Id.create(-1)}
                refetchTrigger={refetchTrigger}
                editDTO={userEditData}
                selectedCompanyId={selectedCompanyId}
                saveUserAsync={handleCreateInvitedUser}></AdminEditUserControl>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminAddUserSubpage;
