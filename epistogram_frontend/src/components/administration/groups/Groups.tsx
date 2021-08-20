import React, {useEffect} from 'react';
import AdminDashboardHeader from "../universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import adminSideState from "../../../store/admin/adminSideState";
import instance from "../../../services/axiosInstance";
import {none, useState} from "@hookstate/core";
import AdminDashboardSearchItem from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import {Route, Switch} from "react-router-dom";
import {AdminDashboardWrapper} from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import {AdminDashboardList} from "../universal/adminDashboardList/AdminDashboardList";
import {group} from "../../../store/types/group";
import {AxiosResponse} from "axios";
import {globalConfig} from "../../../configuration/config";
import UserStatistics from "../users/users_components/userStatistics/UserStatistics";
import {AddGroup} from "./groups_components/AddGroup";
import {Add} from "@material-ui/icons";
import {Fab} from "@material-ui/core";
import { backendUrl } from '../../../Environemnt';

export const Groups: React.FunctionComponent = () => {
    const admin = useState(adminSideState)

    useEffect(() => {
        instance.get("/groups/getgroups").then((res: AxiosResponse<group[]>) => {
            admin.groups.set(res.data)
        }).catch((e) => {
            return e
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchChangeHandler = (name: string, value: string) => {
        instance.get("/groups/getgroups").then((res: AxiosResponse<group[]>) => {
            admin.groups.set(res.data)
        }).catch((e) => {
            return e
        })
    }
    return (
        <Switch>
            <Route exact path={'/admin/manage/groups'}>
                <AdminDashboardWrapper>
                    <AdminDashboardHeader titleText={""} />
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Csoportok"}/>
                    <AdminDashboardList>
                        {admin.groups.get().map((group, index) => {
                            return <AdminDashboardSearchItem title={group.groupName}
                                                             chips={[
                                                                 {label: "1", icon: "person"}]}

                                                             key={group._id}
                                                             actions={[
                                                                 {
                                                                     selectedComponent: "editCourse",
                                                                     icon: "edit",
                                                                     onClick: () => {

                                                                     }
                                                                 }, {
                                                                     selectedComponent: "userStatistics",
                                                                     icon: "statistics",
                                                                     onClick: () => {

                                                                     }
                                                                 }, {
                                                                     icon: "delete",
                                                                     onClick: () => {
                                                                         instance.delete(`${backendUrl}groups/deletegroup?groupId=${group._id}`).then(() => {
                                                                             return admin.groups[index].set(none)
                                                                         }).catch(e => console.error(e.toString()))
                                                                     }
                                                                 },]
                                                             }
                                                             userActionComponents={{
                                                                 editCourse: <div>asd</div>,
                                                                 videoStatistics: <UserStatistics />
                                                             }}/>})}

                    </AdminDashboardList>
                    <Fab color="primary"
                         aria-label="add"
                         style={{position: "absolute", bottom: 45, right: 45}}>
                        <Add />
                    </Fab>
                </AdminDashboardWrapper>
            </Route>
            <Route path={'/admin/add/group'}>
                <AddGroup />
            </Route>
        </Switch>

    );
};
