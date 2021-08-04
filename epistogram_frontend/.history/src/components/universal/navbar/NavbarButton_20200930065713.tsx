import classes from "./navbar.module.scss";
import {useState} from "@hookstate/core";
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import applicationRunningState from "../../../globalStates/applicationRunningState";
import playButton from './play-button.svg'


const NavbarButton = (props: {
        className?: string,
        activeClassName?: string,
        key: number,
        index: number,
        menuItems?: {
            middleMenu:  [{
                menuName: string;
                menuPath: string | null
            }];
            lastItem: {
                menuName: string;
                menuPath: string
            };
        };
        menuName?: string,
        menuPath: string | null
        showImage?: boolean
    }) => {

    const app = useState(applicationRunningState)

    useEffect(() => {
        app.selectedPage.set(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return props.menuPath ?
        <NavLink activeClassName={props.activeClassName} to={props.menuPath} onClick={() => {
            app.hamburgerButtonState.set(false)
        }}>
            <div className={props.className ? props.className : classes.navbarButton} >
                {props.showImage && <img alt={"Play button"} src={playButton} />}
                <p className={app.hamburgerButtonState.get() !== false ? '' : 'classes.displayNone'}>{props.menuName}</p>
            </div>
        </NavLink> :
        <div className={app.selectedPage.get() === props.index ? props.activeClassName : undefined}>
            <div className={props.className ? props.className : classes.navbarButton}>
                <p className={app.hamburgerButtonState.get() !== false ? '' : 'classes.displayNone'} onClick={() => {
                    app.selectedPage.set(props.index);
                    app.hamburgerButtonState.set(false)
                }}>
                    {props.menuName}
                </p>
            </div>
        </div>
}

export default NavbarButton
