import { ReactNode } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { NavbarButton } from '../universal/NavbarButton';
import { ContinueCourseButton } from './ContinueCourseButton';
import { ShopAndNotifications } from './ShopAndNotifications';

export const DesktopNavbar = ({
    backgroundContent,
    showLogo,
    currentCourseItemCode,
    isLowHeight: _isLowHeight,
    isMinimalMode: _isMinimalMode,
    hideLinks1
}: {
    currentCourseItemCode: string | null
    hideLinks1: boolean
    isLowHeight?: boolean
    showLogo?: boolean
    isMinimalMode?: boolean
    backgroundContent?: any
}) => {

    const isLowHeight = !!_isLowHeight;
    const isMinimalMode = !!_isMinimalMode;

    const { hasPermission } = useAuthorizationContext();

    const menuItems: ApplicationRoute[] = new ArrayBuilder<Omit<ApplicationRoute, 'icon'> & { icon: ReactNode }>()
        .addIf(hasPermission('ADMINISTRATE_COMPANY'), {
            title: applicationRoutes.administrationRoute.title,
            route: applicationRoutes.administrationRoute.usersRoute.route,
            icon: applicationRoutes.administrationRoute.icon
        })
        .add({
            title: applicationRoutes.homeRoute.title,
            route: applicationRoutes.homeRoute.route,
            icon: applicationRoutes.homeRoute.icon
        })
        .add({
            title: applicationRoutes.availableCoursesRoute.title,
            route: applicationRoutes.availableCoursesRoute.route,
            icon: applicationRoutes.availableCoursesRoute.icon
        })
        .add({
            title: applicationRoutes.learningRoute.title,
            route: applicationRoutes.learningRoute.route,
            icon: applicationRoutes.learningRoute.icon
        })
        .add({
            title: applicationRoutes.leaderboardRoute.title,
            route: applicationRoutes.leaderboardRoute.route,
            icon: applicationRoutes.leaderboardRoute.icon
        })
        .getArray() as any;

    const { navigate2 } = useNavigation();

    // context
    const { isAuthenticated } = useAuthorizationContext();

    // media
    const isLargerThan1180 = Responsivity
        .useIsLargerThan('1180px');

    const isLargerThan1000 = Responsivity
        .useIsLargerThan('1000px');

    // util
    const hideLinks = hideLinks1 || !isAuthenticated;
    const isMidMode = (isLargerThan1180 && !showLogo) || (isLargerThan1000 && showLogo);

    // funcs
    const MinimalRender = () => {

        return <EpistoFlex2>
            {menuItems
                .map((route, index) => {
                    return (
                        <EpistoButton
                            variant="plain"
                            key={index}
                            onClick={() => navigate2(route)}>

                            {route.icon}
                        </EpistoButton>
                    );
                })}
        </EpistoFlex2>;
    };

    const MidRender = () => {

        return (
            <EpistoFlex2
                height="50px"
                flex="1 0 600px">

                {/* menu items */}
                {menuItems
                    .map((route, index) => (
                        <NavbarButton
                            key={index}
                            menuName={route.title}
                            onClick={() => navigate2(route)} />
                    ))}

                {/* continue course button */}
                <ContinueCourseButton
                    currentCourseItemCode={currentCourseItemCode} />
            </EpistoFlex2>
        );
    };

    const LargeRender = () => {

        return (
            <EpistoFlex2>
                {menuItems
                    .map((route, index) => {
                        return (
                            <EpistoButton
                                variant="plain"
                                key={index}
                                onClick={() => {
                                    navigate2(route);
                                }}>

                                {route.icon}
                            </EpistoButton>
                        );
                    })}

                {/* continue watching  */}
                <ContinueCourseButton
                    currentCourseItemCode={currentCourseItemCode} />
            </EpistoFlex2>
        );
    };

    Logger.logScoped('RENDER', 'Rendering navbar');

    return (
        <EpistoFlex2
            align="center"
            width="100%"
            flex="1"
            height={isMinimalMode ? '30px' : isLowHeight ? '40px' : '60px'}
            mt={isLowHeight || isMinimalMode ? undefined : '10px'}
            mb={isLowHeight || isMinimalMode ? undefined : '10px'}
            bg={backgroundContent}
            justify={hideLinks ? 'center' : 'space-between'}>

            {/* logo link */}
            {showLogo && (
                <img
                    src={Environment.getAssetUrl('/images/logo.svg')}
                    style={{
                        width: isMinimalMode ? '80px' : '150px',
                        height: isMinimalMode ? '50px' : '50px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                    }}
                    alt=""
                    onClick={() => navigate2(applicationRoutes.homeRoute)} />
            )}

            {/* menu items */}
            {!hideLinks && <>

                {/* minimal */}
                {isMinimalMode && <MinimalRender />}

                {/* mid  */}
                {!isMinimalMode && isMidMode && <MidRender />}

                {/* large */}
                {!isMinimalMode && !isMidMode && <LargeRender />}

                {/* shop and notification buttons */}
                <ShopAndNotifications
                    isLowHeight={isLowHeight}
                    isMinimalMode={isMinimalMode} />
            </>}
        </EpistoFlex2 >
    );
};