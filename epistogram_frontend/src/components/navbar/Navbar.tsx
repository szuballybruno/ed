import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useCurrentCourseItemCode } from '../../services/api/miscApiService';
import { Environment } from '../../static/Environemnt';
import { useIsDesktopView } from '../../static/frontendHelpers';
import { FlexFloat } from '../controls/FlexFloat';
import { DesktopNavbar } from './DesktopNavbar';
import classes from './navbar.module.scss';

const Navbar = memo((props: {
    hideLinks?: boolean,
    showLogo?: boolean,
    isLowHeight?: boolean,
    isMinimalMode?: boolean,
    backgroundContent?: any
}) => {

    const { backgroundContent, hideLinks, isLowHeight, isMinimalMode, showLogo } = props;
    const isDesktop = useIsDesktopView();
    const currentCourseItemCode = useCurrentCourseItemCode();

    console.log(currentCourseItemCode.currentCourseItemCode);

    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar
        backgroundContent={backgroundContent}
        currentCourseItemCode={currentCourseItemCode?.currentCourseItemCode}
        hideLinks={!!hideLinks}
        isLowHeight={isLowHeight}
        isMinimalMode={isMinimalMode}
        showLogo={showLogo} />;

    // render mobile
    const renderMobileNavbar = () => {
        return <div
            className={classes.mobileNavbarOuterWrapperOut}>

            {/* navbar */}
            <div
                className={classes.mobileNavbarOuterWrapperIn}>

                <NavLink
                    to={applicationRoutes.homeRoute.route.getAbsolutePath()}>

                    <div
                        className={classes.mobileNavbarLogoWrapper}>

                        <img
                            alt="EpistoGram Logo"
                            src={Environment.getAssetUrl('/images/logo.svg')} />
                    </div>
                </NavLink>
            </div>
        </div>;
    };

    return <FlexFloat
        id="flexFloat-navbarRoot"
        zIndex={3}
        justify="center"
        width="100%"
        boxShadow="none"
        borderRadius={0}
        bgColor="unset"
        padding={isLowHeight ? '20px 0 20px 0' : '20px 20px 20px 20px'}>

        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </FlexFloat>;
}, (p, n) => {

    return JSON.stringify(p) === JSON.stringify(n);
});

export default Navbar;
