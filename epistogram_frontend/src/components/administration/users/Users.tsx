import { Divider, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useContext } from 'react';
import { NavLink, Route, Switch } from "react-router-dom";
import { globalConfig } from "../../../configuration/config";
import { CurrentUserContext } from '../../../HOC/data_manager_frame/DataManagerFrame';
import { LoadingFrame } from "../../../HOC/loading_frame/LoadingFrame";
import { IdType } from '../../../models/shared_models/types/sharedTypes';
import { useUserListQuery } from "../../../services/adminPageUsersService";
import { httpDeleteAsync } from "../../../services/httpClient";
import { AdminDashboardList } from "../universal/adminDashboardList/AdminDashboardList";
import AdminDashboardSearchItem, { DashboardSearchItemAction } from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import { AdminDashboardWrapper } from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import classes from "./users.module.scss";
import AddUser from "./users_components/AddUser";
import EditUser from "./users_components/editUser/EditUser";
import UserStatistics from "./users_components/userStatistics/UserStatistics";
import UserTasks from "./users_components/userTasks/UserTasks";

const actions = [
    {
        selectedComponent: "userTasks",
        icon: "list",
        onClick: () => {

        }
    },
    {
        selectedComponent: "editUser",
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
        onClick: (user) => {

            const url = `/users/deleteuser?userId=${user._id}`;
            httpDeleteAsync(url);
            // TODO delete user 
            // instance.delete().then(() => {
            //     return admin.users[index].set(none)
            // }).catch(e => console.error(e.toString()))
        }
    },
] as DashboardSearchItemAction[];

const getAvatarUrl = (userId: IdType | null) => {

    if (!userId)
        return "";

    return `${globalConfig.assetStorageUrl}/users/${userId}/avatar.png`;
}

export const Users = () => {

    const user = useContext(CurrentUserContext);
    const [searchText, setSearchText] = React.useState("");
    const { users, status } = useUserListQuery(user, searchText);

    return (
        <Switch>
            <Route exact path={'/admin/manage/users'}>
                <Divider style={{ width: "100%" }} />
                <AdminDashboardWrapper>

                    <AdminDashboardSearch
                        searchChangeHandler={(name, searchText) => setSearchText(searchText)}
                        name="searchData"
                        title="Felhasználók"
                        className={classes.searchBar} />

                    <LoadingFrame loadingState={status}>
                        <AdminDashboardList>
                            {users
                                .map((user, index) => {
                                    return <AdminDashboardSearchItem
                                        additionalData={user}
                                        title={`${user.lastName} ${user.firstName}`}
                                        profileImageUrl={getAvatarUrl(user._id)}
                                        chips={[
                                            { label: user.email, icon: "email" },
                                            { label: user.organizationName, icon: "organization" },
                                            { label: user.innerRole, icon: "work" }]
                                        }
                                        key={index}
                                        actions={actions}
                                        userActionComponents={{
                                            userTasks: <UserTasks user={user} index={index} />,
                                            editUser: <EditUser user={user} index={index} />,
                                            userStatistics: <UserStatistics />
                                        }}
                                    />
                                })}
                        </AdminDashboardList>
                        <NavLink to={"/admin/manage/users/add"}>
                            <Fab color="primary"
                                aria-label="add"
                                style={{ position: "absolute", bottom: 45, right: 45 }}>
                                <Add />
                            </Fab>
                        </NavLink>

                    </LoadingFrame>
                </AdminDashboardWrapper>
            </Route>
            <Route path={'/admin/manage/users/add'}>
                <AddUser />
            </Route>
        </Switch>
    );
};
