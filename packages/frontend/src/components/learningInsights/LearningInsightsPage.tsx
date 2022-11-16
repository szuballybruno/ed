import { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useRedirectOnExactMatch } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { LearningInsightsOverview } from '../LearningInsightsOverview';
import { LeftPane } from '../LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { CurrentUserContext } from '../system/AuthenticationFrame';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { LearningCourseStats } from './LearningCourseStats';

const LearningInsightsPage = () => {

    const { id } = useContext(CurrentUserContext);

    useRedirectOnExactMatch({
        route: applicationRoutes.learningRoute,
        redirectRoute: applicationRoutes.learningRoute.overviewRoute
    });

    return <>

        <LeftPane>

            <NavigationLinkList
                routes={[
                    applicationRoutes.learningRoute.overviewRoute,
                    applicationRoutes.learningRoute.myCoursesRoute
                ]} />
        </LeftPane>

        <ContentPane>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.learningRoute.overviewRoute,
                        element: <LearningInsightsOverview />
                    },
                    {
                        route: applicationRoutes.learningRoute.myCoursesRoute,
                        element: <LearningCourseStats />
                    }
                ]} />
        </ContentPane>
    </>;
};
export default LearningInsightsPage;