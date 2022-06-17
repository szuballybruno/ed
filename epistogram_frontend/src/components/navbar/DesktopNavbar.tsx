import { Flex, useMediaQuery } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { AuthorizationContext } from '../system/AuthenticationFrame';
import { NavbarButton } from '../universal/NavbarButton';
import { ShopAndNotifications } from './ShopAndNotifications';

export const DesktopNavbar = (props: {
    currentCourseItemCode: string | null
    hideLinks: boolean
    isLowHeight?: boolean
    showLogo?: boolean
    isMinimalMode?: boolean
    backgroundContent?: any
}) => {

    const {
        backgroundContent,
        showLogo,
        currentCourseItemCode,
        isLowHeight: _isLowHeight,
        isMinimalMode: _isMinimalMode,
    } = props;

    const isLowHeight = !!_isLowHeight;
    const isMinimalMode = !!_isMinimalMode;

    const { hasPermission } = useContext(AuthorizationContext)!;

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .addIf(hasPermission('ACCESS_ADMIN'), {
            title: applicationRoutes.administrationRoute.title,
            route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route
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
        .getArray();

    const { navigateToPlayer, navigate } = useNavigation();
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    // context
    const { isAuthenticated } = useContext(AuthorizationContext);

    // media 
    const [isSmallerThan1180] = useMediaQuery('(min-width: 1180px)');
    const [isSmallerThan1000] = useMediaQuery('(min-width: 1000px)');

    // util 
    const hideLinks = props.hideLinks || !isAuthenticated;
    const isMidMode = (isSmallerThan1180 && !showLogo) || (isSmallerThan1000 && showLogo);

    // funcs

    const ContinueCourseButton = (props: {
        title?: string
    }) => {

        const { title } = props;

        return <>
            {currentCourseItemCode && (

                <EpistoButton
                    className="mildShadow"
                    style={{
                        color: '--epistoTeal',
                        background:
                            'var(--transparentWhite70)',
                        border: 'none',
                    }}
                    variant="outlined"
                    onClick={() => continueCourse()}
                    icon={
                        <img
                            alt=""
                            src={Environment.getAssetUrl(
                                '/icons/play2.svg'
                            )}
                            style={{
                                width: '25px',
                                height: '25px',
                            }}
                        />}>

                    <EpistoFont
                        style={{
                            margin: '0 0 0 5px'
                        }}
                        isUppercase>

                        {title}
                    </EpistoFont>
                </EpistoButton>
            )}
        </>;
    };

    const MinimalRender = () => {

        return <Flex>
            {menuItems
                .map((route, index) => {
                    return (
                        <EpistoButton
                            variant="plain"
                            key={index}
                            onClick={() => navigate(route)}>

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

                {menuItems
                    .map((route, index) => (
                        <NavbarButton
                            key={index}
                            menuName={route.title}
                            onClick={() => navigate(route)} />
                    ))}

                {/* continue watching with or without text  */}
                <ContinueCourseButton
                    title={translatableTexts.navbar.currentCourse} />
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
                                    navigate(route);
                                }}>

                                {route.icon}
                            </EpistoButton>
                        );
                    })}

                {/* continue watching  */}
                <ContinueCourseButton />
            </Flex>
        );
    };

    if (Environment.loggingSettings.render)
        console.log('Rendering navbar');

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
                    //     ? () => navigate(applicationRoutes.homeRoute)
                    //     : undefined}
                    onClick={() => navigate(applicationRoutes.homeRoute)} />
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
