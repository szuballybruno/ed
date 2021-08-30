import React from 'react';

import { Route, Switch } from "react-router-dom";

import { AddCourse } from '../courses/addCourse/AddCourse';
import { AddVideo } from "../courses/addVideo/AddVideo";
import { EditCourse } from "../courses/editCourse/EditCourse";
import { EditVideo } from "../courses/editVideo/EditVideo";
import { CourseList } from "../courses/courseList/CourseList";

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
