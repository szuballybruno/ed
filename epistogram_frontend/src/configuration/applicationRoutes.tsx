import { Assignment, BarChart, Person, School, Settings, Subscriptions, Business, People } from "@mui/icons-material";
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

    registrationRoute: {
        title: translatableTexts.routeTitles.registration,
        route: "/registration"
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

        usersRoute: {
            title: translatableTexts.routeTitles.administrationUserAdmin,
            route: "/administration/users",
            icon: <Person color={"secondary"} />,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddUser,
                route: "/administration/users/add"
            },

            editRoute: {
                title: translatableTexts.routeTitles.administrationEditUser,
                route: "/administration/users/:userId/edit"
            },

            statsRoute: {
                title: translatableTexts.routeTitles.administrationUserStatistics,
                route: "/administration/users/:userId/statistics"
            },

            tasksRoute: {
                title: translatableTexts.routeTitles.administrationUserTasks,
                route: "/administration/users/:userId/tasks"
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
        },
        groupsRoute: {
            title: "Csoportok",
            route: "/administration/groups",
            icon: <People color={"secondary"} />,
            exact: true
        },
        myCompanyRoute: {
            title: "Cégem",
            route: "/administration/mycompany",
            icon: <Business color={"secondary"} />,
            exact: true
        },
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
