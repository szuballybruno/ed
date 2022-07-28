import { useNavigate } from 'react-router-dom';
import { applicationRoutes, ApplicationRoutesType } from '../../configuration/applicationRoutes';
import { CourseStageNameType } from '../../shared/types/sharedTypes';
import { ApplicationRoute } from '../../models/types';
import { getUrl } from '../../static/frontendHelpers';
import { useCallback } from 'react';
import { Environment } from '../../static/Environemnt';
import { Id } from '../../shared/types/versionId';
import { Logger } from '../../static/Logger';

export const useNavigation = () => {

    const domNavigate = useNavigate();

    /**
     * @deprecated use "navigate2"
     */
    const navigate = useCallback((route: ApplicationRoute, params?: any, query?: any) => {

        const replacedPath = getUrl(route.route.getAbsolutePath(), params, query);

        Logger.logScoped('ROUTING', 'Navigating to: ' + replacedPath);

        domNavigate(replacedPath);
    }, [domNavigate, getUrl, Environment.loggingEnabled]);

    const navigate2 = <T>(routeOrFn: (ApplicationRoute<T>) | ((routes: ApplicationRoutesType) => ApplicationRoute<T>), ...args: T extends void ? [] : [T]) => {

        const [params] = args;

        const route = typeof routeOrFn === 'function'
            ? routeOrFn(applicationRoutes)
            : routeOrFn as ApplicationRoute<T>;

        if (!params)
            Logger.logScoped('WARNING', 'Navigating without parameters! Route: ' + route.route.getAbsolutePath());

        const replacedPath = getUrl(route.route.getAbsolutePath(), params);

        Logger.logScoped('ROUTING', 'Navigating to: ' + replacedPath);

        domNavigate(replacedPath);
    };

    const navigateToHref = useCallback((href: string) => {

        domNavigate(href);
    }, [domNavigate]);

    const openNewTab = (url: string) => (window as any).open(url, '_blank')
        .focus();

    /**
     * @deprecated use "navigate2"
     */
    const navigateToPlayer = (descriptorCode: string) => navigate2(applicationRoutes.playerRoute.watchRoute, { descriptorCode });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToCourseDetails = (courseId: Id<'Course'>, descriptorCode?: string) => navigate(applicationRoutes.courseDetailsRoute, { courseId }, { descriptorCode });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToWatchPrequiz = (courseId: Id<'Course'>) => navigate2(applicationRoutes.playerRoute.prequizRoute, { courseId });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToPretestGreeting = (courseId: Id<'Course'>) => navigate2(applicationRoutes.playerRoute.pretestGreetingRoute, { courseId });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToPretest = (courseId: Id<'Course'>) => navigate2(applicationRoutes.playerRoute.pretestRoute, { courseId });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToCourseRating = (courseId: Id<'Course'>) => navigate2(applicationRoutes.playerRoute.courseRatingRoute, { courseId });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToCourseOverview = (courseId: Id<'Course'>) => navigate2(applicationRoutes.playerRoute.courseOverviewRoute, { courseId });

    const playCourse = (courseId: Id<'Course'>, stageName: CourseStageNameType, currentItemCode: string | null) => {

        if (currentItemCode) {

            navigateToPlayer(currentItemCode);
            return;
        }

        if (stageName === 'pretest') {

            navigateToPretest(courseId);
            return;
        }

        if (stageName === 'pretest_results') {

            navigate2(applicationRoutes.playerRoute.pretestResultsRoute, { courseId });
            return;
        }

        navigateToWatchPrequiz(courseId);
    };

    const navigateToAdminCourseList = () => navigate(applicationRoutes.administrationRoute.coursesRoute);

    return {
        history,
        navigate,
        navigate2,
        navigateToPlayer,
        navigateToCourseDetails,
        openNewTab,
        navigateToWatchPrequiz,
        navigateToPretest,
        navigateToPretestGreeting,
        navigateToCourseRating,
        navigateToCourseOverview,
        playCourse,
        navigateToAdminCourseList,
        navigateToHref
    };
};