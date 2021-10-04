import { Box, Flex } from "@chakra-ui/react";
import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getEventValueCallback, hasValue, TypedError } from "../frontendHelpers";
import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { RoleDTO } from "../models/shared_models/RoleDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { useNavigation } from "../services/navigatior";
import { showNotification } from "../services/notifications";
import { useOrganizations } from "../services/organizationsService";
import { createInvitedUserAsync } from "../services/userManagementService";
import { AddFrame } from "./add_frame/AddFrame";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";
import { EpistoSelect } from "./universal/EpistoSelect";
import { AministrationSubpageHeader } from "./administration/universal/adminAddHeader/AministrationSubpageHeader";
import SingleInput from "./administration/universal/singleInput/SingleInput";
import DoubleInputs from "./administration/universal/twoInputs/DoubleInputs";

const roles = [
    {
        name: "admin",
        id: 1,
        optionText: "Adminisztrátor",
    },
    {
        name: "supervisor",
        id: 2,
        optionText: "Vezető",
    },
    {
        name: "user",
        id: 3,
        optionText: "Felhasználó"
    }
];

const AddUser = () => {

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<RoleDTO | null>(null);
    const [jobTitle, setJobTitle] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDTO | null>(null);

    const { navigate } = useNavigation();
    const user = useContext(CurrentUserContext) as UserDTO;
    const canSetInvitedUserOrganization = user.userActivity.canSetInvitedUserOrganization;
    const { organizations } = useOrganizations();

    const handleFirstLastNameChange = (changedPropertyName: string, value: string) => {

        if (changedPropertyName == "lastName") {

            setLastName(value);
        }
        else {

            setFirstName(value);
        }
    }

    const submitAddUserRequestAsync = async () => {

        const createInvitedUserDTO = {
            firstName,
            lastName,
            email,
            jobTitle,
            roleId: hasValue(role) ? role!.id : 1,
            organizationId: selectedOrganization!.id
        } as CreateInvitedUserDTO;

        console.log(createInvitedUserDTO);

        try {

            await createInvitedUserAsync(createInvitedUserDTO);

            showNotification("Felhasználó sikeresen hozzáadva");
            navigate(applicationRoutes.administrationRoute.usersRoute.route);
        } catch (error) {

            // generic JS error
            // There was !error.errorType inside the condition, but that throws ts error
            if (!error) {

                showNotification("Felhasználó hozzáadása sikertelen", "error");
            }

            // typed error of http call 
            else {

                const typedError = error as TypedError;

                if (typedError.errorType == "bad request") {

                    showNotification("Felhasználó hozzáadása sikertelen, hiányosak, vagy nem megfelelőek a megadott adatok", "error");
                } else {

                    showNotification("Felhasználó hozzáadása sikertelen, hiba a szerver-kliens kommunikációban", "error");
                }
            }
        }
    }

    return <Flex direction="column">

        {/* admin header */}
        <AministrationSubpageHeader />

        <AddFrame
            submitHandler={e => {

                e.preventDefault();
                submitAddUserRequestAsync();
            }}
            title={"Új felhasználó hozzáadása"}>

            {/* first & last name */}
            <DoubleInputs
                firstLabelText={"Vezetéknév"}
                secondLabelText={"Keresztnév"}
                firstLabelName={"lastName"}
                secondLabelName={"firstName"}
                changeHandler={x => handleFirstLastNameChange(x.currentTarget.name, x.currentTarget.value)} />

            {/* email */}
            <SingleInput
                labelText={"E-mail"}
                name={"email"}
                changeHandler={getEventValueCallback(setEmail)} />

            {/* organization */}
            {canSetInvitedUserOrganization && <Flex direction="column" align="stretch" width="100%">
                <Typography>Cég</Typography>
                <EpistoSelect
                    items={organizations}
                    selectedValue={selectedOrganization}
                    onSelected={setSelectedOrganization}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={organization => "" + organization?.id} />
            </Flex>}

            {/* job title */}
            <SingleInput
                labelText="Beosztás"
                name={"jobTitle"}
                changeHandler={getEventValueCallback(setJobTitle)} />

            {/* role */}
            <Flex direction="column" align="stretch" width="100%">
                <Typography>Jogosultsági kör</Typography>
                <EpistoSelect
                    selectedValue={role}
                    items={roles}
                    onSelected={setRole}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={x => "" + x?.id} />
            </Flex>

            {/* submit button */}
            <Button
                type={"submit"}
                variant={"outlined"}
                color={"secondary"}>
                Feltöltés
            </Button>
        </AddFrame>
    </Flex>
};

export default AddUser;



// const unblockHandle = useRef<any>();
// const { navigate, history } = useNavigation();
// const isChanged = hasValue(firstName)
//     || hasValue(lastName)
//     || hasValue(email)
//     || hasValue(role)
//     || hasValue(jobTitle)
//     || hasValue(selectedOrganization);

// display unsaved changes alert when user navigates 
// useEffect(() => {
//     unblockHandle.current = history.block((targetLocation: any) => {

//         if (!isChanged) {

//             console.log("Navigation not blocked because there is no changed fields!");
//             return true as any;
//         }

//         console.log("Blocking navigation because there's changed fields!");

//         // take some custom action here
//         // i chose to show my custom modal warning user froim going back
//         // rather than relying on the browser's alert
//         showDialog({
//             title: "Biztosan megszakítod a felhasználó hozzáadását?",
//             description: "Megszakítás esetén a beírt adatok elvesznek.",
//             firstButtonTitle: "Folytatom",
//             secondButtonTitle: "Megszakítom"
//         });

//         return false;
//     });
//     return function () {
//         unblockHandle.current.current && unblockHandle.current.current()
//     }
// })

// const discardChangesAndNavigate = () => {
//     if (unblockHandle) {

//         unblockHandle.current()
//     }

//     // get altert target location, and navigate there
//     // navigate to some other page or do some routing action now
//     // history.push("/any/other/path")
//     navigate(alert.targetLocation.get())
// }

// const continueEditing = () => {
//     if (unblockHandle) {
//         alert.showAlert.set(false)
//     }
// }

// disallowWindowNavigation();
