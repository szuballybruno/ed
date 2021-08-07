import React, {useEffect} from 'react';
import AdminDashboardHeader from "../universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import applicationRunningState from "../../../store/application/applicationRunningState";
import adminSideState from "../../../store/admin/adminSideState";
import instance from "../../../services/axiosInstance";
import {none, useState} from "@hookstate/core";
import AdminDashboardSearchItem from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import {NavLink, Route, Switch} from "react-router-dom";
import AddUser from "./users_components/AddUser";
import {AdminDashboardWrapper} from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import {AdminDashboardList} from "../universal/adminDashboardList/AdminDashboardList";
import {Cookies} from "react-cookie";
import UserTasks from "./users_components/userTasks/UserTasks";
import EditUser from "./users_components/editUser/EditUser";
import UserStatistics from "./users_components/userStatistics/UserStatistics";
import {globalConfig} from "../../../configuration/config";
import {LoadingFrame} from "../../../HOC/loading_frame/LoadingFrame";
import {FailedComponent, LoadingComponent, NullComponent} from "../../../HOC/loading_frame/loadingComponents/LoadingComponent";
import {AxiosRequestConfig} from "axios";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import userSideState from "../../../store/user/userSideState";
import Tasks from "../../profile/profile_components/me/learning_components/Tasks";

export const Users: React.FunctionComponent = () => {
    const app = useState(applicationRunningState)
    const user = useState(userSideState)
    const admin = useState(adminSideState)

    const cookies = new Cookies()

    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        app.loadingIndicator.set("loading")
        return config
    }

    const fetchUser = (name?: string, value?: string) => {
        const requestInterceptor =  instance.interceptors.request.use(setLoadingOnRequest)
        instance.get(`users/?userId=${cookies.get("userId")}&organizationId=${cookies.get("organizationId")}&searchData=${value || ""}`
        ).then((res) => {
            if (res.data) {
                admin.users.set(res.data)
                app.loadingIndicator.set("succeeded")
            } else {
                //app.loadingIndicator.set("failed")
            }

        }).catch((e) => {
            return e
        })
        instance.interceptors.request.eject(requestInterceptor)
    }

    useEffect(() => {
        fetchUser()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchChangeHandler = (name: string, value: string) => {
        fetchUser(name, value)
    }

    return (
        <Switch>
            <Route exact path={'/admin/manage/users'}>
                <AdminDashboardWrapper>
                    <AdminDashboardHeader titleText={""} />
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler}
                                          name={"searchData"}
                                          title={"Felhasználók"}/>
                    <LoadingFrame loadingComponent={LoadingComponent()} failedComponent={FailedComponent()} nullComponent={NullComponent()}>
                        <AdminDashboardList>
                            {admin.users.get().map((user, index) => {
                                return <AdminDashboardSearchItem title={`${user.lastName} ${user.firstName}`}
                                                              profileImageUrl={user._id ? `${globalConfig.assetStorageUrl}/users/${user._id}/avatar.jpg` : ""}
                                                              chips={[
                                                                  {label: user.email, icon: "email"},
                                                                  {label: user.organizationName, icon: "organization"},
                                                                  {label: user.innerRole, icon: "work"}]
                                                              }
                                                              key={index}
                                                              actions={[
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
                                                                      onClick: () => {
                                                                          instance.delete(`${globalConfig.backendUrl}users/deleteuser?userId=${user._id}`).then(() => {
                                                                              return admin.users[index].set(none)
                                                                          }).catch(e => console.error(e.toString()))
                                                                      }
                                                                  },]
                                                              }
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
                                 style={{position: "absolute", bottom: 45, right: 45}}>
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
