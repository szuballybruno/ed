import React, {useEffect} from "react";
import classes from "./navbar.module.scss";
import {NavLink} from "react-router-dom";
import {useState} from "@hookstate/core";

// @ts-ignore
import Burger from "@animated-burgers/burger-arrow";
import {config} from "../../../configuration/config"
import NavbarButton from "../navbar/NavbarButton";
import '@animated-burgers/burger-arrow/dist/styles.css'
import applicationRunningState from "../../../globalStates/applicationRunningState";
import userSideState from "../../../globalStates/userSideState";

interface NavbarIF  {
    selectedPage?: number;
    showHighlightedButton?: boolean;
    menuItems: {
        middleMenu:  [{
            menuName: string;
            menuPath: string
        }];
        lastItem: {
            menuName: string;
            menuPath: string
        };
    };
    showLastButton: boolean;
    showSwitchButton?: boolean;
    style: React.CSSProperties | undefined
}

const Navbar = (props: NavbarIF) => {
    const logoUrl = config.assetStorageUrl + "/themes/normaltheme/navbar/logo.png"
    const app = useState(applicationRunningState)
    const user = useState(userSideState)
    const isMobile = useState(0)

    useEffect(() => {
        isMobile.set(window.innerWidth)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Figyeli a jelenlegi ablak szélességet
    useEffect(() => {
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    })

    // Frissíti a jelenlegi ablak szélességet
    const updateWidth = () => {
        isMobile.set(window.innerWidth)
    }

    const NBShowSomethingButton = (props: {show?: boolean}) => {
        return props.show ?
            <button onClick={() => {app.modalState.set(true)}}>
                Mutass valamit!
            </button> : null
    }

    const NBMenuItemList = (props: {
        menuItems: {
            menuName: string,
            menuPath: string
        }[]
    }) => {
        return <div className={classes.navbarNavLinksWrapper}>
            {props.menuItems.map((item, index) => {
                return <NavbarButton activeClassName={classes.fos}
                                     key={index}
                                     index={index}
                                     menuName={item.menuName}
                                     menuPath={item.menuPath} />
            })}
        </div>
    }

    //console.log(JSON.stringify(user.get()))

    return isMobile.get() > 992 ? <div style={props.style} className={classes.navbarOuterWrapper}>
        <div className={classes.navbarButtonWrapper}>
            <NBShowSomethingButton show={props.showHighlightedButton} />
            <NBMenuItemList menuItems={props.menuItems.middleMenu} />


            <NavLink to={'/kezdolap'}>
                <div className={classes.logoWrapper}>
                    <img className={classes.logo} alt="EpistoGram Logo" src={logoUrl}/>
                </div>
            </NavLink>

            {props.showLastButton ?
                <NavbarButton className={classes.lastItem}
                              key={4} index={4}
                              menuName={user.userData.currentCourse.name.get() ? user.userData.currentCourse.name.get()  : props.menuItems.lastItem.menuName}
                              menuPath={user.userData.currentCourse.name.get() ? '/cybersecurity-kurzus' : '/kurzusok'}
                              showImage={true}/>
             : null}

            {props.showSwitchButton ?
                <div className={classes.switchButton} onClick={() => {
                    if (localStorage.getItem('role') === 'admin') {
                        localStorage.removeItem('role');
                        localStorage.setItem('role','user')
                    } else {
                        localStorage.removeItem('role');
                        localStorage.setItem('role', 'admin');
                    }
                }} /> : null}
        </div>
    </div> : app.hamburgerButtonState.get() ? <div className={classes.mobileNavbarOuterWrapperOut}>
        <div className={classes.mobileNavbarOuterWrapperIn}>
            <NavLink to={'/kezdolap'}>
                <div className={classes.mobileNavbarLogoWrapper}>
                    <img alt="EpistoGram Logo" src={logoUrl}/>
                </div>
            </NavLink>
            <Burger className={classes.hamburgerButtonke} isOpen={app.hamburgerButtonState.get()} onClick={() => {app.hamburgerButtonState.get() === false ? app.hamburgerButtonState.set(true) : app.hamburgerButtonState.set(false)}} direction={"down"} />
        </div>
        <div className={classes.mobileNavbarInnerWrapper}>
            {props.showHighlightedButton ?
                <button onClick={() => {app.hamburgerButtonState.set(true)}}>Mutass valamit!</button>
                : null}
            <div className={classes.mobileNavbarNavLinksWrapper}>
                {props.menuItems.middleMenu.map((item, index) => {
                    return <NavbarButton key={index}
                                         index={index}
                                         menuName={item.menuName}
                                         menuPath={item.menuPath} />
                })}
                <NavbarButton className={classes.mobileLastItem}
                              key={4}
                              index={4}
                              menuName={props.menuItems.lastItem.menuName}
                              menuPath={props.menuItems.lastItem.menuPath} />
            </div>
        </div>
    </div> : <div className={classes.mobileNavbarOuterWrapperIn}>
        <NavLink to={'/kezdolap'}>
            <div className={classes.mobileNavbarLogoWrapper}>
                <img alt="EpistoGram Logo" src={logoUrl}/>
            </div>
        </NavLink>
        <Burger className={classes.hamburgerButtonke} isOpen={app.hamburgerButtonState.get()} onClick={() => {app.hamburgerButtonState.get() === false ? app.hamburgerButtonState.set(true) : app.hamburgerButtonState.set(false)}} direction={"down"} />
    </div>
}

export default Navbar