import React, { useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { LearningInsightsOverview } from "../LearningInsightsOverview";
import { NavigationLinkList } from "../NavigationLinkList";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { LeftPane, PageRootContainer, ContentPane } from "../system/MainPanels";
import { LearningCourseStats } from "./LearningCourseStats";
import { LearningStatistics } from "./LearningStatistics";

const LearningInsightsPage = () => {

    const user = useContext(CurrentUserContext)!;

    return <PageRootContainer>

        <LeftPane>

            <NavigationLinkList
                items={[
                    applicationRoutes.learningRoute.learningOverviewRoute,
                    applicationRoutes.learningRoute.myStatisticsRoute,
                    applicationRoutes.learningRoute.myCoursesRoute
                ]} />
        </LeftPane>

        <ContentPane>

            <Switch>

                <Route path={applicationRoutes.learningRoute.route} exact>
                    <LearningInsightsOverview />
                </Route>
                <Route path={applicationRoutes.learningRoute.myStatisticsRoute.route}>
                    <LearningStatistics userId={user.id} />
                </Route>
                <Route path={applicationRoutes.learningRoute.myCoursesRoute.route}>
                    <LearningCourseStats />
                </Route>
            </Switch>
        </ContentPane>
    </PageRootContainer>
};
export default LearningInsightsPage
