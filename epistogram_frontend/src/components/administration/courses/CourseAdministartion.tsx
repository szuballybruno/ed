import { none, useState } from "@hookstate/core";
import { Divider, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from 'react';
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { globalConfig } from "../../../configuration/config";
import { backendUrl } from '../../../Environemnt';
import instance from "../../../services/axiosInstance";
import { useAdministratedCourses } from '../../../services/courseService';
import adminSideState from "../../../store/admin/adminSideState";
import { AdminDashboardList } from "../universal/adminDashboardList/AdminDashboardList";
import AdminDashboardSearchItem from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import { AdminDashboardWrapper } from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import UserStatistics from "../users/users_components/userStatistics/UserStatistics";
import classes from './courses.module.scss';
import { AddCourse } from './courses_components/addCourse/AddCourse';
import { AddItem } from "./courses_components/addItem/AddItem";
import { EditCourse } from "./courses_components/editCourse/EditCourse";
import { EditItemPage } from "./courses_components/editItem/EditItemPage";

const CourseAdministartion = () => {
    
    const admin = useState(adminSideState)

    const [searchText, setSearchText] = React.useState("");
    const { courses } = useAdministratedCourses(searchText);

    console.log(courses)

    return (
        <Switch>
            <Route exact path={"/admin/manage/courses"}>
                <Divider style={{
                    width: "100%"
                }} />
                <AdminDashboardWrapper>

                    {/* search */}
                    <AdminDashboardSearch
                        searchChangeHandler={x => setSearchText(x)}
                        name={"searchData"}
                        title={"kurzusok"}
                        className={classes.searchBar} />

                    {/* list */}
                    <AdminDashboardList>
                        {courses && courses
                            .map((course, index) => {
                                return <AdminDashboardSearchItem title={course.title}
                                    thumbnailUrl={course.courseId ? `${globalConfig.assetStorageUrl}/courses/${course.courseId}.png` : undefined}
                                    key={course.courseId}
                                    chips={[
                                        { label: course.category, icon: "category" },
                                        { label: course.teacherName || "Ismeretlen oktató", icon: "person" },
                                        { label: course.videosCount.toString(), icon: "video" }]
                                    }
                                    actions={[
                                        {
                                            to: `courses/${course.courseId}`,
                                            selectedComponent: "editCourse",
                                            icon: "edit",
                                            onClick: () => {

                                            }
                                        },
                                        {
                                            selectedComponent: "userStatistics",
                                            icon: "statistics",
                                            onClick: () => {

                                            }
                                        },
                                        {
                                            icon: "delete",
                                            onClick: () => {
                                                instance.delete(`${backendUrl}videos/deletevideo?videoId=${course.courseId}`).then(() => {
                                                    return admin.users[index].set(none)
                                                }).catch(e => console.error(e.toString()))
                                            }
                                        },]
                                    }
                                    userActionComponents={{
                                        editCourse: <Redirect to={`courses/${course.courseId}`} />,
                                        videoStatistics: <UserStatistics />
                                    }} />
                            })}
                    </AdminDashboardList>
                    <NavLink to={"/admin/manage/courses/add"}>
                        <Fab color="primary"
                            aria-label="add"
                            style={{ position: "absolute", bottom: 45, right: 45 }}>
                            <Add />
                        </Fab>
                    </NavLink>
                </AdminDashboardWrapper>
            </Route>
            <Route path={"/admin/manage/courses/add"}>
                <AddCourse />
            </Route>
            <Route path={"/admin/manage/courses/:courseId"} exact>
                <EditCourse />
            </Route>
            <Route path={"/admin/manage/courses/:courseId/item/add"} exact>
                <AddItem />
            </Route>
            <Route path={`/admin/manage/courses/:courseId/item/:itemId`}>
                <EditItemPage />
            </Route>
        </Switch>
    );
};

export default CourseAdministartion;
