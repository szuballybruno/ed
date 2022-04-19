import React from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CreateInvitedUserDTO } from '../../../shared/dtos/CreateInvitedUserDTO';
import { UserEditDTO } from '../../../shared/dtos/UserEditDTO';
import { inviteUserAsync } from '../../../services/api/registrationApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminEditUserControl } from './AdminEditUserControl';
import { AdminBreadcrumbsHeader, BreadcrumbLink } from '../AdminBreadcrumbsHeader';
import { AdminUserList } from './AdminUserList';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';

const AdminAddUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const submitAddUserRequestAsync = async (userEditDTO: UserEditDTO) => {

        const createInvitedUserDTO = {
            firstName: userEditDTO.firstName,
            lastName: userEditDTO.lastName,
            email: userEditDTO.email,
            jobTitleId: userEditDTO.jobTitle?.id ?? null,
            roleId: userEditDTO.role?.id ?? null,
            companyId: userEditDTO.company?.id ?? null
        } as CreateInvitedUserDTO;

        try {

            await inviteUserAsync(createInvitedUserDTO);

            showNotification('Felhasználó sikeresen hozzáadva');
            refetchUsersFunction();
            navigate(applicationRoutes.administrationRoute.usersRoute);
        } catch (error) {

            // TODO
            // if field error 
            // show error without dialog

            showError(error);
        }
    };

    return <AdminBreadcrumbsHeader breadcrumbDatas={[
        // <BreadcrumbLink
        //     key={1}
        //     title="Felhasználók"
        //     iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
        //     to={applicationRoutes.administrationRoute.usersRoute.route.getAbsolutePath() + '/a/edit'} />,
        // <BreadcrumbLink
        //     key={2}
        //     title={'Felhasználó hozzáadása'}
        //     isCurrent />
    ]}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: userId });
            }} />
        <AdminSubpageHeader background="var(--transparentWhite10)"
            className='roundBorders'>
            <AdminEditUserControl
                editDTO={null}
                saveUserAsync={submitAddUserRequestAsync}></AdminEditUserControl>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminAddUserSubpage;
