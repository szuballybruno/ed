import { Box } from "@chakra-ui/react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { backendUrl } from '../../../Environemnt';
import instance from "../../../services/axiosInstance";
import AdminDashboardHeader from "../universal/adminDashboardHeader/AdminDashboardHeader";
import { AdminDashboardList } from "../universal/adminDashboardList/AdminDashboardList";
import { AdministrationListItem } from "../universal/adminDashboardSearchItem/AdministrationListItem";
import { AdminDashboardWrapper } from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { AdminDashboardSearch } from "../universal/searchBar/AdminDashboardSearch";
import { AddOrganization } from "./organizations_components/AddOrganization";

export const Organizations: React.FunctionComponent = () => {

    return <Box>WIP</Box>;
    // const admin = useState(adminSideState)

    // useEffect(() => {
    //     instance.get("/organizations/getorganizations").then((res: AxiosResponse<organization[]>) => {
    //         admin.organizations.set(res.data)
    //     }).catch((e) => {
    //         return e
    //     })

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const searchChangeHandler = (name: string, value: string) => {
    //     instance.get("/organizations/getorganizations").then((res: AxiosResponse<organization[]>) => {
    //         admin.organizations.set(res.data)
    //     }).catch((e) => {
    //         return e
    //     })
    // }
    // return (
    //     <Switch>
    //         <Route exact path={'/admin/manage/organizations'}>
    //             <AdminDashboardWrapper>
    //                 <AdminDashboardHeader titleText={""} />
    //                 <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Cégek"} />
    //                 <AdminDashboardList>
    //                     {admin.organizations.get().map((organization, index) => {
    //                         return <AdministrationListItem title={organization.organizationName}
    //                             chips={[
    //                                 { label: "1", icon: "person" },
    //                                 { label: "1", icon: "person" }]}
    //                             key={organization._id}
    //                             searchItemButtons={[
    //                                 {
    //                                     selectedComponent: "editCourse",
    //                                     icon: "edit",
    //                                     onClick: () => {

    //                                     }
    //                                 }, {
    //                                     selectedComponent: "userStatistics",
    //                                     icon: "statistics",
    //                                     onClick: () => {

    //                                     }
    //                                 }, {
    //                                     icon: "delete",
    //                                     onClick: () => {
    //                                         instance.delete(`${backendUrl}organizations/deleteorganization?organizationId=${organization._id}`).then(() => {
    //                                             return admin.organizations[index].set(none)
    //                                         }).catch(e => console.error(e.toString()))
    //                                     }
    //                                 },]
    //                             } />
    //                     })}

    //                 </AdminDashboardList>
    //                 <Fab color="primary"
    //                     aria-label="add"
    //                     style={{ position: "absolute", bottom: 45, right: 45 }}>
    //                     <Add />
    //                 </Fab>
    //             </AdminDashboardWrapper>
    //         </Route>
    //         <Route path={'/admin/add/organization'}>
    //             <AddOrganization />
    //         </Route>
    //     </Switch>

    // );
};
