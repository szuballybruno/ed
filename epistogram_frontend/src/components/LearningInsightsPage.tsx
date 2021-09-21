import { Assignment, School, Subscriptions } from "@mui/icons-material";
import React from "react";
import { Route, Switch } from 'react-router-dom';
import { RouteItemType } from "../models/types";
import MyCourses from "./courseInsights/MyCourses";
import MyExams from "./examInsights/MyExams";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import { LearningInsightsOverview as LearningInsightsOverview } from "./learningInsightsOverview/LearningInsightsOverview";
import { NavigationLinkList } from "./NavigationLinkList";
import Navbar from "./universal/navigation/navbar/Navbar";

const menuItems = [
    {
        title: "Áttekintés",
        route: "/learning",
        icon: <School color={"secondary"} />,
    },
    {
        title: "Kurzusaim",
        route: "/learning/courses",
        icon: <Subscriptions color={"secondary"} />,
    },
    {
        title: "Vizsgáim",
        route: "/learning/exams",
        icon: <Assignment color={"secondary"} />
    }
] as RouteItemType[];

const LearningInsightsPage = () => {

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel padding="20px">
                <NavigationLinkList items={menuItems} />
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
