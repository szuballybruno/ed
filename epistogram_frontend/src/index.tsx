import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './index.css';
import LoginScreen from "./components/login/LoginScreen";
import NotFound from "./components/universal/notFound/NotFound";
import PlayerPage from "./components/player/PlayerPage";
import ProfileMain from "./components/profile/ProfileMain";
import UserCourses from "./components/course_search/UserCourses";
import OverviewPage from "./components/dashboard/OverviewPage";
import Administration from "./components/administration/Administration";
import CoursePage from "./components/course_search/CoursePage";

import { DataManagerFrame } from "./HOC/data_manager_frame/DataManagerFrame";
import { ProtectedRoute } from "./components/universal/ProtectedRoute";
import { PopupsWrapper } from "./HOC/popups_wrapper/PopupsWrapper";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./configuration/defaultMUITheme";
import { StylesProvider } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from 'react-query'
import { MobileDemo } from "./components/mobileDemo/MobileDemo";
import { SignupPage } from "./components/signup/SignupPage";

const queryClient = new QueryClient();

const MainSwitch = () => {

    return <Switch>

        {/* unprotected paths  */}
        <Route path="/login" component={withRouter(LoginScreen)} />
        <Route path="/signup" component={withRouter(SignupPage)} />

        {/* protected paths */}
        <ProtectedRoute path="/watch/:courseId/:id" render={() => <PlayerPage />} />
        <ProtectedRoute path="/admin" render={() => <Administration />} />
        <ProtectedRoute path="/kezdolap" render={() => <OverviewPage />} />
        <ProtectedRoute path="/kurzusok" render={() => <UserCourses />} />
        <ProtectedRoute path="/profilom" render={() => <ProfileMain />} />
        <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
        <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
        <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />

        {/* index path */}
        <ProtectedRoute path="/" render={() => <OverviewPage />} exact />

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
