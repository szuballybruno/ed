import React from 'react';
import { AdminPage } from './components/administration/AdminPage';
import AvailableCoursesPage from './components/AvailableCoursesPage';
import CourseDetailsPage from './components/courseDetails/CourseDetailsPage';
import { ShopPage } from './components/epistoShop/ShopPage';
import HomePage from './components/home/HomePage';
import LearningInsightsPage from './components/learningInsights/LearningInsightsPage';
import LoginScreen from './components/login/LoginScreen';
import NotFound from './components/notFound/NotFound';
import { PlayerPage } from './components/player/PlayerPage';
import { RegisterViaActivationCodePage } from './components/RegisterViaActivationCodePage';
import { RegistrationPage } from './components/RegistrationPage';
import { SetNewPasswordPage } from './components/SetNewPasswordPage';
import { SignupPage } from './components/signup/SignupPage';
import { EpistoRoutes } from './components/universal/EpistoRoutes';
import { UserSettingsPage } from './components/userSettings/UserSettingsPage';
import { applicationRoutes } from './configuration/applicationRoutes';

export const MainRouting = () => {

    return <>

        {/* unprotected paths  */}
        <EpistoRoutes
            renderRoutes={[

                // open routes 
                {
                    route: applicationRoutes.loginRoute,
                    element: <LoginScreen />,
                    protectionLevel: 'open'
                },
                {
                    route: applicationRoutes.setNewPasswordRoute,
                    element: <SetNewPasswordPage />,
                    protectionLevel: 'open'
                },
                {
                    route: applicationRoutes.registrationRoute,
                    element: <RegistrationPage />,
                    protectionLevel: 'open'
                },
                {
                    route: applicationRoutes.registerViaActivationCodeRoute,
                    element: < RegisterViaActivationCodePage />,
                    protectionLevel: 'open'
                },

                // protected routes 
                {
                    route: applicationRoutes.signupRoute,
                    element: <SignupPage />,
                    protectionLevel: 'justAuthenticate'
                },
                {
                    route: applicationRoutes.playerRoute,
                    element: <PlayerPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.administrationRoute,
                    element: <AdminPage />,
                    protectionLevel: 'authorize',
                    isAuthorizedToView: x => x.canAccessAdministration
                },
                {
                    route: applicationRoutes.homeRoute,
                    element: <HomePage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.shopRoute,
                    element: <ShopPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.availableCoursesRoute,
                    element: <AvailableCoursesPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.courseDetailsRoute,
                    element: <CourseDetailsPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.settingsRoute,
                    element: <UserSettingsPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.learningRoute,
                    element: <LearningInsightsPage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: applicationRoutes.rootHomeRoute,
                    element: <HomePage />,
                    protectionLevel: 'authorize'
                },
                {
                    route: { route: '*', title: 'Not found' },
                    element: <NotFound />,
                    protectionLevel: 'open'
                }
            ]} />
    </>;
};
