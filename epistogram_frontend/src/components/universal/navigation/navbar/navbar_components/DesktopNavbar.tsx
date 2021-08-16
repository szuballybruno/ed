import React from 'react';
import classes from "./desktopNavbar.module.scss";
import {NavLink} from "react-router-dom";
import {globalConfig} from "../../../../../configuration/config";
import MenuItemList from "./MenuItemList";
import {Button} from "@material-ui/core";
import {PlayArrow} from "@material-ui/icons";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import userDetailsState from "../../../../../store/user/userSideState";
import {updateActivity} from "../../../../../services/updateActivity";

const DesktopNavbar = (props: {
    desktopClassName?: string
    homeUrl?: string
    menuItems: {
        middleMenu:  {
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
    const app = useState(applicationRunningState)
    const user = useState(userDetailsState)

    const logoUrl = globalConfig.assetStorageUrl + "/application/logo.png"

    return (
        <div style={props.style} className={classes.navbarOuterWrapper}>
            <div className={`${classes.navbarButtonWrapper} ${props.desktopClassName}` }>

                <NavLink to={props.homeUrl || ""} className={classes.logoWrapper}>
                    <img className={classes.logo} alt="EpistoGram Logo" src={logoUrl}/>
                </NavLink>
                {props.showNavigation ? <div className={classes.navbarRightWrapper}>
                    <MenuItemList menuItems={props.menuItems.middleMenu} />
                    {props.showHighlightedButton ? <Button variant={"outlined"}
                                                           size={"large"}
                                                           className={classes.showSomethingButton}
                                                           onClick={() => {
                                                               app.modalState.set(true)
                                                           }}>
                        Mutass valamit!
                    </Button> : null}
                    <NavLink to={"/watch/"+user.userData.currentCourse._id.get()+"/"+user.userData.currentItem._id.get()}>
                        <Button variant={"outlined"}
                                size={"large"}
                                onClick={() => {
                                    updateActivity("",
                                        "openPage",
                                        window.location.href,
                                        "DesktopNavbar-Button-PlayVideo",
                                        "play",
                                        "generalPassive",
                                        "A felhasználó megnyit egy új oldalt",
                                        true,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        globalConfig.siteUrl + "/watch/"+user.userData.currentCourse._id.get()+"/"+user.userData.currentItem._id.get()
                                    )
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
