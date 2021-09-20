import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AdministrationPage from "../components/administration/AdministrationPage";
import UserCoursesPage from "../components/course_search/UserCoursesPage";
import OverviewPage from "../components/dashboard/OverviewPage";
import { FileUploadPage } from "../components/FileUploadPage";
import LoginScreen from "../components/login/LoginScreen";
import { PlayerPage } from "../components/player/PlayerPage";
import ProfileMain from "../components/profile/ProfileMain";
import { SignupPage } from "../components/signup/SignupPage";
import NotFound from "../components/universal/notFound/NotFound";
import { ProtectedRoute } from "../components/universal/ProtectedRoute";

export const MainRouting = () => {
    return <Switch>

        {/* unprotected paths  */}
        <Route path="/login" component={withRouter(LoginScreen)} />
        <Route path="/signup" component={withRouter(SignupPage)} />

        {/* protected paths */}
        <ProtectedRoute path="/watch/:descriptorCode" render={() => <PlayerPage />} />
        <ProtectedRoute path="/admin" render={() => <AdministrationPage />} />
        <ProtectedRoute path="/kezdolap" render={() => <OverviewPage />} />
        <ProtectedRoute path="/kurzusok" render={() => <UserCoursesPage />} />
        <ProtectedRoute path="/profilom" render={() => <ProfileMain />} />
        <ProtectedRoute path="/fileupload" render={() => <FileUploadPage />} />
        <ProtectedRoute path="/" render={() => <OverviewPage />} exact />

        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>

    </Switch>
}

{/*
    Not used pages, maybe useful on demo

    <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
    <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
    <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />
*/}