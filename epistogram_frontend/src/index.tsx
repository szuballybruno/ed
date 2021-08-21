import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './index.css';
import LoginScreen from "./components/universal/authentication/login/LoginScreen";
import NotFound from "./components/universal/notFound/NotFound";
import PlayerMain from "./components/player/PlayerMain";
import ProfileMain from "./components/profile/ProfileMain";
import CourseSearch from "./components/course_search/CourseSearch";
import UserDashBoard from "./components/dashboard/UserDashBoard";
import Administration from "./components/administration/Administration";
import CoursePage from "./components/course_search/CoursePage";

import { DataManagerFrame } from "./HOC/data_manager_frame/DataManagerFrame";
import { ProtectedRoute } from "./components/universal/authentication/protectedRoute/ProtectedRoute";
import { PopupsWrapper } from "./HOC/popups_wrapper/PopupsWrapper";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./configuration/defaultMUITheme";
import { StylesProvider } from "@material-ui/core";
import { Signup } from "./components/universal/authentication/signup/Signup";
import { MobileDemo } from "./components/universal/MobileDemo";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

const MainSwitch = () => {

    return <Switch>

        {/* unprotected paths  */}
        <Route path="/login" component={withRouter(LoginScreen)} />
        <Route path="/signup" component={withRouter(Signup)} />

        {/* protected paths */}
        <ProtectedRoute path="/watch/:courseId/:id" render={() => <PlayerMain />} />
        <ProtectedRoute path="/admin" render={() => <Administration />} />
        <ProtectedRoute path="/kezdolap" render={() => <UserDashBoard />} />
        <ProtectedRoute path="/kurzusok" render={() => <CourseSearch />} />
        <ProtectedRoute path="/profilom" render={() => <ProfileMain />} />
        <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
        <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
        <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />

        {/* index path */}
        <ProtectedRoute path="/" render={() => <UserDashBoard />} exact />

        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>
    </Switch>
}

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <DataManagerFrame>
                        <Router>
                            <PopupsWrapper>
                                <MainSwitch />
                            </PopupsWrapper>
                        </Router>
                    </DataManagerFrame>
                </ThemeProvider>
            </StylesProvider>
        </BrowserRouter>
    </QueryClientProvider>,
    document.getElementById('root')
);
