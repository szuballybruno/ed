import React from 'react';

import { Route, Switch } from "react-router-dom";

import { AddCourse } from '../components/administration/courses/addCourse/AddCourse';
import { AddVideo } from "../components/administration/courses/addVideo/AddVideo";
import { EditCourse } from "../components/administration/courses/editCourse/EditCourse";
import { EditVideo } from "../components/administration/courses/editVideo/EditVideo";
import { CourseList } from "../components/administration/courses/courseList/CourseList";

const AdministrationCourseRouting = () => {
    return <Switch>
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
};

export default AdministrationCourseRouting;
