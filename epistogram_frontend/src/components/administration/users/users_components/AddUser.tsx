import { useState } from "@hookstate/core";
import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { disallowWindowNavigation, getEventValueCallback } from "../../../../frontendHelpers";
import { AddFrame } from "../../../../HOC/add_frame/AddFrame";
import { CurrentUserContext } from "../../../../HOC/data_manager_frame/DataManagerFrame";
import { DialogFrame } from "../../../../HOC/dialog_frame/DialogFrame";
import { organizationDTO } from "../../../../models/shared_models/OrganizationDTO";
import { UserDTO } from "../../../../models/shared_models/UserDTO";
import { httpPostAsync } from "../../../../services/httpClient";
import { useOrganizations } from "../../../../services/organizationsService";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import SelectFromArray, { OptionType } from "../../universal/selectFromArray/SelectFromArray";
import SingleInput from "../../universal/singleInput/SingleInput";
import DoubleInputs from "../../universal/twoInputs/DoubleInputs";
import classes from "./addUser.module.scss";

const mapOrganizations = (organizations: organizationDTO[]) => {
    const organizationOptions = organizations
        .map(x => ({
            optionText: x.organizationName,
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

    const user = useContext(CurrentUserContext) as UserDTO;
    const app = useState(applicationRunningState)
    const canModifyOrganization = user.role === "admin";
    const history = useHistory()
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState("");
    const [organizationId, setOrganizationId] = React.useState("");
    const { organizations } = useOrganizations();
    const organizationOptions = mapOrganizations(organizations);
    const unblockHandle = useRef<any>();

    const handleFirstLastNameChange = (changedPropertyName: string, value: string) => {

        if (changedPropertyName == "lastName") {

            setLastName(value);
        }
        else {

            setFirstName(value);
        }
    }

    useEffect(() => {
        unblockHandle.current = history.block((targetLocation: any) => {
            // take some custom action here
            // i chose to show my custom modal warning user froim going back
            // rather than relying on the browser's alert
            app.alert.set({
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

    function stopEditing() {
        if (unblockHandle) {
            app.alert.showAlert.set(false)
            unblockHandle.current()
        }
        history.push(app.alert.targetLocation.get())
        // navigate to some other page or do some routing action now
        // history.push("/any/other/path")
    }

    function continueEditing() {
        if (unblockHandle) {
            app.alert.showAlert.set(false)
        }
        // navigate to some other page or do some routing action now
        // history.push("/any/other/path")
    }

    disallowWindowNavigation();

    const sumbmitAddUserRequestAsync = async (formData: FormData) => {

        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('email', email);
        formData.set('role', role);

        try {
            const response = await httpPostAsync("users", formData)

            if (response.code === 201) {
                app.snack.snackTitle.set("Felhasználó sikeresen hozzáadva")
                app.snack.showSnack.set(true)

                return <Redirect to={"/admin/manage/users"} />
            }
        } catch (error) {

            app.snack.snackTitle.set("Felhasználó hozzáadása sikertelen " + error);
            app.snack.showSnack.set(true)
        }
    }

    return <DialogFrame
        firstButtonOnClick={continueEditing}
        secondButtonOnClick={stopEditing}
        className={classes.dialogFrameWrapper}>
        <AddFrame
            submitHandler={e => {

                e.preventDefault();
                sumbmitAddUserRequestAsync(new FormData(e.currentTarget));
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
                name={"innerRole"}
                changeHandler={getEventValueCallback(setRole)} />

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
