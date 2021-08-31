import { StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Administration from "./components/administration/Administration";
import CoursePage from "./components/course_search/CoursePage";
import UserCoursesPage from "./components/course_search/UserCoursesPage";
import OverviewPage from "./components/dashboard/OverviewPage";
import { FileUploadPage } from "./components/FileUploadPage";
import LoginScreen from "./components/login/LoginScreen";
import { MobileDemo } from "./components/mobileDemo/MobileDemo";
import PlayerPage from "./components/player/PlayerPage";
import ProfileMain from "./components/profile/ProfileMain";
import { SignupPage } from "./components/signup/SignupPage";
import NotFound from "./components/universal/notFound/NotFound";
import { ProtectedRoute } from "./components/universal/ProtectedRoute";
import { theme } from "./configuration/defaultMUITheme";
import { DataManagerFrame } from "./HOC/data_manager_frame/DataManagerFrame";
import { PopupsWrapper } from "./HOC/popups_wrapper/PopupsWrapper";
import './index.css';


const queryClient = new QueryClient();

const MainSwitch = () => {

    return <Switch>

        {/* unprotected paths  */}
        <Route path="/login" component={withRouter(LoginScreen)} />
        <Route path="/signup" component={withRouter(SignupPage)} />

        {/* protected paths */}
        <ProtectedRoute path="/watch/:id" render={() => <PlayerPage />} />
        <ProtectedRoute path="/admin" render={() => <Administration />} />
        <ProtectedRoute path="/kezdolap" render={() => <OverviewPage />} />
        <ProtectedRoute path="/kurzusok" render={() => <UserCoursesPage />} />
        <ProtectedRoute path="/profilom" render={() => <ProfileMain />} />
        <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
        <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
        <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />

        <ProtectedRoute path="/fileupload" render={() => <FileUploadPage />} />

        {/* index path */}
        <ProtectedRoute path="/" render={() => <OverviewPage />} exact />

        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>
    </Switch>
}

ReactDOM.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <DataManagerFrame>
                        <PopupsWrapper>
                            <MainSwitch />
                        </PopupsWrapper>
                    </DataManagerFrame>
                </ThemeProvider>
            </StylesProvider>
        </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
