import React from "react";
import classes from "./profileWrapper.module.scss";
import profileItems from "../profile_configuration/profileItems.json"
import Learning from "./me/Learning";
import MyExams from "./MyExams";
import MyCourses from "./MyCourses";
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import ChangePassword from "./ChangePassword";
import { ContentWrapper, LeftPanel, RightPanel } from "../../../HOC/MainPanels";
import { Assignment, School, Subscriptions, ExitToApp, } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings"
import { Typography } from "@mui/material";
import Settings from "./settings/Settings";
import { logOutUserAsync } from "../../../services/authenticationService";

const ProfileWrapper = () => {
    const icons = {
        0: <School color={"secondary"} />,
        1: <Subscriptions color={"secondary"} />,
        2: <Assignment color={"secondary"} />,
        3: <SettingsIcon color={"secondary"} />,
        4: <ExitToApp color={"error"} />,
    }

    const menuLink = (index: number, route: string) => <NavLink className={classes.profileDataOption}
        exact
        to={route}
        activeClassName={classes.profileDataOptionSelected}
        key={index}>
        {icons[index]}
        <Typography
            color={"secondary"}
            className={classes.profileDataOptionItemText}
            variant={"button"}>
            {profileItems.sideMenu[index].menuName}
        </Typography>
    </NavLink>

    const menuLogoutButton = (index: number) => <NavLink className={classes.profileDataOption}
        exact
        to=""
        activeClassName={classes.profileDataOptionSelected}
        key={index}
        onClick={() => logOutUserAsync()}>
        {icons[index]}
        <Typography
            color={"secondary"}
            className={classes.profileDataOptionItemText}
            variant={"button"}>
            {profileItems.sideMenu[index].menuName}
        </Typography>
    </NavLink>

    return <ContentWrapper>
        <LeftPanel>
            <div className={classes.profileDataInnerBottomWrapper}>
                <div className={classes.profileDataOptionsWrapper}>
                    {profileItems
                        .sideMenu
                        .map((menuItem, index) => {

                            return menuLink(index, menuItem.route);
                            // return <div key={index}>
                            //     {menuItem.isLogoutButton
                            //         ? menuLogoutButton(index)
                            //         : menuLink(index, menuItem.route as any as string)}
                            // </div>
                        })}
                </div>
            </div>
        </LeftPanel>
        <RightPanel>
            <Switch>
                <Route exact path={'/profilom'}>
                    <Redirect to={'/profilom/tanulas'} />
                </Route>
                <Route path={'/profilom/tanulas'}>
                    <Learning />
                </Route>
                <Route path={'/profilom/kurzusaim'}>
                    <MyCourses />
                </Route>
                <Route path={'/profilom/vizsgaim'}>
                    <MyExams />
                </Route>
                <Route path={'/profilom/beallitasok/jelszo'}>
                    <ChangePassword />
                </Route>
                <Route path={'/profilom/beallitasok'}>
                    <Settings />
                </Route>
            </Switch>
        </RightPanel>
    </ContentWrapper>
};
export default ProfileWrapper
