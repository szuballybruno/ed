import { Id } from '@episto/commontypes';
import { CompanyDTO, UserEditSaveDTO } from '@episto/communication';
import { UserApiService } from '../../../../services/api/UserApiService1';
import { showNotification, useShowErrorDialog } from '../../../../services/core/notifications';
import { useEventTrigger, useSubscribeEventTrigger } from '../../../../static/frontendHelpers';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';

export const AdminEditUserSubpage = ({
    refetchUsersFunction,
    tabMenuItems,
    headerButtons,
    userId,
    activeCompany,
    companies
}: {
    refetchUsersFunction: () => void,
    tabMenuItems: any[],
    headerButtons: any[],
    userId: Id<'User'>,
    activeCompany: CompanyDTO | null,
    companies: CompanyDTO[]
}) => {

    const { userEditData, refetchEditUserData } = UserApiService.useEditUserData(userId);
    const { saveUserAsync } = UserApiService.useSaveUser();
    const showError = useShowErrorDialog();
    const refetchTrigger = useEventTrigger();

    const handleSaveUserAsync = async (dto: UserEditSaveDTO) => {

        try {

            await saveUserAsync(dto);
            await refetchUsersFunction();
            showNotification('A változtatások sikeresen mentésre kerültek.', { type: 'success' });
            refetchTrigger.fireEvent();
        }
        catch (e) {

            showError(e);
        }
    };

    // subscribe refetch trigger
    useSubscribeEventTrigger(refetchTrigger, refetchEditUserData);

    return (
        <AdminSubpageHeader
            tabMenuItems={tabMenuItems}
            headerButtons={headerButtons}>

            <AdminEditUserControl
                activeCompany={activeCompany}
                companies={companies}
                editedUserId={userId}
                editDTO={userEditData}
                saveUserAsync={handleSaveUserAsync} />
        </AdminSubpageHeader>
    );
};
