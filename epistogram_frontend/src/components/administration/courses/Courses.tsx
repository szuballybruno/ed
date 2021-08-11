import React, {useEffect} from 'react';
import instance from "../../../services/axiosInstance";
import applicationRunningState from "../../../store/application/applicationRunningState";
import adminSideState from "../../../store/admin/adminSideState";
import {none, useState} from "@hookstate/core";
import classes from './courses.module.scss'
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import AdminDashboardSearchItem from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import {globalConfig} from "../../../configuration/config";
import UserStatistics from "../users/users_components/userStatistics/UserStatistics";
import {AdminDashboardList} from "../universal/adminDashboardList/AdminDashboardList";
import {AdminDashboardWrapper} from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { AddCourse } from './courses_components/addCourse/AddCourse';
import {EditCourse} from "./courses_components/editCourse/EditCourse";
import {Cookies} from "react-cookie";
import {course} from "../../../store/types/course";
import {Add} from "@material-ui/icons";
import {Divider, Fab} from "@material-ui/core";
import {AddItem} from "./courses_components/addItem/AddItem";
import {EditItemPage} from "./courses_components/editItem/EditItemPage";


const Courses = () => {
    const app = useState(applicationRunningState)
    const admin = useState(adminSideState)
    const cookies = new Cookies()

    useEffect(() => {
        instance.get("courses?userId="+cookies.get("userId")).then((res) => {
            if (res.data) {
                admin.courses.set(res.data)
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }

        }).catch((e) => {
            return e
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const searchChangeHandler = (name: string, value: string) => {
        instance.get("courses?userId="+cookies.get("userId")+"&searchData="+value).then((res) => {
            if (res.data) {
                admin.courses.set(res.data as course[])
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }

        }).catch((e) => {
            return e
        })
    }
    return (
        <Switch>
            <Route exact path={"/admin/manage/courses"}>
                <Divider style={{
                    width: "100%"
                }} />
                <AdminDashboardWrapper>
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"kurzusok"} className={classes.searchBar}/>
                    <AdminDashboardList>
                        {admin.courses.get().map((course, index) => {
                            return <AdminDashboardSearchItem title={course.name}
                                                             thumbnailUrl={course._id ? `${globalConfig.assetStorageUrl}/courses/${course._id}.png` : undefined}
                                                             key={course._id}
                                                             chips={[
                                                                 {label: course.category, icon: "category"},
                                                                 {label: course.teacherName || "Ismeretlen oktató", icon: "person"},
                                                                 {label: course.items ? course.items.length.toString() : "0", icon: "video"}]
                                                             }
                                                             actions={[
                                                                 {
                                                                     to: `courses/${course._id}`,
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
                                                                         instance.delete(`${globalConfig.backendUrl}videos/deletevideo?videoId=${course._id}`).then(() => {
                                                                             return admin.users[index].set(none)
                                                                         }).catch(e => console.error(e.toString()))
                                                                     }
                                                                 },]
                                                             }
                                                             userActionComponents={{
                                                                 editCourse: <Redirect to={`courses/${course._id}`} />,
                                                                 videoStatistics: <UserStatistics />
                                                             }} />
                        })}
                    </AdminDashboardList>
                    <NavLink to={"/admin/manage/courses/add"}>
                        <Fab color="primary"
                             aria-label="add"
                             style={{position: "absolute", bottom: 45, right: 45}}>
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

export default Courses;
