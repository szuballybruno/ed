import React from "react";
import { NavLink } from "react-router-dom";
import { getStaticAssetUrl, useIsDesktopView } from "../../../../frontendHelpers";
import { useCurrentCourseItemCode } from "../../../../services/dataService";
import { FlexFloat } from "../../FlexFloat";
import classes from "./navbar.module.scss";
import DesktopNavbar from "./navbar_components/DesktopNavbar";

export type MenuItemType = {
    menuName: string;
    menuPath: string;
};

export type MenuItemsType = {
    middleMenu: MenuItemType[],
    lastItem: MenuItemType
};

const Navbar = (props: { hideLinks?: boolean }) => {

    const isDesktop = useIsDesktopView();
    const currentCourseItemCode = useCurrentCourseItemCode();

    console.log("Code: " + currentCourseItemCode);

    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar
        currentCourseItemCode={currentCourseItemCode}
        menuItems={menuItems}
        hideLinks={!!props.hideLinks} />;

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
            {/* <MobileDropdown menuItems={menuItems} showHighlightedButton={props.showHighlightedButton} /> */}
        </div>
    }

    return <FlexFloat id="navbarRoot" height={isDesktop ? "80px" : "60px"} zIndex={2} >
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </FlexFloat>
}

export default Navbar;

const menuItems = {
    middleMenu: [
        {
            menuName: "Kezdőlap",
            menuPath: "/kezdolap"
        },
        {
            menuName: "Tanfolyamkereső",
            menuPath: "/kurzusok"
        },
        {
            menuName: "Profilom",
            menuPath: "/profilom"
        },
        {
            menuName: "Adminisztráció",
            menuPath: "/admin"
        }
    ],
    lastItem: {
        menuName: "Nincs kiválasztott kurzus",
        menuPath: "/cybersecurity-kurzus"
    }
} as MenuItemsType;
