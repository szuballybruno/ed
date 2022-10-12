import { useCallback } from 'react';
import { ButtonType } from '../../../models/types';
import { useCreateInviteUserAsync } from '../../../services/api/registrationApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { showNotification } from '../../../services/core/notifications';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, usePostCallback } from '../../../static/frontendHelpers';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';

export const AdminAddUserSubpage = ({
    refetchUsersFunction,
    activeCompany,
    headerButtons,
    tabMenuItems,
    companies
}: {
    refetchUsersFunction: () => void,
    activeCompany: CompanyDTO | null,
    tabMenuItems: any[],
    headerButtons: ButtonType[],
    companies: CompanyDTO[]
}) => {

    const { userEditData } = UserApiService.useEditUserData(null);

    // http 
    const { createInvitedUser } = useCreateInviteUserAsync();

    const refetchTrigger = useEventTrigger();

    const postCreateInvitedUser = useCallback(async () => {

        showNotification('Felhasználó sikeresen hozzáadva');
        await refetchUsersFunction();
    }, [refetchUsersFunction]);

    const handleCreateInvitedUser = usePostCallback(createInvitedUser, [postCreateInvitedUser]);

    return (
        <AdminSubpageHeader
            headerButtons={headerButtons}
            tabMenuItems={tabMenuItems}>

            <AdminEditUserControl
                companies={companies}
                editedUserId={Id.create(-1)}
                editDTO={userEditData}
                activeCompany={activeCompany}
                saveUserAsync={handleCreateInvitedUser} />
        </AdminSubpageHeader>
    );
};
