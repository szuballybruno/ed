import { Box } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { globalConfig } from "../../../../configuration/config";
import { useIsDesktopView } from "../../../../frontendHelpers";
// @ts-ignore
import applicationRunningState from "../../../../store/application/applicationRunningState";
import classes from "./navbar.module.scss";
import DesktopNavbar from "./navbar_components/DesktopNavbar";
import MobileDropdown from "./navbar_components/MobileDropdown";



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

    const MobileNavbar = () => <div className={classes.mobileNavbarOuterWrapperIn}>
        <NavLink to={'/kezdolap'}>
            <div className={classes.mobileNavbarLogoWrapper}>
                <img alt="EpistoGram Logo" src={logoUrl} />
            </div>
        </NavLink>
    </div>

    //console.log(JSON.stringify(user.get()))

    const isDesktop = useIsDesktopView();

    const renderDesktopNavbar = () => <DesktopNavbar {...props} />;

    const renderMobileNavbar = () => {
        return app.hamburgerButtonState.get()
            ? <div className={classes.mobileNavbarOuterWrapperOut}>
                <MobileNavbar />
                <MobileDropdown menuItems={props.menuItems} showHighlightedButton={props.showHighlightedButton} />
            </div>
            : <MobileNavbar />
    }

    return <Box height={isDesktop ? "80px" : "60px"} >
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </Box>
}

export default Navbar
