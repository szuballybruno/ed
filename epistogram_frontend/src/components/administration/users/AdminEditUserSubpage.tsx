import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { UserEditSaveDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, useSubscribeEventTrigger } from '../../../static/frontendHelpers';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
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
    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(applicationRoutes.administrationRoute.usersRoute.addRoute);
    const refetchTrigger = useEventTrigger();

    const handleSaveUserAsync = async (dto: UserEditSaveDTO) => {

        try {

            await saveUserAsync(dto);
            await refetchUsersFunction();
            showNotification('A változtatások sikeresen mentésre kerültek.');
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
