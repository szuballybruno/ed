import React, { useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { LearningCourseStats } from "./LearningCourseStats";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../system/MainPanels";
import { LearningInsightsOverview } from "../LearningInsightsOverview";
import { NavigationLinkList } from "../NavigationLinkList";
import { MyExams } from "../MyExams";
import { LearningStatistics } from "./LearningStatistics";
import { CurrentUserContext } from "../system/AuthenticationFrame";

const LearningInsightsPage = () => {

    const user = useContext(CurrentUserContext)!;

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
                        <LearningStatistics userId={user.id} />
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
