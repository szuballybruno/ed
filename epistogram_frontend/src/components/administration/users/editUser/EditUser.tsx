
import {Box, Flex} from '@chakra-ui/react';
import {Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {AdministrationSubpageHeader} from "../../universal/adminAddHeader/AdministrationSubpageHeader";
import {applicationRoutes} from "../../../../configuration/applicationRoutes";
import {useNavigation} from "../../../../services/navigatior";
import {useParams} from "react-router";

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
        </Flex>
    );
};

export default EditUser;
