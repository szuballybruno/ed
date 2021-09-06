import { Button } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from 'react';
import { NavLink } from "react-router-dom";
import { globalConfig } from "../../../../../configuration/config";
import { getStaticAssetUrl } from "../../../../../frontendHelpers";
import classes from "./desktopNavbar.module.scss";
import MenuItemList from "./MenuItemList";

const DesktopNavbar = (props: {
    desktopClassName?: string
    homeUrl?: string
    menuItems: {
        middleMenu: {
            menuName: string;
            menuPath: string
        }[];
        lastItem: {
            menuName: string;
            menuPath: string
        };
    },
    showHighlightedButton?: boolean
    showNavigation?: boolean
    style?: React.CSSProperties | undefined,

}) => {

    const currentVideoWatchUrl = ""; // "/watch/" + user.userData.currentCourse._id.get() + "/" + user.userData.currentItem._id.get()

    return (
        <div style={props.style} className={classes.navbarOuterWrapper}>
            <div className={`${classes.navbarButtonWrapper} ${props.desktopClassName}`}>

                {/* logo link */}
                <NavLink to={props.homeUrl || ""} className={classes.logoWrapper}>
                    <img
                        className={classes.logo}
                        alt="EpistoGram Logo"
                        src={getStaticAssetUrl("/images/logo.png")} />
                </NavLink>

                {props.showNavigation ? <div className={classes.navbarRightWrapper}>
                    <MenuItemList menuItems={props.menuItems.middleMenu} />
                    {props.showHighlightedButton
                        ? <Button variant={"outlined"}
                            size={"large"}
                            className={classes.showSomethingButton}
                            onClick={() => {
                                // app.modalState.set(true)
                            }}>
                            Mutass valamit!
                        </Button>
                        : null}
                    <NavLink to={currentVideoWatchUrl}>
                        <Button variant={"outlined"}
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
                </div> : null}
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