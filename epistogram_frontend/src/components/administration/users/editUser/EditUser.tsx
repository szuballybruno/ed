
import {Box, Flex} from '@chakra-ui/react';
import {Button, Tab, Tabs, TextField, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {AdministrationSubpageHeader} from "../../universal/adminAddHeader/AdministrationSubpageHeader";
import {applicationRoutes} from "../../../../configuration/applicationRoutes";
import {useNavigation} from "../../../../services/navigatior";
import {useParams} from "react-router";
import {getEventValueCallback, hasValue, TypedError} from "../../../../frontendHelpers";
import {EpistoSelect} from "../../../universal/EpistoSelect";
import {AddFrame} from "../../../add_frame/AddFrame";
import {RoleDTO} from "../../../../models/shared_models/RoleDTO";
import {OrganizationDTO} from "../../../../models/shared_models/OrganizationDTO";
import {CurrentUserContext} from "../../../HOC/AuthenticationFrame";
import {UserDTO} from "../../../../models/shared_models/UserDTO";
import {useOrganizations} from "../../../../services/organizationsService";
import {CreateInvitedUserDTO} from "../../../../models/shared_models/CreateInvitedUserDTO";
import {createInvitedUserAsync} from "../../../../services/userManagementService";
import {showNotification} from "../../../../services/notifications";
import {jobTitles, roles} from "../../../AddUser";

const EditUser = () => {

    const {userId} = useParams<{ userId: string }>()

    const [currentTab, setCurrentTab] = useState("")

    const { navigate } = useNavigation()

    const administrationRoutes = applicationRoutes.administrationRoute;

    useEffect(() => {
        const segments = window.location.pathname.split('/');
        const last = segments.pop() || segments.pop();
        last && setCurrentTab(last)
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        const segments = window.location.pathname.split('/');
        const last = segments.pop() || segments.pop(); // Handle potential trailing slash
        navigate(`${administrationRoutes.usersRoute.route}/${userId}/${newValue}`)
        newValue && setCurrentTab(newValue);
    };


    // editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<RoleDTO | null>(null);
    const [jobTitle, setJobTitle] = useState<RoleDTO | null>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationDTO | null>(null);

    const user = useContext(CurrentUserContext) as UserDTO;
    const canSetInvitedUserOrganization = user.userActivity.canSetInvitedUserOrganization;
    const { organizations } = useOrganizations();

    useEffect(() => {

        if (organizations)
            setSelectedOrganization(organizations[0]);
    }, [organizations]);

    const submitAddUserRequestAsync = async () => {

        const createInvitedUserDTO = {
            firstName,
            lastName,
            email,
            jobTitle: jobTitles[0].name,
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


    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdministrationSubpageHeader>
                <Flex mx={20} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} h={60}>
                    <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Szerkesztés" value={"edit"} />
                        <Tab label="Statisztika" value={"statistics"} />
                        <Tab label="Feladatok" value={"tasks"}  />
                    </Tabs>
                </Flex>
            </AdministrationSubpageHeader>

            <AddFrame
                submitHandler={e => {

                    e.preventDefault();
                    submitAddUserRequestAsync();
                }} title={""}>

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

                    {/* job titles */}
                    <Flex direction="column" align="stretch" width="100%">
                        <Typography>Beosztás</Typography>
                        <EpistoSelect
                            selectedValue={jobTitle}
                            items={jobTitles}
                            onSelected={setJobTitle}
                            getDisplayValue={x => "" + x?.name}
                            getCompareKey={x => "" + x?.id} />
                    </Flex>

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
                        color={"secondary"}
                        style={{ marginTop: "20px" }}>
                        Módosítások mentése
                    </Button>

                </Flex>
            </AddFrame>
        </Flex>
    );
};

export default EditUser;
