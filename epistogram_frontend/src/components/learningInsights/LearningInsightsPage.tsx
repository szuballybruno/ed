import React from "react";
import { Route, Switch } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { LearningCourseStats } from "./LearningCourseStats";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../system/MainPanels";
import { LearningInsightsOverview } from "../LearningInsightsOverview";
import { NavigationLinkList } from "../NavigationLinkList";
import { MyExams } from "../MyExams";
import { LearningStatistics } from "./LearningStatistics";

const LearningInsightsPage = () => {

    return <MainWrapper>

        <ContentWrapper>

            <LeftPanel>

                <NavigationLinkList
                    items={[
                        applicationRoutes.learningRoute.learningOverviewRoute,
                        applicationRoutes.learningRoute.myStatisticsRoute,
                        applicationRoutes.learningRoute.myCoursesRoute/* ,
                        applicationRoutes.learningRoute.myExamsRoute */
                    ]} />
            </LeftPanel>

            <RightPanel>

                <Switch>

                    <Route path={applicationRoutes.learningRoute.route} exact>
                        <LearningInsightsOverview />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myStatisticsRoute.route}>
                        <LearningStatistics />
                    </Route>
                    <Route path={applicationRoutes.learningRoute.myCoursesRoute.route}>
                        <LearningCourseStats />
                    </Route>
                    {/* <Route path={applicationRoutes.learningRoute.myExamsRoute.route}>
                        <MyExams />
                    </Route> */}
                </Switch>
            </RightPanel>
        </ContentWrapper >
    </MainWrapper >
};
export default LearningInsightsPage
