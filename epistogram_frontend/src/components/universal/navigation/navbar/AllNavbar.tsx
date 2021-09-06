import { Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { globalConfig } from "../../../../configuration/config";
import { getStaticAssetUrl, useIsDesktopView } from "../../../../frontendHelpers";
import { FlexFloat } from "../../FlexFloat";
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

    const isDesktop = useIsDesktopView();

    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar {...props} />;

    // render mobile
    const renderMobileNavbar = () => {
        return <div className={classes.mobileNavbarOuterWrapperOut}>

            {/* navbar */}
            <div className={classes.mobileNavbarOuterWrapperIn}>
                <NavLink to={'/kezdolap'}>
                    <div className={classes.mobileNavbarLogoWrapper}>
                        <img alt="EpistoGram Logo" src={getStaticAssetUrl("/images/logo.png")} />
                    </div>
                </NavLink>
            </div>

            {/* dropdonw */}
            <MobileDropdown menuItems={props.menuItems} showHighlightedButton={props.showHighlightedButton} />
        </div>
    }

    return <FlexFloat id="navbarRoot" height={isDesktop ? "80px" : "60px"} zIndex="1" >
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </FlexFloat>
}

export default Navbar
