import { Assignment, BarChart, Person, School, Settings, Subscriptions } from "@mui/icons-material";
import { translatableTexts } from "../translatableTexts";

export type RouteSection = {
    path: string;
    isExact?: boolean;
    subRoutes: RouteSection[];
}

export const applicationRoutes = {

    loginRoute: {
        title: translatableTexts.routeTitles.login,
        route: "/login"
    },

    signupRoute: {
        title: translatableTexts.routeTitles.registration,
        route: "/signup"
    },

    setNewPasswordRoute: {
        title: translatableTexts.routeTitles.setNewPassword,
        route: "/set-new-password"
    },

    homeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: "/home"
    },

    rootHomeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: "/",
        exact: true
    },

    availableCoursesRoute: {
        title: translatableTexts.routeTitles.availableCourses,
        route: "/courses"
    },

    learningRoute: {
        title: translatableTexts.routeTitles.learning,
        route: "/learning",

        learningOverviewRoute: {
            title: translatableTexts.routeTitles.learningOverview,
            route: "/learning",
            icon: <School color={"secondary"} />,
            exact: true
        },

        myCoursesRoute: {
            title: translatableTexts.routeTitles.learningCourses,
            route: "/learning/myCourses",
            icon: <Subscriptions color={"secondary"} />
        },

        myExamsRoute: {
            title: translatableTexts.routeTitles.learningExams,
            route: "/learning/myExams",
            icon: <Assignment color={"secondary"} />
        }
    },

    administrationRoute: {
        title: translatableTexts.routeTitles.administration,
        route: "/administration",

        statisticsRoute: {
            title: translatableTexts.routeTitles.administrationStatistics,
            route: "/administration",
            icon: <BarChart color={"secondary"} />,
            exact: true
        },
        usersRoute: {
            title: translatableTexts.routeTitles.administrationUserAdmin,
            route: "/administration/users",
            icon: <Person color={"secondary"} />,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddUser,
                route: "/administration/users/add"
            }
        },
        coursesRoute: {
            title: translatableTexts.routeTitles.administrationCourseAdmin,
            route: "/administration/courses",
            icon: <Subscriptions color={"secondary"} />,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddCourse,
                route: "/administration/courses/add"
            },
            editCourseRoute: {
                title: translatableTexts.routeTitles.administrationEditCourse,
                route: "/administration/courses/:courseId"
            },
            addVideoRoute: {
                title: translatableTexts.routeTitles.administrationAddVideo,
                route: "/administration/courses/:courseId/item/add"
            },
            editVideoRoute: {
                title: translatableTexts.routeTitles.administrationEditVideo,
                route: "/administration/courses/:courseId/item/:itemId"
            }
        }
    },

    settingsRoute: {
        title: translatableTexts.routeTitles.settings,
        route: "/settings",
        icon: <Settings></Settings>,

        preferencesRoute: {
            title: translatableTexts.routeTitles.settingsOverview,
            route: "/settings/preferences",
        }
    }
};