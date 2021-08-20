import React, { useEffect } from 'react';
import AdminDashboardHeader from "../universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../universal/searchBar/AdminDashboardSearch";
import adminSideState from "../../../store/admin/adminSideState";
import instance from "../../../services/axiosInstance";
import { none, useState } from "@hookstate/core";
import AdminDashboardSearchItem from "../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import { Route, Switch } from "react-router-dom";
import { AdminDashboardWrapper } from "../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { AdminDashboardList } from "../universal/adminDashboardList/AdminDashboardList";
import { article } from "../../../store/types/article";
import { AxiosResponse } from "axios";
import { AddArticle } from "./articles_components/AddArticle";
import { globalConfig } from "../../../configuration/config";
import UserStatistics from "../users/users_components/userStatistics/UserStatistics";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { backendUrl } from '../../../Environemnt';

export const ManageArticles: React.FunctionComponent = () => {
    const admin = useState(adminSideState)

    useEffect(() => {
        instance.get("/articles/getarticles").then((res: AxiosResponse<article[]>) => {
            admin.articles.set(res.data)
        }).catch((e) => {
            return e
        })
        //eslint-disable-next-line
    }, [])

    const searchChangeHandler = (name: string, value: string) => {
        instance.get("/articles/getarticles").then((res: AxiosResponse<article[]>) => {
            admin.articles.set(res.data)
        }).catch((e) => {
            return e
        })
    }
    return (
        <Switch>
            <Route exact path={'/admin/manage/articles'}>
                <AdminDashboardWrapper>
                    <AdminDashboardHeader titleText={""} />
                    <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Cikkek"} />
                    <AdminDashboardList>
                        {admin.articles.get().map((article, index) => {
                            return <AdminDashboardSearchItem
                                title={article.articleTitle}
                                thumbnailUrl={article.articleCoverImage}
                                key={article._id}
                                chips={[
                                    { label: article.articleWatchCount || "0", icon: "read" }]}
                                actions={[
                                    {
                                        selectedComponent: "editCourse",
                                        icon: "edit",
                                        onClick: function () {

                                        }
                                    }, {
                                        selectedComponent: "userStatistics",
                                        icon: "statistics",
                                        onClick: () => {

                                        }
                                    }, {
                                        icon: "delete",
                                        onClick: () => {
                                            instance.delete(`${backendUrl}articles/deletearticle?articleId=${article._id}`).then(() => {
                                                return admin.articles[index].set(none)
                                            }).catch(e => console.error(e.toString()))
                                        }
                                    },]
                                }
                                userActionComponents={{
                                    editCourse: <div>asd</div>,
                                    videoStatistics: <UserStatistics />
                                }} />
                        })}

                    </AdminDashboardList>
                    <Fab color="primary"
                        aria-label="add"
                        style={{ position: "absolute", bottom: 45, right: 45 }}>
                        <Add />
                    </Fab>
                </AdminDashboardWrapper>
            </Route>
            <Route path={'/admin/add/article'}>
                <AddArticle />
            </Route>
        </Switch>

    );
};
