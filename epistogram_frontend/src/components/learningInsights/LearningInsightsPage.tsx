import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { LearningInsightsOverview } from "../LearningInsightsOverview";
import { NavigationLinkList } from "../NavigationLinkList";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { PageRootContainer } from "../PageRootContainer";
import { LearningCourseStats } from "./LearningCourseStats";
import { LearningStatistics } from "./LearningStatistics";
import { LeftPane } from "../LeftPane";
import { ContentPane } from "../ContentPane";

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

            <Route path={applicationRoutes.learningRoute.route}>
                <LearningInsightsOverview />
            </Route>
            <Route path={applicationRoutes.learningRoute.myStatisticsRoute.route}>
                <LearningStatistics userId={user.id} />
            </Route>
            <Route path={applicationRoutes.learningRoute.myCoursesRoute.route}>
                <LearningCourseStats />
            </Route>
        </ContentPane>
    </PageRootContainer>;
};
export default LearningInsightsPage;
