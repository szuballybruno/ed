import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useRedirectOnExactMatch } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { LearningInsightsOverview } from '../LearningInsightsOverview';
import { LeftPane } from '../LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from '../PageRootContainer';
import { CurrentUserContext } from '../system/AuthenticationFrame';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { LearningCourseStats } from './LearningCourseStats';
import { LearningStatistics } from './LearningStatistics';

const LearningInsightsPage = () => {

    const user = useContext(CurrentUserContext)!;

    useRedirectOnExactMatch({
        route: applicationRoutes.learningRoute,
        redirectRoute: applicationRoutes.learningRoute.overview
    });

    return <PageRootContainer>

        <LeftPane>

            <NavigationLinkList
                routes={[
                    applicationRoutes.learningRoute.overview,
                    applicationRoutes.learningRoute.myStatisticsRoute,
                    applicationRoutes.learningRoute.myCoursesRoute
                ]} />
        </LeftPane>

        <ContentPane>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.learningRoute.overview,
                        element: <LearningInsightsOverview />
                    },
                    {
                        route: applicationRoutes.learningRoute.myStatisticsRoute,
                        element: <LearningStatistics userId={user.id} />
                    },
                    {
                        route: applicationRoutes.learningRoute.myCoursesRoute,
                        element: <LearningCourseStats />
                    }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
export default LearningInsightsPage;
