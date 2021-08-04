import React, {useEffect} from 'react';
import classes from './adminDashboard.module.scss'
import ReactImageFallback from "react-image-fallback";
import avatar from "../user/player_main/img/avatar-placeholder.png";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import userSideState from "../../globalStates/userSideState";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../globalStates/applicationRunningState";
import ManageUsers from "./manageUsers/ManageUsers";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import ManageVideos from "./manageVideos/ManageVideos";
import {config} from "../../configuration/config";
import AdminDashboardMenuItem from "./universal/adminDashboardMenuItem/AdminDashboardMenuItem";
import Statistics from "./statistics/Statistics";

const AdminDashboard = (props: { match: { url: string; }; }) => {
    const user = useState(userSideState)
    const app = useState(applicationRunningState)

    return (
        <div className={classes.dashBoardMainContainer}>
            <div className={classes.adminDashboardWrapper}>
                <AdminNavbar />
                <div className={classes.adminDashboardOuterWrapper}>
                    <div className={classes.adminDashboardInnerWrapper}>
                        <div className={classes.adminDashboardLeftWrapper}>
                            <div className={classes.adminDashboardLeftItemProfile}>
                                <div className={classes.leftItemProfileTopWrapper} />
                                <div className={classes.leftItemProfileBottomWrapper}>
                                    <div className={classes.profileImageWrapper}>
                                        <ReactImageFallback alt="avatar"
                                                            fallbackImage={avatar}
                                                            src={`https://itsfourothree.hu/uploads/users/${localStorage.getItem("userId")}/avatar.${"jpg" || "png"}`}/>
                                    </div>
                                    <div className={classes.profileNameWrapper}>
                                        <p>{user.userData.lastName.get() + " " + user.userData.firstName.get()}</p>
                                    </div>
                                    <div className={classes.profileRoleWrapper}>
                                        <p>{user.userData.role.get() || "Admin"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.adminDashboardLeftItemMenuItems}>
                                {config.adminMenuItems.map((item,index) => {
                                    return <NavLink className={classes.adminDashboardMenuItem}
                                                    style={{textDecoration: "none"}}
                                                    to={props.match.url + "/" + item.itemName}
                                                    activeClassName={classes.adminDashboardMenuItemSelected}
                                                    key={index}>
                                        <AdminDashboardMenuItem itemTitle={item.itemTitle}
                                                                itemName={item.itemName as "manageUsers" | "manageVideos" | "manageVotes" | "normalStats"}/>
                                    </NavLink>
                                })}
                            </div>
                        </div>
                        <div className={classes.adminDashboardRightWrapper}>
                            <div className={classes.adminDashboardRightItemWrapper}>
                                <Switch>
                                    <Route exact path={'/admin'}>
                                        <Redirect to={'/admin/normalStats'} />
                                    </Route>
                                    <Route path={'/admin/normalStats'}>
                                        <Statistics />
                                    </Route>
                                    <Route path={'/admin/manageUsers'}>
                                        <ManageUsers />
                                    </Route>
                                    <Route path={'/admin/manageVideos'}>
                                        <ManageVideos />
                                    </Route>
                                    <Route path={'/admin/manageVotes'}>
                                        <div>ManageVotes</div>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
