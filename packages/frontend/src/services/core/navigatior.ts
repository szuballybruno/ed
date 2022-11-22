import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { CourseStageNameType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { getUrl } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';

const useHrefNav = () => {

    const navigate = useNavigate();
    const hrefNavigate = useMemo(() => navigate, []);

    return { hrefNavigate };
};

export const useNavigation = () => {

    const { hrefNavigate } = useHrefNav();

    const _nav = useCallback(({ params, query, route }: { route: ApplicationRoute<any, any>, params?: any, query?: any }) => {

        if (!route.route)
            return;

        const replacedPath = getUrl(route.route.getAbsolutePath(), params, query);

        Logger.logScoped('ROUTING', 'Navigating to: ' + replacedPath);

        hrefNavigate(replacedPath);
    }, [hrefNavigate]);

    const navigate2 = useCallback(<TParams, TQuery>(
        route: (ApplicationRoute<TParams, TQuery>),
        ...args: TParams extends void
            ? TQuery extends void
            ? []
            : [TQuery]
            : TQuery extends void
            ? [TParams]
            : [TParams, TQuery]) => {

        const [params, query] = args;

        _nav({ route, params, query });
    }, [_nav]);

    const navigate3 = useCallback(<TParams, TQuery>(
        route: ApplicationRoute<TParams, TQuery>,
        ...args: TParams extends void
            ? TQuery extends void
            ? []
            : [{ query: TQuery }]
            : TQuery extends void
            ? [{ params: TParams, query: TQuery }]
            : []) => {

        const [opts] = args;
        const optsOrEmpty = opts ?? {};
        const query = optsOrEmpty['query'] as TQuery | undefined;
        const params = optsOrEmpty['params'] as TParams | undefined;

        _nav({ route, params, query });
    }, [_nav]);

    const navigateToHref = useCallback((href: string) => {

        hrefNavigate(href);
    }, [hrefNavigate]);

    const openNewTab = (url: string) => (window as any).open(url, '_blank')
        .focus();

    /**
     * @deprecated use "navigate2"
     */
    const navigateToPlayer = (descriptorCode: string) => navigate2(applicationRoutes.playerRoute.watchRoute, { descriptorCode });

    /**
     * @deprecated use "navigate2"
     */
    const navigateToCourseDetails = (courseId: Id<'Course'>, descriptorCode?: string) => navigate2(applicationRoutes.courseDetailsRoute, { courseId }, { descriptorCode });

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

    const continueCourse = (courseId: Id<'Course'>, stageName: CourseStageNameType | null, currentItemCode: string | null) => {

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

        navigate2(applicationRoutes.playerRoute.greetingRoute, { courseId });
    };

    const navigateToAdminCourseList = () => navigate2(applicationRoutes.administrationRoute.coursesRoute);

    return {
        history,
        navigate2,
        navigateToPlayer,
        navigateToCourseDetails,
        openNewTab,
        navigateToWatchPrequiz,
        navigateToPretest,
        navigateToPretestGreeting,
        navigateToCourseRating,
        navigateToCourseOverview,
        continueCourse,
        navigateToAdminCourseList,
        navigateToHref,
        navigate3
    };
};