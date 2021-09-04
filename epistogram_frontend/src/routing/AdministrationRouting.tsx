import { Redirect, Route, Switch } from "react-router-dom";
import Statistics from "../components/administration/statistics/Statistics";
import { AdministrationUserRouting } from "./AdministrationUserRouting";
import AdministrationCourseRouting from "./AdministrationCourseRouting";
//import {ManageArticles} from "../articles/ManageArticles";
//import {Votes} from "../votes/Votes";
//import {Groups} from "../groups/Groups";
//import {Organizations} from "../organizations/Organizations";
import React from "react";

// Currently unnecessary components removed temporary for easier refactoring
// TODO: When the User and Course manage pages are ready, copy the logic from them to the remaining pages

export const AdministrationRouting = () => <Switch>
    <Route exact path={'/admin'}>
        <Redirect to={'/admin/statistics'} />
    </Route>
    <Route path={'/admin/statistics'}>
        <Statistics />
    </Route>
    <Route path={'/admin/manage/users'}>
        <AdministrationUserRouting />
    </Route>
    <Route path={'/admin/manage/courses'}>
        <AdministrationCourseRouting />
    </Route>
    {/*<Route path={'/admin/manage/articles'}>
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
    </Route>*/}
</Switch>