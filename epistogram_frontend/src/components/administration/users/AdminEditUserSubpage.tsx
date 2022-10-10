import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { UserEditReadDTO } from '../../../shared/dtos/UserEditReadDTO';
import { UserEditSaveDTO } from '../../../shared/dtos/UserEditSaveDTO';
import { Id } from '../../../shared/types/versionId';
import { useEventTrigger, useSubscribeEventTrigger } from '../../../static/frontendHelpers';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';

export const AdminEditUserSubpage = ({
    refetchUsersFunction,
    tabMenuItems,
    headerButtons,
    userId
}: {
    refetchUsersFunction: () => void,
    tabMenuItems: any[],
    headerButtons: any[],
    userId: Id<'User'>
}) => {

    const { userEditData, refetchEditUserData } = UserApiService.useEditUserData(userId);

    console.log(userEditData?.email);

    const { saveUserAsync } = UserApiService.useSaveUser();
    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(applicationRoutes.administrationRoute.usersRoute.addRoute);
    const refetchTrigger = useEventTrigger();

    const handleSaveUserAsync = async (dto: UserEditSaveDTO) => {

        try {

            await saveUserAsync(dto);
            showNotification('A változtatások sikeresen mentésre kerültek.');
            refetchTrigger.fireEvent();
        }
        catch (e) {

            showError(e);
        }
    };

    // subscribe refetch trigger
    useSubscribeEventTrigger(refetchTrigger, refetchEditUserData);

    const deleteWaningDialogLogic = useEpistoDialogLogic('delwarn');

    const showDeleteUserDialog = (user: UserEditReadDTO | null) => {

        if (!user)
            return;

        deleteWaningDialogLogic
            .openDialog({
                title: 'Biztosan törlöd a felhasználót?',
                description: `${user.lastName} ${user.firstName} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: 'Törlés',
                        action: async () => {

                            try {

                                await UserApiService.deleteUserAsync(user.userId);
                                await refetchUsersFunction();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    };

    return (
        <AdminSubpageHeader
            tabMenuItems={tabMenuItems}
            headerButtons={headerButtons}>

            <EpistoDialog logic={deleteWaningDialogLogic} />

            <AdminEditUserControl
                editedUserId={userId}
                refetchTrigger={refetchTrigger}
                editDTO={userEditData}
                showDeleteUserDialog={showDeleteUserDialog}
                saveUserAsync={handleSaveUserAsync} />
        </AdminSubpageHeader>
    );
};
