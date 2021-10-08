import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AdministrationPage from "../components/administration/AdministrationPage";
import AvailableCoursesPage from "../components/course_search/AvailableCoursesPage";
import LearningInsightsPage from "../components/LearningInsightsPage";
import LoginScreen from "../components/login/LoginScreen";
import { PlayerPage } from "../components/player/PlayerPage";
import { SignupPage } from "../components/signup/SignupPage";
import NotFound from "../components/notFound/NotFound";
import { ProtectedRoute } from "../components/universal/ProtectedRoute";
import { UserSettingsPage } from "../components/userSettings/UserSettingsPage";
import { applicationRoutes } from "../configuration/applicationRoutes";
import HomePage from "../components/HomePage";
import { SetNewPasswordPage } from "../components/SetNewPasswordPage";

export const MainRouting = () => {
    return <Switch>

        {/* unprotected paths  */}
        <Route path={applicationRoutes.loginRoute.route} component={withRouter(LoginScreen)} />
        <Route path={applicationRoutes.signupRoute.route} component={withRouter(SignupPage)} />
        <Route path={applicationRoutes.setNewPasswordRoute.route} component={SetNewPasswordPage} />

        {/* protected paths */}
        <ProtectedRoute
            path="/watch/:descriptorCode"
            render={() => <PlayerPage />} />

        <ProtectedRoute
            path={applicationRoutes.administrationRoute.route}
            isAuthorizedToView={x => x.canAccessAdministration}
            render={() => <AdministrationPage />} />

        <ProtectedRoute
            path={applicationRoutes.homeRoute.route}
            render={() => <HomePage />} />

        <ProtectedRoute
            path={applicationRoutes.availableCoursesRoute.route}
            render={() => <AvailableCoursesPage />} />

        <ProtectedRoute
            path={applicationRoutes.settingsRoute.route}
            render={() => <UserSettingsPage />} />

        <ProtectedRoute
            path={applicationRoutes.learningRoute.route}
            render={() => <LearningInsightsPage />} />

        <ProtectedRoute
            path={applicationRoutes.rootHomeRoute.route}
            render={() => <HomePage />} exact />

        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>

    </Switch>
}