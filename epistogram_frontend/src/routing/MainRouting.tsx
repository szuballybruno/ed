import {Route, Switch, withRouter} from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import {SignupPage} from "../components/signup/SignupPage";
import {ProtectedRoute} from "../components/universal/ProtectedRoute";
import PlayerPage from "../components/player/PlayerPage";
import Administration from "../components/administration/Administration";
import OverviewPage from "../components/dashboard/OverviewPage";
import UserCoursesPage from "../components/course_search/UserCoursesPage";
import ProfileMain from "../components/profile/ProfileMain";
import NotFound from "../components/universal/notFound/NotFound";
import React from "react";
import CoursePage from "../components/course_search/CoursePage";
import {MobileDemo} from "../components/mobileDemo/MobileDemo";
import {FileUploadPage} from "../components/FileUploadPage";

export const MainRouting = () => {
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
        <ProtectedRoute path="/fileupload" render={() => <FileUploadPage />} />

        {/* index path */}
        <ProtectedRoute path="/" render={() => <OverviewPage />} exact />



        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>

        {/*

            Not used pages, maybe useful on demo

            <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
            <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
            <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />

        */}

    </Switch>
}