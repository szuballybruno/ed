import { Chip, Divider, Typography } from "@mui/material";
import React, { useContext } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { globalConfig } from "../../configuration/config";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import Navbar from "../universal/navigation/navbar/Navbar";
import { AministrationSubpageHeader } from "./universal/adminAddHeader/AministrationSubpageHeader";
import AdminDashboardMenuItem from "./universal/adminDashboardMenuItem/AdminDashboardMenuItem";
import classes from './users/userList/administration.module.scss';
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import AminStatistics from "./statistics/AminStatistics";
import AddUser from "./users/addUser/AddUser";
import { UserAdministrationPage } from "./users/userList/UserAdministrationPage";
import { CourseList } from "./courses/courseList/CourseList";
import { AddCourse } from "./courses/addCourse/AddCourse";
import { EditCourse } from "./courses/editCourse/EditCourse";
import { AddVideo } from "./courses/addVideo/AddVideo";
import { EditVideo } from "./courses/editVideo/EditVideo";

const AdministrationPage = (props: { match: { url: string; } }) => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext);

    return <MainWrapper>
        <Navbar />
        <ContentWrapper>
            <LeftPanel>
                <div className={classes.adminDashboardLeftItemProfile}>
                    <div className={classes.leftItemProfileTopWrapper} />
                    <div className={classes.leftItemProfileBottomWrapper}>
                        <div className={classes.profileImageWrapper}>
                            <ProfileImage imageUrl={user?.avatarUrl ? user?.avatarUrl : ""} />
                        </div>
                        <div className={classes.profileNameWrapper}>
                            <Typography variant={"h5"}>{user?.name}</Typography>
                        </div>
                        <div className={classes.profileRoleWrapper}>
                            <Chip label={user?.role} />
                        </div>
                        <Divider style={{ zIndex: 999, marginTop: 20 }} />
                    </div>

                </div>
                <div className={classes.adminDashboardLeftItemMenuItems}>
                    {globalConfig.adminMenuItems.map((item, index) => {
                        return <AdminDashboardMenuItem title={item.title}
                            index={index}
                            key={index}
                            url={props.match.url + item.path} />
                    })}
                </div>
            </LeftPanel>
            <RightPanel noPadding bg="white">

                {/* admin header */}
                <AministrationSubpageHeader />

                {/* admin subpages */}
                <Switch>

                    {/* statistics */}
                    <Route exact path={'/admin'}>
                        <Redirect to={'/admin/statistics'} />
                    </Route>

                    {/* statistics */}
                    <Route path={'/admin/statistics'}>
                        <AminStatistics />
                    </Route>

                    {/* user administration */}
                    <Route path={'/admin/manage/users'}>
                        <Switch>
                            <Route exact path={'/admin/manage/users'}>
                                <UserAdministrationPage />
                            </Route>
                            <Route path={'/admin/manage/users/add'}>
                                <AddUser />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <Route path={'/admin/manage/courses'}>
                        <Switch>
                            <Route exact path={"/admin/manage/courses"}>
                                <CourseList />
                            </Route>
                            <Route path={"/admin/manage/courses/add"}>
                                <AddCourse />
                            </Route>
                            <Route path={"/admin/manage/courses/:courseId"} exact>
                                <EditCourse />
                            </Route>
                            <Route path={"/admin/manage/courses/:courseId/item/add"} exact>
                                <AddVideo />
                            </Route>
                            <Route path={`/admin/manage/courses/:courseId/item/:itemId`}>
                                <EditVideo />
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(AdministrationPage);
