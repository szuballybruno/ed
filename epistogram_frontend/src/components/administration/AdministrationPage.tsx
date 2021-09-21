import { BarChart, Person, Subscriptions } from "@mui/icons-material";
import React, { useContext } from 'react';
import { Route, Switch, useLocation, withRouter } from "react-router-dom";
import { RouteItemType } from "../../models/types";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { NavigationLinkList } from '../NavigationLinkList';
import Navbar from "../universal/navigation/navbar/Navbar";
import { AddCourse } from "./courses/addCourse/AddCourse";
import { AddVideo } from "./courses/addVideo/AddVideo";
import { CourseList } from "./courses/courseList/CourseList";
import { EditCourse } from "./courses/editCourse/EditCourse";
import { EditVideo } from "./courses/editVideo/EditVideo";
import AminStatistics from "./statistics/AminStatistics";
import { AministrationSubpageHeader } from "./universal/adminAddHeader/AministrationSubpageHeader";
import AddUser from "./users/addUser/AddUser";
import { UserAdministrationPage } from "./users/userList/UserAdministrationPage";

export const administrationRoutes = {
    statisticsRoute: {
        title: "Statisztika",
        route: "/administration/statistics",
        icon: <BarChart color={"secondary"} />
    },
    usersRoute: {
        title: "Felhasználók kezelése",
        route: "/administration/users",
        icon: <Person color={"secondary"} />,

        addRoute: {
            title: "Felhasznalo hozzaadasa",
            route: "/administration/users/add"
        }
    },
    coursesRoute: {
        title: "Kurzusok kezelése",
        route: "/administration/courses",
        icon: <Subscriptions color={"secondary"} />,

        addRoute: {
            title: "Kurzus hozzaadasa",
            route: "/administration/courses/add"
        },
        editCourseRoute: {
            title: "Kurzus szerkesztese",
            route: "/administration/courses/:courseId"
        },
        addVideoRoute: {
            title: "Kurzus szerkesztese",
            route: "/administration/courses/:courseId/item/add"
        },
        editVideoRoute: {
            title: "Kurzus szerkesztese",
            route: "/administration/courses/:courseId/item/:itemId"
        }
    }
};

const AdministrationPage = () => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext);

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
                    <Route path={administrationRoutes.statisticsRoute.route}>
                        <AminStatistics />
                    </Route>

                    {/* user administration */}
                    <Route path={administrationRoutes.usersRoute.route}>
                        <Switch>
                            <Route exact path={administrationRoutes.usersRoute.route}>
                                <UserAdministrationPage />
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
                                <CourseList />
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
