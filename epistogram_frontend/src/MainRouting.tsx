import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
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
import { UnderMaintanence } from "./components/UnderMaintanence";
import { ProtectedRoute } from "./components/universal/ProtectedRoute";
import { UserSettingsPage } from "./components/userSettings/UserSettingsPage";
import { applicationRoutes } from "./configuration/applicationRoutes";
import { isUnderMaintenance } from "./Environemnt";
import { ApplicationRoute } from "./models/types";

export const getRoute = (route: ApplicationRoute, renderRoute: ReactNode) => {

    return <Route exact={route.exact} path={route.route}>
        {renderRoute}
    </Route>
}

export const MainRouting = () => {

    return <Switch>

        {/* under maintanence */}
        {isUnderMaintenance && <Route path="/" component={UnderMaintanence} />}

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

        <ProtectedRoute
            path={applicationRoutes.availableCoursesRoute.route}
            render={() => <Switch>

                <Route exact path={"/courses"}>
                    <AvailableCoursesPage />
                </Route>

                {getRoute(applicationRoutes.availableCoursesRoute.courseDetailsRoute, <CourseDetailsPage />)}
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
