import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AdministrationPage from "../components/administration/AdministrationPage";
import UserCoursesPage from "../components/course_search/UserCoursesPage";
import HomePage from "../components/dashboard/HomePage";
import { FileUploadPage } from "../components/FileUploadPage";
import LearningInsightsPage from "../components/LearningInsightsPage";
import LoginScreen from "../components/login/LoginScreen";
import { PlayerPage } from "../components/player/PlayerPage";
import { SignupPage } from "../components/signup/SignupPage";
import NotFound from "../components/universal/notFound/NotFound";
import { ProtectedRoute } from "../components/universal/ProtectedRoute";
import { UserSettingsPage } from "../components/userSettings/UserSettingsPage";

export const MainRouting = () => {
    return <Switch>

        {/* unprotected paths  */}
        <Route path="/login" component={withRouter(LoginScreen)} />
        <Route path="/signup" component={withRouter(SignupPage)} />

        {/* protected paths */}
        <ProtectedRoute path="/watch/:descriptorCode" render={() => <PlayerPage />} />
        <ProtectedRoute path="/administration" render={() => <AdministrationPage />} />
        <ProtectedRoute path="/kezdolap" render={() => <HomePage />} />
        <ProtectedRoute path="/kurzusok" render={() => <UserCoursesPage />} />
        <ProtectedRoute path="/settings" render={() => <UserSettingsPage />} />
        <ProtectedRoute path="/learning" render={() => <LearningInsightsPage />} />
        <ProtectedRoute path="/fileupload" render={() => <FileUploadPage />} />
        <ProtectedRoute path="/" render={() => <HomePage />} exact />

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