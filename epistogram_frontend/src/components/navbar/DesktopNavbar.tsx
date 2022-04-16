import { Flex, useMediaQuery } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { loggingSettings } from '../../static/Environemnt';
import { getAssetUrl, getUrl } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { CurrentUserContext } from '../system/AuthenticationFrame';
import { NavbarButton } from '../universal/NavbarButton';
import { ShopAndNotifications } from './ShopAndNotifications';

const menuItems = [
    applicationRoutes.homeRoute,
    applicationRoutes.availableCoursesRoute,
    applicationRoutes.learningRoute,
] as ApplicationRoute[];

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

    const { navigateToPlayer, navigate } = useNavigation();
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    // context
    const user = useContext(CurrentUserContext);

    // media 
    const [isSmallerThan1180] = useMediaQuery('(min-width: 1180px)');
    const [isSmallerThan1000] = useMediaQuery('(min-width: 1000px)');

    // util 
    const hideLinks = props.hideLinks || !user;
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
                            src={getAssetUrl(
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

    if (loggingSettings.render)
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
                    src={getAssetUrl('/images/logo.svg')}
                    style={{
                        width: isMinimalMode ? '80px' : '150px',
                        height: isMinimalMode ? '50px' : '50px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                    }}
                    alt=""
                    onClick={user?.userActivity?.canAccessApplication
                        ? () => navigate(applicationRoutes.homeRoute)
                        : undefined} />
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
