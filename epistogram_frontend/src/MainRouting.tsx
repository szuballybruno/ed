import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminPage from "./components/administration/AdminPage";
import AvailableCoursesPage from "./components/AvailableCoursesPage";
import CourseDetailsPage from "./components/courseDetails/CourseDetailsPage";
import HomePage from "./components/HomePage";
import LearningInsightsPage from "./components/LearningInsightsPage";
import LoginScreen from "./components/login/LoginScreen";
import NotFound from "./components/notFound/NotFound";
import { PlayerPage } from "./components/player/PlayerPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { SetNewPasswordPage } from "./components/SetNewPasswordPage";
import { SignupPage } from "./components/signup/SignupPage";
import { ProtectedRoute } from "./components/universal/ProtectedRoute";
import { UserSettingsPage } from "./components/userSettings/UserSettingsPage";
import { applicationRoutes } from "./configuration/applicationRoutes";

export const MainRouting = () => {

    return <Switch>

        {/* unprotected paths  */}
        <Route path={applicationRoutes.loginRoute.route} component={LoginScreen} />
        <Route path={applicationRoutes.setNewPasswordRoute.route} component={SetNewPasswordPage} />
        <Route path={applicationRoutes.registrationRoute.route} component={RegistrationPage} />

        {/* protected paths */}
        <ProtectedRoute
            path="/watch/:descriptorCode"
            render={() => <PlayerPage />} />

        <ProtectedRoute
            path={applicationRoutes.signupRoute.route}
            render={() => <SignupPage />}
            ignoreAppAccessProtection={true} />

        <ProtectedRoute
            path={applicationRoutes.administrationRoute.route}
            isAuthorizedToView={x => x.canAccessAdministration}
            render={() => <AdminPage />} />

        <ProtectedRoute
            path={applicationRoutes.homeRoute.route}
            render={() => <HomePage />} />

        <Route
            path={applicationRoutes.availableCoursesRoute.route}
            render={() => <Switch>

                <Route exact path={"/courses/:courseId"}>
                    <CourseDetailsPage />
                </Route>

                <Route path={"/courses"}>
                    <AvailableCoursesPage />
                </Route>

            </Switch>} />

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
