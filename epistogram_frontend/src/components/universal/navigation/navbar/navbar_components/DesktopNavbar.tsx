import { Button } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { useNavigation } from "../../../../../services/navigatior";
import { MenuItemsType } from "../Navbar";
import classes from "./desktopNavbar.module.scss";
import MenuItemList from "./MenuItemList";

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    menuItems: MenuItemsType,
    hideLinks: boolean
}) => {

    const { navigateToPlayer } = useNavigation();
    const currentCourseItemCode = props.currentCourseItemCode;
    const continueWatching = () => {

        if (currentCourseItemCode)
            navigateToPlayer(currentCourseItemCode);
    }
    const homeUrl = "/";

    return (
        <div className={classes.navbarOuterWrapper}>
            <div className={`${classes.navbarButtonWrapper}`}>

                {/* logo link */}
                <NavLink to={homeUrl} className={classes.logoWrapper}>
                    <img
                        className={classes.logo}
                        alt="EpistoGram Logo"
                        src={getAssetUrl("/images/logo.png")} />
                </NavLink>

                {/* content */}
                <div
                    className={classes.navbarRightWrapper}
                    style={{
                        display: props.hideLinks ? "none" : "flex"
                    }}>

                    {/* menu items */}
                    <MenuItemList menuItems={props.menuItems.middleMenu} />

                    {/* show something new  */}
                    <Button variant={"outlined"}
                        size={"large"}
                        className={classes.showSomethingButton}
                        style={{ color: "white" }}>
                        Mutass valamit!
                    </Button>

                    {/* continue watching  */}
                    {currentCourseItemCode &&
                        <Button
                            variant={"outlined"}
                            size={"large"}
                            onClick={continueWatching}
                            className={classes.playButton}>
                            <PlayArrow />
                        </Button>}

                    <div style={{
                        width: '50px'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default DesktopNavbar;

// updateActivity("",
//     "openPage",
//     window.location.href,
//     "DesktopNavbar-Button-PlayVideo",
//     "play",
//     "generalPassive",
//     "A felhasználó megnyit egy új oldalt",
//     true,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     currentOrigin + "/watch/" + user.userData.currentCourse._id.get() + "/" + user.userData.currentItem._id.get()
// )