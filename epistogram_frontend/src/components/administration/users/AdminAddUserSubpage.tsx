import { useCallback } from 'react';
import { ButtonType } from '../../../models/types';
import { useCreateInviteUserAsync } from '../../../services/api/registrationApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { showNotification } from '../../../services/core/notifications';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, usePostCallback } from '../../../static/frontendHelpers';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';

export const AdminAddUserSubpage = ({
    refetchUsersFunction,
    selectedCompanyId,
    headerButtons,
    tabMenuItems
}: {
    refetchUsersFunction: () => void,
    selectedCompanyId: Id<'Company'> | null,
    tabMenuItems: any[],
    headerButtons: ButtonType[]
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
                editedUserId={Id.create(-1)}
                refetchTrigger={refetchTrigger}
                editDTO={userEditData}
                selectedCompanyId={selectedCompanyId}
                saveUserAsync={handleCreateInvitedUser} />
        </AdminSubpageHeader>
    );
};
