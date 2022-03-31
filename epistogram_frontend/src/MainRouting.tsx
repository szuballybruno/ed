import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import { AdminPage } from "./components/administration/AdminPage";
import AvailableCoursesPage from "./components/AvailableCoursesPage";
import CourseDetailsPage from "./components/courseDetails/CourseDetailsPage";
import HomePage from "./components/home/HomePage";
import LearningInsightsPage from "./components/learningInsights/LearningInsightsPage";
import LoginScreen from "./components/login/LoginScreen";
import NotFound from "./components/notFound/NotFound";
import { PlayerPage } from "./components/player/PlayerPage";
import { RegisterViaActivationCodePage } from "./components/RegisterViaActivationCodePage";
import { RegistrationPage } from "./components/RegistrationPage";
import { SetNewPasswordPage } from "./components/SetNewPasswordPage";
import { ShopPage } from "./components/epistoShop/ShopPage";
import { SignupPage } from "./components/signup/SignupPage";
import { ProtectedRoute } from "./components/universal/ProtectedRoute";
import { UserSettingsPage } from "./components/userSettings/UserSettingsPage";
import { applicationRoutes } from "./configuration/applicationRoutes";
import { ApplicationRoute } from "./models/types";

export const getRoute = (route: ApplicationRoute, renderRoute: ReactNode) => {

    return <Route exact={route.exact} path={route.route}>
        {renderRoute}
    </Route>
}

export const MainRouting = () => {

    return <Switch>

        {/* unprotected paths  */}
        <Route path={applicationRoutes.loginRoute.route} component={LoginScreen} />
        <Route path={applicationRoutes.setNewPasswordRoute.route} component={SetNewPasswordPage} />
        <Route path={applicationRoutes.registrationRoute.route} component={RegistrationPage} />
        <Route path={applicationRoutes.registerViaActivationCodeRoute.route} component={RegisterViaActivationCodePage} />

        {/* protected paths */}
        <ProtectedRoute
            route={applicationRoutes.playerRoute}
            render={() => <PlayerPage />} />

        <ProtectedRoute
            route={applicationRoutes.signupRoute}
            render={() => <SignupPage />}
            ignoreAppAccessProtection={true} />

        <ProtectedRoute
            route={applicationRoutes.administrationRoute}
            isAuthorizedToView={x => x.canAccessAdministration}
            render={() => <AdminPage />} />

        <ProtectedRoute
            route={applicationRoutes.homeRoute}
            render={() => <HomePage />} />

        <ProtectedRoute
            route={applicationRoutes.shopRoute}
            render={() => <ShopPage />} />

        <ProtectedRoute
            route={applicationRoutes.availableCoursesRoute}
            render={() => <AvailableCoursesPage />} />

        <ProtectedRoute
            route={applicationRoutes.courseDetailsRoute}
            render={() => <CourseDetailsPage />} />

        <ProtectedRoute
            route={applicationRoutes.settingsRoute}
            render={() => <UserSettingsPage />} />

        <ProtectedRoute
            route={applicationRoutes.learningRoute}
            render={() => <LearningInsightsPage />} />

        <ProtectedRoute
            route={applicationRoutes.rootHomeRoute}
            render={() => <HomePage />} />

        {/* wrong path */}
        <Route path="*">
            <NotFound />
        </Route>

    </Switch>
}
