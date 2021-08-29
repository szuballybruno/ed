import React, { useEffect } from "react";
import classes from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "@hookstate/core";

// @ts-ignore
import applicationRunningState from "../../../../store/application/applicationRunningState";

import { globalConfig } from "../../../../configuration/config";
import DesktopNavbar from "./navbar_components/DesktopNavbar";
import MobileDropdown from "./navbar_components/MobileDropdown";
import { Box } from "@chakra-ui/react";

interface NavbarIF {
    desktopClassName?: string;
    homeUrl?: string;
    menuItems: {
        middleMenu: {
            menuName: string;
            menuPath: string
        }[];
        lastItem: {
            menuName: string;
            menuPath: string
        };
    };
    selectedPage?: number;
    showHighlightedButton?: boolean;
    showLastButton?: boolean;
    showNavigation?: boolean;
    showSwitchButton?: boolean;
    style?: React.CSSProperties | undefined
}

const Navbar = (props: NavbarIF) => {

    const logoUrl = globalConfig.assetStorageUrl + "/application/logo.png"
    const app = useState(applicationRunningState)
    const isMobile = useState(0)

    useEffect(() => {
        isMobile.set(window.innerWidth)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Figyeli a jelenlegi ablak szélességet
    useEffect(() => {
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    })

    // Frissíti a jelenlegi ablak szélességet
    const updateWidth = () => {
        isMobile.set(window.innerWidth)
    }

    const MobileNavbar = () => <div className={classes.mobileNavbarOuterWrapperIn}>
        <NavLink to={'/kezdolap'}>
            <div className={classes.mobileNavbarLogoWrapper}>
                <img alt="EpistoGram Logo" src={logoUrl} />
            </div>
        </NavLink>
    </div>

    //console.log(JSON.stringify(user.get()))

    const isDesktop = isMobile.get() > 992;

    const renderDesktopNavbar = () => <DesktopNavbar {...props} />;

    const renderMobileNavbar = () => {
        return app.hamburgerButtonState.get()
            ? <div className={classes.mobileNavbarOuterWrapperOut}>
                <MobileNavbar />
                <MobileDropdown menuItems={props.menuItems} showHighlightedButton={props.showHighlightedButton} />
            </div>
            : <MobileNavbar />
    }

    return <Box height={isDesktop ? "80px" : "60px"} transition="0.6s">
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </Box>
}

export default Navbar
