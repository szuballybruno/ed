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
import {AddVote} from "./votes_components/AddVote";
import {vote} from "../../../store/types/vote";
import {Add} from "@material-ui/icons";
import {Fab} from "@material-ui/core";
import { backendUrl } from '../../../Environemnt';

export const Votes: React.FunctionComponent = () => {
    const admin = useState(adminSideState)

    useEffect(() => {
        instance.get("/votes/getvotes").then((res: AxiosResponse<vote[]>) => {
            admin.votes.set(res.data)
        }).catch((e) => {
            return e
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchChangeHandler = (name: string, value: string) => {
        instance.get("/votes/getvotes").then((res: AxiosResponse<vote[]>) => {
            admin.votes.set(res.data)
        }).catch((e) => {
            return e
        })
    }
    return (
        <Switch>
            <Route exact path={'/admin/manage/votes'}>
                <AdminDashboardWrapper>
                    <AdminDashboardHeader titleText={""} />
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Szavazások"}/>
                    <AdminDashboardList>
                        {admin.votes.get().map((vote, index) => {
                            return <AdminDashboardSearchItem title={vote.voteQuestion}
                                                             chips={[
                                                                 {label: (vote.voteFirstAnswerCount + vote.voteSecondAnswerCount).toString(), icon: "vote"},
                                                                 {label: `${vote.voteFirstAnswerCount} szavazat az első opcióra`, icon: ""},
                                                                 {label: `${vote.voteSecondAnswerCount} szavazat a második opcióra`, icon: ""}]}
                                                             key={vote._id}
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
                                                                         instance.delete(`${backendUrl}articles/deletevote?voteId=${vote._id}`).then(() => {
                                                                             return admin.articles[index].set(none)
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
            <Route path={'/admin/add/vote'}>
                <AddVote />
            </Route>
        </Switch>

    );
};
