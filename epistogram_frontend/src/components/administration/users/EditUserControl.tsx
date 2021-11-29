import { Flex } from "@chakra-ui/react";
import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { getEventValueCallback } from "../../../frontendHelpers";
import { JobTitleDTO } from "../../../models/shared_models/JobTitleDTO";
import { OrganizationDTO } from "../../../models/shared_models/OrganizationDTO";
import { RoleDTO } from "../../../models/shared_models/RoleDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { UserEditDTO } from "../../../models/shared_models/UserEditDTO";
import { useJobTitles } from "../../../services/dataService";
import { useOrganizations } from "../../../services/organizationsService";
import { translatableTexts } from "../../../translatableTexts";
import { AddFrame } from "../../add_frame/AddFrame";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { EpistoSelect } from "../../universal/EpistoSelect";

export const roles = [
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

export const EditUserControl = (props: {
    editDTO: UserEditDTO | null,
    saveUserAsync: (editDTO: UserEditDTO) => Promise<void>
}) => {

    const { editDTO, saveUserAsync } = props;

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDTO | null>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDTO | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);

    const user = useContext(CurrentUserContext) as UserDTO;
    const canSetInvitedUserOrganization = user.userActivity.canSetInvitedUserOrganization;

    const { organizations } = useOrganizations();
    const { jobTitles } = useJobTitles();

    useEffect(() => {

        if (!editDTO)
            return;

        setFirstName(editDTO.firstName);
        setLastName(editDTO.lastName);
        setEmail(editDTO.email);
        setSelectedRole(editDTO.role);
        setSelectedJobTitle(editDTO.jobTitle);
        setSelectedOrganization(editDTO.organization);
    }, [editDTO]);

    const handleSaveUserAsync = async () => {

        const editedUserDTO = {
            id: editDTO?.id,
            firstName,
            lastName,
            email,
            jobTitle: selectedJobTitle,
            organization: selectedOrganization,
            role: selectedRole
        } as UserEditDTO;

        await saveUserAsync(editedUserDTO);
    }

    return <Flex direction="column">

        <AddFrame
            title={"Új felhasználó hozzáadása"}>

            <Flex direction="column" padding="20px">

                {/* first & last name */}
                <Flex>
                    <TextField
                        style={{ flex: "1", margin: "10px" }}
                        value={firstName}
                        name="fname"
                        onChange={x => setFirstName(x.currentTarget.value)}
                        variant="standard"
                        label="Keresztnév" />

                    <TextField
                        style={{ flex: "1", margin: "10px" }}
                        name="lname"
                        value={lastName}
                        onChange={x => setLastName(x.currentTarget.value)}
                        variant="standard"
                        label="Vezetéknév" />
                </Flex>

                {/* email */}
                <TextField
                    style={{ flex: "1", margin: "10px" }}
                    name="email"
                    value={email}
                    onChange={getEventValueCallback(setEmail)}
                    variant="standard"
                    label="Email" />

                {/* organization */}
                {canSetInvitedUserOrganization && <Flex direction="column" align="stretch" mt="10px" width="100%">
                    <Typography>Cég</Typography>
                    <EpistoSelect
                        items={organizations}
                        selectedValue={selectedOrganization}
                        onSelected={setSelectedOrganization}
                        getDisplayValue={x => "" + x?.name}
                        getCompareKey={organization => "" + organization?.id} />
                </Flex>}

                {/* job title */}
                {canSetInvitedUserOrganization && <Flex direction="column" align="stretch" mt="10px" width="100%">
                    <Typography>Beosztás</Typography>
                    <EpistoSelect
                        items={jobTitles}
                        selectedValue={selectedJobTitle}
                        onSelected={setSelectedJobTitle}
                        getDisplayValue={jt => "" + jt?.name}
                        getCompareKey={jt => "" + jt?.id} />
                </Flex>}

                {/* role */}
                <Flex direction="column" align="stretch" width="100%">
                    <Typography>Jogosultsági kör</Typography>
                    <EpistoSelect
                        selectedValue={selectedRole}
                        items={roles}
                        onSelected={setSelectedRole}
                        getDisplayValue={x => "" + (x as any)?.optionText}
                        getCompareKey={x => "" + x?.id} />
                </Flex>

                {/* submit button */}
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => handleSaveUserAsync()}
                    style={{ marginTop: "20px" }}>

                    {translatableTexts.editUserControl.saveUser}
                </Button>

            </Flex>
        </AddFrame>
    </Flex>
};
