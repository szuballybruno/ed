import { Box, Flex } from "@chakra-ui/react";
import { Button, Checkbox, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { JobTitleDTO } from "../../../shared/dtos/JobTitleDTO";
import { OrganizationDTO } from "../../../shared/dtos/OrganizationDTO";
import { RoleDTO } from "../../../shared/dtos/RoleDTO";
import { UserDTO } from "../../../shared/dtos/UserDTO";
import { UserEditDTO } from "../../../shared/dtos/UserEditDTO";
import { useJobTitles, useOrganizations } from "../../../services/api/miscApiService";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { EpistoSelect } from "../../controls/EpistoSelect";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { EpistoFont } from "../../controls/EpistoFont";
import { translatableTexts } from "../../../static/translatableTexts";
import { AdminPageUserDTO } from "../../../shared/dtos/AdminPageUserDTO";
import { useHistory } from "react-router-dom";

export const roles = [
    {
        name: "admin",
        id: 1,
        optionText: translatableTexts.roleNames.administrator,
    },
    {
        name: "supervisor",
        id: 2,
        optionText: translatableTexts.roleNames.supervisor,
    },
    {
        name: "user",
        id: 3,
        optionText: translatableTexts.roleNames.user
    }
];

export const EditUserControl = (props: {
    editDTO: UserEditDTO | null,
    saveUserAsync: (editDTO: UserEditDTO) => Promise<void>
    showDeleteUserDialog?: (UserEditDTO: UserEditDTO | null) => void
}) => {

    const { editDTO, saveUserAsync, showDeleteUserDialog } = props;

    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<RoleDTO | null>(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDTO | null>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDTO | null>(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const history = useHistory()

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
        setIsTeacher(editDTO.isTeacher);
    }, [editDTO]);

    const handleSaveUserAsync = async () => {

        const editedUserDTO = {
            id: editDTO?.id,
            firstName,
            lastName,
            email,
            jobTitle: selectedJobTitle,
            organization: selectedOrganization,
            role: selectedRole,
            isTeacher
        } as UserEditDTO;

        await saveUserAsync(editedUserDTO);
    }

    return <Box
        p="0 10px 10px 10px"
        flex="1"
        alignItems={"flex-start"}>

        <Flex direction="column">
            <EpistoFont
                fontSize={"fontHuge"}
                style={{
                    fontWeight: 600,
                    marginTop: 10
                }}>

                Alapadatok
            </EpistoFont>

            {/* first & last name */}
            <Flex flex="1" justify="space-between">
                <EpistoEntry
                    style={{
                        flex: 1,
                        marginRight: 5
                    }}
                    name="lname"
                    value={lastName}
                    setValue={setLastName}
                    labelVariant={"top"}
                    label={translatableTexts.misc.lastName} />
                <EpistoEntry
                    style={{
                        flex: 1
                    }}
                    value={firstName}
                    name="fname"
                    setValue={setFirstName}
                    labelVariant={"top"}
                    label={translatableTexts.misc.firstName} />
            </Flex>

            {/* email */}
            <EpistoEntry
                name="email"
                value={email}
                setValue={setEmail}
                labelVariant={"top"}
                label="Email" />

            <EpistoFont
                fontSize={"fontHuge"}
                style={{
                    marginTop: 50,
                    fontWeight: 600
                }}>

                Cég és beosztás
            </EpistoFont>

            {/* organization */}
            {canSetInvitedUserOrganization && <Flex
                direction="column"
                align="stretch"
                mt="5px"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px",
                        letterSpacing: "1.2px"
                    }}>

                    {translatableTexts.misc.company}
                </EpistoFont>

                <EpistoSelect
                    items={organizations}
                    selectedValue={selectedOrganization}
                    onSelected={setSelectedOrganization}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={organization => "" + organization?.id} />
            </Flex>}

            {/* job title */}
            {canSetInvitedUserOrganization && <Flex
                direction="column"
                align="stretch"
                mt="5px"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px",
                        letterSpacing: "1.2px"
                    }}>

                    {translatableTexts.misc.jobTitle}
                </EpistoFont>

                <EpistoSelect
                    items={jobTitles}
                    selectedValue={selectedJobTitle}
                    onSelected={setSelectedJobTitle}
                    getDisplayValue={jt => "" + jt?.name}
                    getCompareKey={jt => "" + jt?.id} />
            </Flex>}

            <EpistoFont
                fontSize={"fontHuge"}
                style={{
                    marginTop: 50,
                    fontWeight: 600
                }}>

                Jogosultságkezelés
            </EpistoFont>

            {/* role */}
            <Flex
                direction="column"
                align="stretch"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px",
                        letterSpacing: "1.2px"
                    }}>

                    {translatableTexts.misc.role}
                </EpistoFont>

                <EpistoSelect
                    selectedValue={selectedRole}
                    items={roles}
                    onSelected={setSelectedRole}
                    getDisplayValue={x => "" + (x as any)?.optionText}
                    getCompareKey={x => "" + x?.id} />
            </Flex>

            {/* is teacher */}
            <EpistoFont isUppercase fontSize="fontExtraSmall" style={{
                marginTop: 10,
                letterSpacing: "1.2px"
            }}>
                {translatableTexts.administration.editUserControl.selectAsTeacher}
            </EpistoFont>
            <Flex align="center">
                <Checkbox
                    checked={isTeacher}
                    onChange={(_, x) => setIsTeacher(x)} />

                <EpistoFont
                    style={{ flex: "1" }}>

                    {translatableTexts.administration.editUserControl.selectUserAsTeacher}
                </EpistoFont>
            </Flex>

            {/* submit button */}
            <Button
                variant="contained"
                color={"secondary"}
                onClick={() => handleSaveUserAsync()}
                style={{ marginTop: "20px" }}>

                {translatableTexts.misc.save}
            </Button>

            {/* remove button */}
            <Button
                variant={"outlined"}
                color={"error"}
                onClick={() => {

                    if (showDeleteUserDialog) {

                        showDeleteUserDialog(editDTO)
                    } else {

                        history.goBack()
                    }
                }}
                style={{ marginTop: "20px" }}>

                {translatableTexts.misc.remove}
            </Button>
        </Flex>
    </Box>
};
