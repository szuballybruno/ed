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
        className="roundBorders"
        background="var(--transparentWhite70)"
        flex="1"
        alignItems={"flex-start"}>

        <Flex direction="column">

            {/* first & last name */}
            <Flex>
                <EpistoEntry
                    value={firstName}
                    name="fname"
                    setValue={setFirstName}
                    labelVariant={"top"}
                    label={translatableTexts.misc.firstName} />

                <EpistoEntry
                    name="lname"
                    value={lastName}
                    setValue={setLastName}
                    labelVariant={"top"}
                    label={translatableTexts.misc.lastName} />
            </Flex>

            {/* email */}
            <EpistoEntry
                name="email"
                value={email}
                setValue={setEmail}
                labelVariant={"top"}
                label="Email" />

            {/* organization */}
            {canSetInvitedUserOrganization && <Flex
                direction="column"
                align="stretch"
                mt="10px"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px"
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
                mt="10px"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px"
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

            {/* role */}
            <Flex
                direction="column"
                align="stretch"
                width="100%">

                <EpistoFont
                    isUppercase
                    fontSize="fontExtraSmall"
                    style={{
                        marginTop: "10px"
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
            <EpistoLabel text={translatableTexts.administration.editUserControl.isItTeacher}>
                <Flex align="center">
                    <Checkbox
                        checked={isTeacher}
                        onChange={(_, x) => setIsTeacher(x)} />

                    <EpistoFont
                        style={{ flex: "1" }}>

                        {translatableTexts.administration.editUserControl.selectUserAsTeacher}
                    </EpistoFont>
                </Flex>
            </EpistoLabel>

            {/* submit button */}
            <Button
                variant={"outlined"}
                color={"secondary"}
                onClick={() => handleSaveUserAsync()}
                style={{ marginTop: "20px" }}>

                {translatableTexts.misc.save}
            </Button>
        </Flex>
    </Box>
};
