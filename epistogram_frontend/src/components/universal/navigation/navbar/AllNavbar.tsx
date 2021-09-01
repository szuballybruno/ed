import { Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { globalConfig } from "../../../../configuration/config";
import { useIsDesktopView } from "../../../../frontendHelpers";
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
        return <div className={classes.mobileNavbarOuterWrapperOut}>
            <MobileNavbar />
            <MobileDropdown menuItems={props.menuItems} showHighlightedButton={props.showHighlightedButton} />
        </div>
    }

    return <Box height={isDesktop ? "80px" : "60px"} >
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </Box>
}

export default Navbar
