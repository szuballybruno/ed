import React from "react";
import { NavLink } from "react-router-dom";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useCurrentCourseItemCode } from "../../services/api/miscApiService";
import { getAssetUrl, useIsDesktopView } from "../../static/frontendHelpers";
import { FlexFloat } from "../universal/FlexFloat";
import DesktopNavbar from "./DesktopNavbar";
import classes from "./navbar.module.scss";

const Navbar = (props: { hideLinks?: boolean, showLogo?: boolean }) => {

    const isDesktop = useIsDesktopView();
    const currentCourseItemCode = useCurrentCourseItemCode();

    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar
        currentCourseItemCode={currentCourseItemCode?.currentCourseItemCode}
        hideLinks={!!props.hideLinks}
        showLogo={props.showLogo} />;

    // render mobile
    const renderMobileNavbar = () => {
        return <div className={classes.mobileNavbarOuterWrapperOut}>

            {/* navbar */}
            <div className={classes.mobileNavbarOuterWrapperIn}>
                <NavLink to={applicationRoutes.homeRoute.route}>
                    <div className={classes.mobileNavbarLogoWrapper}>
                        <img alt="EpistoGram Logo" src={getAssetUrl("/images/logo.svg")} />
                    </div>
                </NavLink>
            </div>
        </div>
    }

    return <FlexFloat
        id="flexFloat-navbarRoot"
        zIndex={3}
        justify="center"
        w="100%"
        boxShadow="none"
        borderRadius={0}
        bgColor="unset"
        p="20px"
    >

        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </FlexFloat>
}

export default Navbar;
