import classes from "./navbarButton.module.scss";
import {useState} from "@hookstate/core";
import {NavLink} from "react-router-dom";
import React from "react";
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import {globalConfig} from "../../../../../configuration/config";
import {updateActivity} from "../../../../../services/updateActivity";
import {Button, Typography} from "@material-ui/core";
import { currentOrigin } from "../../../../../Environemnt";


const NavbarButton = (props: {
        className?: string,
        activeClassName?: string,
        key: number,
        index: number,
        menuName?: string,
        menuPath: string | null
        showImage?: boolean
    }) => {

    const app = useState(applicationRunningState)



    return props.menuPath ?
        <NavLink activeClassName={props.activeClassName} to={props.menuPath} onClick={() => {
            updateActivity(
                "",
                "openPage",
                window.location.href,
                "NavbarButton-Navlink-OpenPage",
                props.menuName as string,
                "generalPassive",
                "A felhasználó megnyit egy új oldalt",
                true,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                currentOrigin + props.menuPath
            )
            app.hamburgerButtonState.set(false)
        }}>
            <Button className={props.className ? props.className : classes.navbarButton && (app.hamburgerButtonState.get() !== false ? '' : 'classes.displayNone')} >
                {props.menuName}
            </Button>
        </NavLink> :
        <Button variant={"text"} className={app.hamburgerButtonState.get() !== false ? '' : 'classes.displayNone' && (app.selectedPage.get() === props.index ? props.activeClassName : undefined)} onClick={() => {
            app.selectedPage.set(props.index);
            app.hamburgerButtonState.set(false)
            updateActivity(
                "",
                "openPage",
                window.location.href,
                "NavbarButton-Navlink-OpenPage",
                props.menuName as string,
                "generalPassive",
                "A felhasználó megnyit egy új oldalt",
                true,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                currentOrigin + props.menuPath
            )
        }}>
            {props.menuName}
        </Button>
}

export default NavbarButton
