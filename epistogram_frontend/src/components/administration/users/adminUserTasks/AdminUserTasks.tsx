import React, {useEffect, useState} from 'react';
import {AdministrationSubpageHeader} from "../../universal/adminAddHeader/AdministrationSubpageHeader";
import {Flex} from "@chakra-ui/react";
import {Tasks} from "../../../Tasks";
import {mockTasks} from "../../../../mockData";
import {Tab, Tabs} from "@mui/material";
import {useParams} from "react-router";
import {useNavigation} from "../../../../services/navigatior";
import {applicationRoutes} from "../../../../configuration/applicationRoutes";

const AdminUserTasks = () => {
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
        setCurrentTab(newValue);
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
                <Tasks  currentTasks={mockTasks}/>
            </AdministrationSubpageHeader>
        </Flex>
    );
};

export default AdminUserTasks;
