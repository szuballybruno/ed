import { Button } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from 'react';
import { NavLink } from "react-router-dom";
import { getStaticAssetUrl } from "../../../../../frontendHelpers";
import { MenuItemsType } from "../Navbar";
import classes from "./desktopNavbar.module.scss";
import MenuItemList from "./MenuItemList";

const DesktopNavbar = (props: { menuItems: MenuItemsType, hideLinks: boolean }) => {

    const currentVideoWatchUrl = ""; // "/watch/" + user.userData.currentCourse._id.get() + "/" + user.userData.currentItem._id.get()
    const homeUrl = "";

    return (
        <div className={classes.navbarOuterWrapper}>
            <div className={`${classes.navbarButtonWrapper}`}>

                {/* logo link */}
                <NavLink to={homeUrl} className={classes.logoWrapper}>
                    <img
                        className={classes.logo}
                        alt="EpistoGram Logo"
                        src={getStaticAssetUrl("/images/logo.png")} />
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
                        style={{ color: "white" }}
                        onClick={() => {
                            // app.modalState.set(true)
                        }}>
                        Mutass valamit!
                    </Button>

                    {/* continue watching  */}
                    <NavLink to={currentVideoWatchUrl}>
                        <Button
                            variant={"outlined"}
                            size={"large"}
                            onClick={() => {

                            }}
                            className={classes.playButton}>
                            <PlayArrow />
                        </Button>
                    </NavLink>

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