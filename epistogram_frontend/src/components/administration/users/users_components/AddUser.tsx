import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { disallowWindowNavigation, getEventValueCallback, hasValue, TypedError } from "../../../../frontendHelpers";
import { AddFrame } from "../../../../HOC/add_frame/AddFrame";
import { CurrentUserContext } from "../../../../HOC/data_manager_frame/DataManagerFrame";
import { DialogFrame } from "../../../../HOC/dialog_frame/DialogFrame";
import { CreateInvitedUserDTO } from "../../../../models/shared_models/CreateInvitedUserDTO";
import { organizationDTO } from "../../../../models/shared_models/OrganizationDTO";
import { UserDTO } from "../../../../models/shared_models/UserDTO";
import { httpPostAsync } from "../../../../services/httpClient";
import { useNavigation } from "../../../../services/navigatior";
import { useAlert, useShowNotification } from "../../../../services/notifications";
import { useOrganizations } from "../../../../services/organizationsService";
import { createInvitedUserAsync } from "../../../../services/userManagementService";
import SelectFromArray, { OptionType } from "../../universal/selectFromArray/SelectFromArray";
import SingleInput from "../../universal/singleInput/SingleInput";
import DoubleInputs from "../../universal/twoInputs/DoubleInputs";
import classes from "./addUser.module.scss";

const mapOrganizations = (organizations: organizationDTO[]) => {
    const organizationOptions = organizations
        .map(x => ({
            optionText: x.name,
            optionValue: x._id
        } as OptionType));

    return organizationOptions;
}

const roles = [{
    optionText: "Adminisztrátor",
    optionValue: "admin"
}, {
    optionText: "Vezető",
    optionValue: "owner"
}, {
    optionText: "Csoportvezető",
    optionValue: "supervisor"
}, {
    optionText: "Felhasználó",
    optionValue: "user"
}]

const AddUser = () => {

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [organizationId, setOrganizationId] = useState("");

    const user = useContext(CurrentUserContext) as UserDTO;
    const alert = useAlert();
    const canModifyOrganization = user.role === "admin";
    const { organizations } = useOrganizations();
    const organizationOptions = mapOrganizations(organizations);
    const unblockHandle = useRef<any>();
    const showNotification = useShowNotification();
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
    useEffect(() => {
        unblockHandle.current = history.block((targetLocation: any) => {

            if (!isChanged) {

                console.log("Navigation not blocked because there is no changed fields!");
                return true as any;
            }

            console.log("Blocking navigation because there's changed fields!");

            // take some custom action here
            // i chose to show my custom modal warning user froim going back
            // rather than relying on the browser's alert
            alert.set({
                showAlert: true,
                targetLocation: targetLocation.pathname,
                alertTitle: "Biztosan megszakítod a felhasználó hozzáadását?",
                alertDescription: "Megszakítás esetén a beírt adatok elvesznek.",
                showFirstButton: true,
                firstButtonTitle: "Folytatom",
                showSecondButton: true,
                secondButtonTitle: "Megszakítom"
            })
            return false;
        });
        return function () {
            unblockHandle.current.current && unblockHandle.current.current()
        }
    })

    const discardChangesAndNavigate = () => {
        if (unblockHandle) {
            alert.showAlert.set(false)
            unblockHandle.current()
        }

        // get altert target location, and navigate there
        // navigate to some other page or do some routing action now
        // history.push("/any/other/path")
        navigate(alert.targetLocation.get())
    }

    const continueEditing = () => {
        if (unblockHandle) {
            alert.showAlert.set(false)
        }
    }

    disallowWindowNavigation();

    const sumbmitAddUserRequestAsync = async () => {

        const createInvitedUserDTO = new CreateInvitedUserDTO(
            firstName,
            lastName,
            email,
            organizationId,
            jobTitle,
            role);

        try {

            await createInvitedUserAsync(createInvitedUserDTO);

            showNotification("Felhasználó sikeresen hozzáadva");
            navigate("/admin/manage/users");
        } catch (error) {

            // generic JS error
            if (!error.errorType) {

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

    return <DialogFrame
        firstButtonOnClick={continueEditing}
        secondButtonOnClick={discardChangesAndNavigate}
        className={classes.dialogFrameWrapper}>
        <AddFrame
            submitHandler={e => {

                e.preventDefault();
                sumbmitAddUserRequestAsync();
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
            {canModifyOrganization && <SelectFromArray
                labelText={"Cég"}
                showNull
                name={"organizationId"}
                value={organizationId}
                optionValues={organizationOptions}
                changeHandler={getEventValueCallback(setOrganizationId)} />}

            {/* job title */}
            <SingleInput
                labelText={"Beosztás"}
                name={"jobTitle"}
                changeHandler={getEventValueCallback(setJobTitle)} />

            {/* role */}
            <SelectFromArray labelText={"Jogosultsági kör"}
                name={"role"}
                value={role}
                optionValues={roles}
                changeHandler={getEventValueCallback(setRole)} />

            {/* submit button */}
            <Button
                className={classes.submitButton}
                type={"submit"}
                variant={"outlined"}
                color={"secondary"}>
                Feltöltés
            </Button>
        </AddFrame>
    </DialogFrame>
};

export default AddUser;
