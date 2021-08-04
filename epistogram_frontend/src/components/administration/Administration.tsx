import React from 'react';
import classes from './administration.module.scss'
import userSideState from "../../store/user/userSideState";
import {useState} from "@hookstate/core";
import {Users} from "./users/Users";
import {Redirect, Route, Switch} from "react-router-dom";
import Courses from "./courses/Courses";
import {config} from "../../configuration/config";
import AdminDashboardMenuItem from "./universal/adminDashboardMenuItem/AdminDashboardMenuItem";
import Statistics from "./statistics/Statistics";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import {ManageArticles} from "./articles/ManageArticles";
import {Votes} from "./votes/Votes";
import {Groups} from "./groups/Groups";
import {Organizations} from "./organizations/Organizations";
import {
    Chip,
    Divider,
    Typography
} from "@material-ui/core";
import {ContentWrapper, LeftPanel, MainWrapper, RightPanel} from "../../HOC/mainPanels/MainPanels";
import menuItems from "../../configuration/menuItems.json";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import applicationRunningState from "../../store/application/applicationRunningState";
import {AdminAddHeader} from "./universal/adminAddHeader/AdminAddHeader";

const Administration = (props: { match: { url: string; }; }) => {
    const user = useState(userSideState)

    return <MainWrapper>
        <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true} showNavigation={true}/>
        <ContentWrapper>
            <LeftPanel>
                <div className={classes.adminDashboardLeftItemProfile}>
                    <div className={classes.leftItemProfileTopWrapper} />
                    <div className={classes.leftItemProfileBottomWrapper}>
                        <div className={classes.profileImageWrapper}>
                            <ProfileImage />
                        </div>
                        <div className={classes.profileNameWrapper}>
                            <Typography variant={"h5"}>{user.userData.lastName.get() + " " + user.userData.firstName.get()}</Typography>
                        </div>
                        <div  className={classes.profileRoleWrapper}>
                            <Chip label={user.userData.role.get()} />
                        </div>
                        <Divider style={{zIndex: 999, marginTop: 20}} />
                    </div>

                </div>
                <div className={classes.adminDashboardLeftItemMenuItems}>
                    {config.adminMenuItems.map((item,index) => {
                        return <AdminDashboardMenuItem title={item.title}
                                                       index={index}
                                                       key={index}
                                                       url={props.match.url + item.path} />
                    })}
                </div>
            </LeftPanel>
            <RightPanel>
                <AdminAddHeader />
                <Switch>
                    <Route exact path={'/admin'}>
                        <Redirect to={'/admin/statistics'} />
                    </Route>
                    <Route path={'/admin/statistics'}>
                        <Statistics />
                    </Route>
                    <Route path={'/admin/manage/users'}>
                        <Users />
                    </Route>
                    <Route path={'/admin/manage/courses'}>
                        <Courses />
                    </Route>
                    <Route path={'/admin/manage/articles'}>
                        <ManageArticles />
                    </Route>
                    <Route path={'/admin/manage/votes'}>
                        <Votes />
                    </Route>
                    <Route path={'/admin/manage/groups'}>
                        <Groups />
                    </Route>
                    <Route path={'/admin/manage/organizations'}>
                        <Organizations />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default Administration;
