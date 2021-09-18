import React from 'react';
import { Route, Switch } from "react-router-dom";
import AddUser from "../components/administration/users/addUser/AddUser";
import { UserAdministrationPage } from "../components/administration/users/userList/UserAdministrationPage";

export const AdministrationUserRouting = () => {
    return (
        <Switch>
            <Route exact path={'/admin/manage/users'}>
                <UserAdministrationPage />
            </Route>
            <Route path={'/admin/manage/users/add'}>
                <AddUser />
            </Route>
            {/* TODO: Plan and implement the edit page because of tasks, statistics and actual editing of user data */}
        </Switch>
    );
};