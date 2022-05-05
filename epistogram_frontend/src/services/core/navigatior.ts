import { useNavigate } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { CourseStageNameType } from '../../shared/types/sharedTypes';
import { ApplicationRoute } from '../../models/types';
import { getUrl } from '../../static/frontendHelpers';
import { useCallback } from 'react';
import { Environment } from '../../static/Environemnt';

export const useNavigation = () => {

    const domNavigate = useNavigate();

    const navigate = useCallback((route: ApplicationRoute, params?: any, query?: any) => {

        const replacedPath = getUrl(route.route.getAbsolutePath(), params, query);

        if (Environment.verboseLogging)
            console.log('Navigating to: ' + replacedPath);

        domNavigate(replacedPath);
    }, [domNavigate, getUrl, Environment.verboseLogging]);

    const navigateToHref = useCallback((href: string) => {

        domNavigate(href);
    }, [domNavigate]);

    const navigateWithParams = <T,>(route: ApplicationRoute<T>, params: T) => {

        navigate(route, params);
    };

    const openNewTab = (url: string) => (window as any).open(url, '_blank')
        .focus();

    const navigateToPlayer = (descriptorCode: string) => navigate(applicationRoutes.playerRoute.watchRoute, { descriptorCode });

    const navigateToCourseDetails = (courseId: number, descriptorCode?: string) => navigate(applicationRoutes.courseDetailsRoute, { courseId }, { descriptorCode });

    const navigateToWatchPrequiz = (courseId: number) => navigate(applicationRoutes.playerRoute.prequizRoute, { courseId });

    const navigateToWatchPretest = (courseId: number) => navigate(applicationRoutes.playerRoute.pretestRoute, { courseId });

    const navigateToWatchPretestResults = (courseId: number) => navigate(applicationRoutes.playerRoute.pretestResultsRoute, { courseId });

    const navigateToCourseRating = (courseId: number) => navigate(applicationRoutes.playerRoute.courseRatingRoute, { courseId });

    const navigateToCourseOverview = (courseId: number) => navigate(applicationRoutes.playerRoute.courseOverviewRoute, { courseId });

    const playCourse = (courseId: number, stageName: CourseStageNameType, currentItemCode: string | null) => {

        if (currentItemCode) {

            navigateToPlayer(currentItemCode);
            return;
        }

        if (stageName === 'pretest') {

            navigateToWatchPretest(courseId);
            return;
        }

        if (stageName === 'pretest_results') {

            navigateToWatchPretestResults(courseId);
            return;
        }

        navigateToWatchPrequiz(courseId);
    };

    const navigateToAdminCourseList = () => navigate(applicationRoutes.administrationRoute.coursesRoute);

    return {
        history,
        navigate,
        navigateWithParams,
        navigateToPlayer,
        navigateToCourseDetails,
        openNewTab,
        navigateToWatchPrequiz,
        navigateToWatchPretest,
        navigateToWatchPretestResults,
        navigateToCourseRating,
        navigateToCourseOverview,
        playCourse,
        navigateToAdminCourseList,
        navigateToHref
    };
};