import React from "react";
import classes from "./profileWrapper.module.scss";
import profileItems from "../profile_configuration/profileItems.json"
import Learning from "./me/Learning";
import MyExams from "./MyExams";
import MyCourses from "./MyCourses";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'
import ChangePassword from "./ChangePassword";
import {ContentWrapper, LeftPanel, RightPanel} from "../../../HOC/mainPanels/MainPanels";
import {
    Assignment,
    School,
    Subscriptions, ExitToApp,
} from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings"
import {Typography} from "@material-ui/core";
import Settings from "./settings/Settings";


const ProfileWrapper = () => {
    const icons = {
        0: <School color={"secondary"} />,
        1: <Subscriptions color={"secondary"} />,
        2: <Assignment color={"secondary"} />,
        3: <SettingsIcon color={"secondary"} />,
        4: <ExitToApp color={"error"} />,
    }

    return <ContentWrapper>
        <LeftPanel>
            <div className={classes.profileDataInnerBottomWrapper}>
                <div className={classes.profileDataOptionsWrapper}>
                    {profileItems.sideMenu.map((menuItem, index) => {
                        return <NavLink className={classes.profileDataOption}
                                        exact
                                        to={menuItem.route}
                                        activeClassName={classes.profileDataOptionSelected}
                                        key={index}>
                            {icons[index]}
                            <Typography color={"secondary"} className={classes.profileDataOptionItemText} variant={"button"}>{profileItems.sideMenu[index].menuName}</Typography>
                        </NavLink>
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
