import { Flex } from "@chakra-ui/layout";
import { Assignment, School, Subscriptions } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { NavLink, Route, Switch } from 'react-router-dom';
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import { LearningInsightsOverview as LearningInsightsOverview } from "./learningInsightsOverview/LearningInsightsOverview";
import Navbar from "./universal/navigation/navbar/Navbar";
import MyCourses from "./courseInsights/MyCourses";
import MyExams from "./examInsights/MyExams";

const menuItems = [
    {
        "menuName": "Tanulás",
        "route": "/learning"
    },
    {
        "menuName": "Kurzusaim",
        "route": "/learning/courses"
    },
    {
        "menuName": "Vizsgáim",
        "route": "/learning/exams"
    }
];

const LearningInsightsPage = () => {

    const icons = {
        0: <School color={"secondary"} />,
        1: <Subscriptions color={"secondary"} />,
        2: <Assignment color={"secondary"} />
    }

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel padding="20px">
                {menuItems
                    .map((menuItem, index) => {

                        return <NavLink
                            exact
                            to={menuItem.route}
                            key={index}>
                            <Flex p="20px" className="leftBorderOnHover" align="center">

                                {/* icon */}
                                {icons[index]}

                                {/* text */}
                                <Typography
                                    color={"secondary"}
                                    variant={"button"}
                                    style={{ marginLeft: "10px" }}>
                                    {menuItems[index].menuName}
                                </Typography>
                            </Flex>
                        </NavLink>
                    })}
            </LeftPanel>

            <RightPanel>
                <Switch>
                    <Route path={'/learning'} exact>
                        <LearningInsightsOverview />
                    </Route>
                    <Route path={'/learning/courses'}>
                        <MyCourses />
                    </Route>
                    <Route path={'/learning/exams'}>
                        <MyExams />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper >
    </MainWrapper >
};
export default LearningInsightsPage
