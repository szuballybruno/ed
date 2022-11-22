import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Navigator } from '../../services/core/navigatior';
import { useRedirectOnExactMatch } from '../../static/frontendHelpers';
import { LearningInsightsOverview } from '../LearningInsightsOverview';
import { NavigationLinkList } from '../NavigationLinkList';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { LearningCourseStats } from './LearningCourseStats';

const LearningInsightsPage = () => {

    useRedirectOnExactMatch({
        route: applicationRoutes.learningRoute,
        redirectRoute: applicationRoutes.learningRoute.overviewRoute
    });

    const { navigate3 } = Navigator
        .useNavigation();

    return <>

        <LeftPane>

            <NavigationLinkList
                onNav={route => navigate3(route)}
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
