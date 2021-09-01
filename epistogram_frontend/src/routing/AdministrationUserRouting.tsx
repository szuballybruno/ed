import React from 'react';
import { Route, Switch } from "react-router-dom";
import AddUser from "../components/administration/users/addUser/AddUser";
import {UserList} from "../components/administration/users/userList/UserList";

export const AdministrationUserRouting = () => {
    return (
        <Switch>
            <Route exact path={'/admin/manage/users'}>
                <UserList />
            </Route>
            <Route path={'/admin/manage/users/add'}>
                <AddUser />
            </Route>
            {/* TODO: Plan and implement the edit page because of tasks, statistics and actual editing of user data */}
        </Switch>
    );
};