import React, { useEffect, useState } from 'react';
import { Flex } from "@chakra-ui/react";
import { Tab, Tabs } from "@mui/material";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { useNavigation } from "../../../../services/navigatior";
import { AdminSubpageHeader } from '../../AdminSubpageHeader';

const CourseStatistics = () => {
    const { courseId } = useParams<{ courseId: string }>()

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
        navigate(`${administrationRoutes.coursesRoute.route}/${courseId}/${newValue}`)
        newValue && setCurrentTab(newValue);
    };

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader>
                <Flex mx={20} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} h={60}>
                    <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Szerkesztés" value={"edit"} />
                        <Tab label="Statisztika" value={"statistics"} />
                    </Tabs>
                </Flex>
            </AdminSubpageHeader>
            Course Stats
        </Flex>
    );
};

export default CourseStatistics;
