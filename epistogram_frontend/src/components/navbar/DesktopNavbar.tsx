import { Flex, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { EpistoButton } from '../controls/EpistoButton';
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

    const menuItems = new ArrayBuilder<Omit<ApplicationRoute, 'icon'> & { icon: ReactNode }>()
        .addIf(hasPermission('ACCESS_ADMIN'), {
            title: applicationRoutes.administrationRoute.title,
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
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
        .getArray() as ApplicationRoute[];

    const { navigateToPlayer, navigate2 } = useNavigation();

    // context
    const { isAuthenticated } = useAuthorizationContext();

    // media 
    const [isSmallerThan1180] = useMediaQuery('(min-width: 1180px)');
    const [isSmallerThan1000] = useMediaQuery('(min-width: 1000px)');

    // util 
    const hideLinks = hideLinks1 || !isAuthenticated;
    const isMidMode = (isSmallerThan1180 && !showLogo) || (isSmallerThan1000 && showLogo);

    // funcs



    const MinimalRender = () => {

        return <Flex>
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
        </Flex>;
    };

    const MidRender = () => {

        return (
            <Flex height="50px"
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
            </Flex>
        );
    };

    const LargeRender = () => {

        return (
            <Flex>
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
            </Flex>
        );
    };

    Logger.logScoped('RENDER', 'Rendering navbar');

    return (
        <Flex
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
                    // onClick={(//user?.userActivity?.canAccessApplication
                    //     ? () => navigate2(applicationRoutes.homeRoute)
                    //     : undefined}
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
        </Flex >
    );
};
