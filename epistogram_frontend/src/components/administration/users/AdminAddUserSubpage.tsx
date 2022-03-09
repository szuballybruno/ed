import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CreateInvitedUserDTO } from "../../../shared/dtos/CreateInvitedUserDTO";
import { UserEditDTO } from '../../../shared/dtos/UserEditDTO';
import { inviteUserAsync } from '../../../services/api/registrationApiService';
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditUserControl } from "./EditUserControl";
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminUserList } from './AdminUserList';

const AdminAddUserSubpage = () => {

    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const submitAddUserRequestAsync = async (userEditDTO: UserEditDTO) => {

        const createInvitedUserDTO = {
            firstName: userEditDTO.firstName,
            lastName: userEditDTO.lastName,
            email: userEditDTO.email,
            jobTitleId: userEditDTO.jobTitle?.id ?? null,
            roleId: userEditDTO.role?.id ?? null,
            organizationId: userEditDTO.organization?.id ?? null
        } as CreateInvitedUserDTO;

        try {

            await inviteUserAsync(createInvitedUserDTO);

            showNotification("Felhasználó sikeresen hozzáadva");

            // TODO return added user's id
            //navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + user.id + "/edit")
        } catch (error) {

            // TODO
            // if field error 
            // show error without dialog

            showError(error);
        }
    }

    return <AdminBreadcrumbsHeader subRouteLabel={`Felhasználó hozzáadása`}>

        <AdminUserList />
        <AdminSubpageHeader background="var(--transparentWhite70)" className='roundBorders'>
            <EditUserControl
                editDTO={null}
                saveUserAsync={submitAddUserRequestAsync}></EditUserControl>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>
};

export default AdminAddUserSubpage;
