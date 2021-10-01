import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { disallowWindowNavigation, getEventValueCallback, hasValue, TypedError } from "../../../../frontendHelpers";
import { AddFrame } from "../../../add_frame/AddFrame";
import { CurrentUserContext } from "../../../HOC/AuthenticationFrame";
import { CreateInvitedUserDTO } from "../../../../models/shared_models/CreateInvitedUserDTO";
import { OrganizationDTO } from "../../../../models/shared_models/OrganizationDTO";
import { UserDTO } from "../../../../models/shared_models/UserDTO";
import { useNavigation } from "../../../../services/navigatior";
import { showNotification, useDialog } from "../../../../services/notifications";
import { useOrganizations } from "../../../../services/organizationsService";
import { createInvitedUserAsync } from "../../../../services/userManagementService";
import SelectFromArray, { OptionType } from "../../universal/selectFromArray/SelectFromArray";
import SingleInput from "../../universal/singleInput/SingleInput";
import DoubleInputs from "../../universal/twoInputs/DoubleInputs";
import classes from "./addUser.module.scss";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { RoleDTO } from "../../../../models/shared_models/RoleDTO";

const roles = [
    {
        optionText: "Adminisztrátor",
        optionValue: {
            name: "admin",
            id: 1
        },
    },
    {
        optionText: "Vezető",
        optionValue: {
            name: "supervisor",
            id: 2
        }
    },
    {
        optionText: "Felhasználó",
        optionValue: {
            name: "user",
            id: 3
        }
    }
] as OptionType<RoleDTO>[];

const AddUser = () => {

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<RoleDTO>();
    const [jobTitle, setJobTitle] = useState("");
    const [organizationId, setOrganizationId] = useState<number>(-1);

    const { showDialog } = useDialog();
    const user = useContext(CurrentUserContext) as UserDTO;
    const canSetInvitedUserOrganization = user.userActivity.canSetInvitedUserOrganization;
    const { organizations } = useOrganizations();

    const organizationOptions = organizations
        .map(org => ({
            optionValue: org.id,
            optionText: org.name
        } as OptionType<number>));

    const unblockHandle = useRef<any>();
    const { navigate, history } = useNavigation();
    const isChanged = hasValue(firstName)
        || hasValue(lastName)
        || hasValue(email)
        || hasValue(role)
        || hasValue(jobTitle)
        || hasValue(organizationId);

    const handleFirstLastNameChange = (changedPropertyName: string, value: string) => {

        if (changedPropertyName == "lastName") {

            setLastName(value);
        }
        else {

            setFirstName(value);
        }
    }

    console.log("Changed: " + isChanged);

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

    const submitAddUserRequestAsync = async () => {

        const createInvitedUserDTO = {
            firstName,
            lastName,
            email,
            jobTitle,
            roleId: hasValue(role) ? role!.id : 1,
            organizationId
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

    return <AddFrame
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
        {canSetInvitedUserOrganization && <SelectFromArray
            labelText="Cég"
            name="organizationId"
            items={organizationOptions}
            selectedValue={organizationId}
            onSelected={setOrganizationId}
            getCompareKey={orgId => orgId.toString()} />}

        {/* job title */}
        <SingleInput
            labelText="Beosztás"
            name={"jobTitle"}
            changeHandler={getEventValueCallback(setJobTitle)} />

        {/* role */}
        <SelectFromArray
            labelText="Jogosultsági kör"
            name="role"
            selectedValue={role}
            items={roles}
            onSelected={setRole}
            getCompareKey={x => "" + x?.id} />

        {/* submit button */}
        <Button
            className={classes.submitButton}
            type={"submit"}
            variant={"outlined"}
            color={"secondary"}>
            Feltöltés
        </Button>
    </AddFrame>
};

export default AddUser;