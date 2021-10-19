import React from 'react';
import { applicationRoutes } from "../configuration/applicationRoutes";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { UserEditDTO } from '../models/shared_models/UserEditDTO';
import { useNavigation } from "../services/navigatior";
import { showNotification, useShowErrorDialog } from "../services/notifications";
import { inviteUserAsync } from "../services/userManagementService";
import { EditUserControl } from "./EditUserControl";

const AddUser = () => {

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
            navigate(applicationRoutes.administrationRoute.usersRoute.route);
        } catch (error) {

            // TODO
            // if field error 
            // show error without dialog

            showError(error);
        }
    }

    return <EditUserControl
        editDTO={null}
        saveUserAsync={submitAddUserRequestAsync}></EditUserControl>
};

export default AddUser;
