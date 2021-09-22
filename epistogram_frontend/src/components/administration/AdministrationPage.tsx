import React, { useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { RouteItemType } from "../../models/types";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { NavigationLinkList } from '../NavigationLinkList';
import Navbar from "../universal/navigation/navbar/Navbar";
import { AddCourse } from "./courses/addCourse/AddCourse";
import { AddVideo } from "./courses/addVideo/AddVideo";
import { CourseAdministration } from "./courses/courseList/CourseAdministration";
import { EditCourse } from "./courses/editCourse/EditCourse";
import { EditVideo } from "./courses/editVideo/EditVideo";
import AminStatistics from "./statistics/AminStatistics";
import { AministrationSubpageHeader } from "./universal/adminAddHeader/AministrationSubpageHeader";
import AddUser from "./users/addUser/AddUser";
import { UserAdministration } from "./users/userList/UserAdministration";

const AdministrationPage = () => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext);
    const administrationRoutes = applicationRoutes.administrationRoute;

    return <MainWrapper>
        <Navbar />
        <ContentWrapper>
            <LeftPanel p="20px">
                <NavigationLinkList
                    items={[
                        administrationRoutes.statisticsRoute,
                        administrationRoutes.usersRoute,
                        administrationRoutes.coursesRoute
                    ] as RouteItemType[]} />
            </LeftPanel>
            <RightPanel noPadding bg="white">

                {/* admin header */}
                <AministrationSubpageHeader />

                {/* admin subpages */}
                <Switch>

                    {/* statistics */}
                    <Route exact path={administrationRoutes.statisticsRoute.route}>
                        <AminStatistics />
                    </Route>

                    {/* user administration */}
                    <Route path={administrationRoutes.usersRoute.route}>
                        <Switch>
                            <Route exact path={administrationRoutes.usersRoute.route}>
                                <UserAdministration />
                            </Route>
                            <Route path={administrationRoutes.usersRoute.addRoute.route}>
                                <AddUser />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <Route path={administrationRoutes.coursesRoute.route}>
                        <Switch>
                            <Route exact path={administrationRoutes.coursesRoute.route}>
                                <CourseAdministration />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.addRoute.route}>
                                <AddCourse />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.editCourseRoute.route} exact>
                                <EditCourse />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.addVideoRoute.route} exact>
                                <AddVideo />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.editVideoRoute.route}>
                                <EditVideo />
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(AdministrationPage);
