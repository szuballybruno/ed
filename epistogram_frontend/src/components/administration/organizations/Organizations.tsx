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
import {AxiosResponse} from "axios";
import {globalConfig} from "../../../configuration/config";
import UserStatistics from "../users/users_components/userStatistics/UserStatistics";
import {AddOrganization} from "./organizations_components/AddOrganization";
import {organization} from "../../../store/types/organization";
import {Add} from "@material-ui/icons";
import {Fab} from "@material-ui/core";

export const Organizations: React.FunctionComponent = () => {
    const admin = useState(adminSideState)

    useEffect(() => {
        instance.get("/organizations/getorganizations").then((res: AxiosResponse<organization[]>) => {
            admin.organizations.set(res.data)
        }).catch((e) => {
            return e
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchChangeHandler = (name: string, value: string) => {
        instance.get("/organizations/getorganizations").then((res: AxiosResponse<organization[]>) => {
            admin.organizations.set(res.data)
        }).catch((e) => {
            return e
        })
    }
    return (
        <Switch>
            <Route exact path={'/admin/manage/organizations'}>
                <AdminDashboardWrapper>
                    <AdminDashboardHeader titleText={""} />
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Cégek"}/>
                    <AdminDashboardList>
                        {admin.organizations.get().map((organization, index) => {
                            return <AdminDashboardSearchItem title={organization.organizationName}
                                                             chips={[
                                                                 {label: "1", icon: "person"},
                                                                 {label: "1", icon: "person"}]}
                                                             key={organization._id}
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
                                                                         instance.delete(`${globalConfig.backendUrl}organizations/deleteorganization?organizationId=${organization._id}`).then(() => {
                                                                             return admin.organizations[index].set(none)
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
            <Route path={'/admin/add/organization'}>
                <AddOrganization />
            </Route>
        </Switch>

    );
};
