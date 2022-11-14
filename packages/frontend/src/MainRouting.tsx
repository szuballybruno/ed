import React from 'react';
import { AdminPage } from './components/administration/AdminPage';
import AvailableCoursesPage from './components/availableCourses/AvailableCoursesPage';
import CourseDetailsPage from './components/courseDetails/CourseDetailsPage';
import { ShopPage } from './components/epistoShop/ShopPage';
import HomePage from './components/home/HomePage';
import LearningInsightsPage from './components/learningInsights/LearningInsightsPage';
import LoginScreen from './components/login/LoginScreen';
import NotFound from './components/notFound/NotFound';
import { LeaderboardPage } from './components/pages/leaderboard/LeaderboardPage';
import { PlayerPage } from './components/player/PlayerPage';
import { RegisterViaActivationCodePage } from './components/RegisterViaActivationCodePage';
import { RegistrationPage } from './components/RegistrationPage';
import { SetNewPasswordPage } from './components/SetNewPasswordPage';
import { SurveyPage } from './components/survey/SurveyPage';
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
                },
                {
                    route: applicationRoutes.setNewPasswordRoute,
                    element: <SetNewPasswordPage />,
                },
                {
                    route: applicationRoutes.registrationRoute,
                    element: <RegistrationPage />,
                },
                {
                    route: applicationRoutes.registerViaActivationCodeRoute,
                    element: <RegisterViaActivationCodePage />,
                },

                // protected routes 
                {
                    route: applicationRoutes.surveyRoute,
                    element: <SurveyPage />,
                },
                {
                    route: applicationRoutes.playerRoute,
                    element: <PlayerPage />,
                },
                {
                    route: applicationRoutes.administrationRoute,
                    element: <AdminPage />
                },
                {
                    route: applicationRoutes.homeRoute,
                    element: <HomePage />,
                },
                {
                    route: applicationRoutes.shopRoute,
                    element: <ShopPage />,
                },
                {
                    route: applicationRoutes.availableCoursesRoute,
                    element: <AvailableCoursesPage />,
                },
                {
                    route: applicationRoutes.courseDetailsRoute,
                    element: <CourseDetailsPage />,
                },
                {
                    route: applicationRoutes.settingsRoute,
                    element: <UserSettingsPage />,
                },
                {
                    route: applicationRoutes.leaderboardRoute,
                    element: <LeaderboardPage />,
                },
                {
                    route: applicationRoutes.learningRoute,
                    element: <LearningInsightsPage />,
                },
                {
                    route: applicationRoutes.rootHomeRoute,
                    element: <HomePage />,
                },
                {
                    route: applicationRoutes.matchAll,
                    element: <NotFound />,
                }
            ]} />
    </>;
};
