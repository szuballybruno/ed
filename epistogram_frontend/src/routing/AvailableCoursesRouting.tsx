import {Route, Switch, withRouter} from "react-router-dom";
import React from "react";
import AvailableCoursesPage from "../components/course_search/AvailableCoursesPage";
import CoursePage from "../components/course_search/CoursePage";

const AvailableCoursesRouting = () => {
    return <Switch>

        <Route exact path={"/courses/:courseId"}>
            <CoursePage />
        </Route>

        <Route path={"/courses"}>
            <AvailableCoursesPage />
        </Route>

    </Switch>
}

export default withRouter(AvailableCoursesRouting)
