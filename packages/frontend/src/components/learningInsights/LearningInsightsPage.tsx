import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Navigator } from '../../services/core/navigatior';
import { useRedirectOnExactMatch } from '../../static/frontendHelpers';
import { NavigationLinkList } from '../NavigationLinkList';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { MyProgressCompletedCourses } from './MyProgressCompletedCourses';
import { MyProgressStartedCourses } from './MyProgressStartedCourses';

const LearningInsightsPage = () => {

    useRedirectOnExactMatch({
        route: applicationRoutes.myProgressRoute,
        redirectRoute: applicationRoutes.myProgressRoute.startedCoursesRoute
    });

    const { navigate3 } = Navigator
        .useNavigation();

    return <>

        <LeftPane>

            <NavigationLinkList
                onNav={route => navigate3(route)}
                routes={[
                    applicationRoutes.myProgressRoute.startedCoursesRoute,
                    applicationRoutes.myProgressRoute.completedCoursesRoute
                ]} />
        </LeftPane>

        <ContentPane>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.myProgressRoute.startedCoursesRoute,
                        element: <MyProgressStartedCourses />
                    },
                    {
                        route: applicationRoutes.myProgressRoute.completedCoursesRoute,
                        element: <MyProgressCompletedCourses />
                    }
                ]} />
        </ContentPane>
    </>;
};
export default LearningInsightsPage;
