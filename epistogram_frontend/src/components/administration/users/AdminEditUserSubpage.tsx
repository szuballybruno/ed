import {Add} from '@mui/icons-material';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {applicationRoutes} from '../../../configuration/applicationRoutes';
import {ButtonType} from '../../../models/types';
import {UserApiService} from '../../../services/api/userApiService';
import {useNavigation} from '../../../services/core/navigatior';
import {showNotification, useShowErrorDialog} from '../../../services/core/notifications';
import {AdminPageUserDTO} from '../../../shared/dtos/admin/AdminPageUserDTO';
import {UserEditDTO} from '../../../shared/dtos/UserEditDTO';
import {isCurrentAppRoute, useEventTrigger, useSubscribeEventTrigger} from '../../../static/frontendHelpers';
import {useRouteParams} from '../../../static/locationHelpers';
import {EpistoDialog} from '../../universal/epistoDialog/EpistoDialog';
import {useEpistoDialogLogic} from '../../universal/epistoDialog/EpistoDialogLogic';
import {AdminBreadcrumbsHeader} from '../AdminBreadcrumbsHeader';
import {AdminSubpageHeader} from '../AdminSubpageHeader';
import {AdminEditUserControl} from './AdminEditUserControl';
import {AdminUserList} from './AdminUserList';

export const AdminEditUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;

    const editedUserId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.editRoute)
        .getValueOrNull(x => x.userId, 'int');

    const { userEditData, refetchEditUserData } = UserApiService.useEditUserData(editedUserId);
    const { saveUserAsync } = UserApiService.useSaveUser();
    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(applicationRoutes.administrationRoute.usersRoute.addRoute);
    const navigateToUserCourses = () => navigate2(applicationRoutes.administrationRoute.usersRoute.courseContentRoute, { userId: editedUserId });
    const location = useLocation();
    const refetchTrigger = useEventTrigger();

    /**
     * Select first user if none selected
     */
    useEffect(() => {

        if (!editedUserId && users.length > 0)
            return navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: users.first().id });
    }, [editedUserId, users]);

    const handleSaveUserAsync = async (dto: UserEditDTO) => {

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

    const showDeleteUserDialog = (user: UserEditDTO | null) => {
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

                                await UserApiService.deleteUserAsync(user.id);
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

    const bulkEditButtons = [
        {
            title: 'Hozzáadás',
            icon: <Add
                style={{
                    margin: '0 3px 0 0',
                    padding: '0 0 1px 0'
                }} />,
            action: () => navigateToAddUser()
        }
    ] as ButtonType[];

    const checkIfCurrentUserFromUrl = () => {
        const isUserFound = users.some(user => user.id === editedUserId);

        if (!isUserFound && users[0]) {
            navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: users[0].id });
        }
    };
    checkIfCurrentUserFromUrl();


    return <AdminBreadcrumbsHeader
        viewSwitchChecked={isCurrentAppRoute(applicationRoutes.administrationRoute.usersRoute)}
        viewSwitchFunction={() => navigate2(applicationRoutes.administrationRoute.usersRoute)}>

        <AdminUserList
            currentUserId={editedUserId}
            users={users}
            onUserSelected={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            headerButtons={bulkEditButtons}
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.courseContentRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <EpistoDialog logic={deleteWaningDialogLogic} />

            {editedUserId && <AdminEditUserControl
                editedUserId={editedUserId}
                refetchTrigger={refetchTrigger}
                editDTO={userEditData}
                showDeleteUserDialog={showDeleteUserDialog}
                saveUserAsync={handleSaveUserAsync} />}
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminEditUserSubpage;
