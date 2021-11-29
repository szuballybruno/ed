import React from "react";
import { Route, Switch } from 'react-router-dom';
import { applicationRoutes } from "../configuration/applicationRoutes";
import MyCourses from "./courseInsights/MyCourses";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./system/MainPanels";
import { LearningInsightsOverview } from "./LearningInsightsOverview";
import { NavigationLinkList } from "./NavigationLinkList";
import Navbar from "./navbar/Navbar";
import { MyExams } from "./MyExams";

const LearningInsightsPage = () => {

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel padding="20px" flexBasis="300px">
                <NavigationLinkList
                    items={[
                        applicationRoutes.learningRoute.learningOverviewRoute,
                        applicationRoutes.learningRoute.myCoursesRoute,
                        applicationRoutes.learningRoute.myExamsRoute
                    ]} />
            </LeftPanel>

            <RightPanel
                padding="5px"
                bg="var(--whiteGrey)">

                <Switch>
                    <Route path={applicationRoutes.learningRoute.route} exact>
                        <LearningInsightsOverview />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myCoursesRoute.route}>
                        <MyCourses />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myExamsRoute.route}>
                        <MyExams />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper >
    </MainWrapper >
};
export default LearningInsightsPage
