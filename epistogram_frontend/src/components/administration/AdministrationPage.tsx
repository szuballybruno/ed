import React, { useContext } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { NavigationListItemType } from "../../models/types";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
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
import { BarChart, Business, ChromeReaderMode, Group, Person, Subscriptions, ThumbsUpDown } from "@mui/icons-material";
import { NavigationLinkList } from '../NavigationLinkList';

const menuItems = [
    {
        title: "Statisztika",
        route: "/administration/statistics",
        icon: <BarChart color={"secondary"} />
    },
    {
        title: "Felhasználók kezelése",
        route: "/administration/users",
        icon: <Person color={"secondary"} />
    },
    {
        title: "Kurzusok kezelése",
        route: "/administration/courses",
        icon: <Subscriptions color={"secondary"} />
    },
    {
        title: "Csoportok kezelése",
        route: "/administration/groups",
        icon: <ChromeReaderMode color={"secondary"} />
    },
    {
        title: "Cégek kezelése",
        route: "/administration/organizations",
        icon: <Group color={"secondary"} />//Business
    }
] as NavigationListItemType[];

const AdministrationPage = (props: { match: { url: string; } }) => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext);

    return <MainWrapper>
        <Navbar />
        <ContentWrapper>
            <LeftPanel p="20px">
                <NavigationLinkList items={menuItems} />
            </LeftPanel>
            <RightPanel noPadding bg="white">

                {/* admin header */}
                <AministrationSubpageHeader />

                {/* admin subpages */}
                <Switch>

                    {/* statistics */}
                    <Route path={'/administration/statistics'}>
                        <AminStatistics />
                    </Route>

                    {/* user administration */}
                    <Route path={'/administration/users'}>
                        <Switch>
                            <Route exact path={'/administration/users'}>
                                <UserAdministrationPage />
                            </Route>
                            <Route path={'/administration/users/add'}>
                                <AddUser />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <Route path={'/administration/courses'}>
                        <Switch>
                            <Route exact path={"/administration/courses"}>
                                <CourseList />
                            </Route>
                            <Route path={"/administration/courses/add"}>
                                <AddCourse />
                            </Route>
                            <Route path={"/administration/courses/:courseId"} exact>
                                <EditCourse />
                            </Route>
                            <Route path={"/administration/courses/:courseId/item/add"} exact>
                                <AddVideo />
                            </Route>
                            <Route path={`/administration/courses/:courseId/item/:itemId`}>
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
