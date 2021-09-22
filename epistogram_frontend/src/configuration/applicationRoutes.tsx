import { Assignment, BarChart, Person, School, Settings, Subscriptions } from "@mui/icons-material";

export type RouteSection = {
    path: string;
    isExact?: boolean;
    subRoutes: RouteSection[];
}

export const applicationRoutes = {

    loginRoute: {
        title: "Bejelentkezés",
        route: "/login"
    },

    signupRoute: {
        title: "Regisztráció",
        route: "/signup"
    },

    homeRoute: {
        title: "Kezdőlap",
        route: "/home"
    },

    rootHomeRoute: {
        title: "Kezdőlap",
        route: "/",
        exact: true
    },

    availableCoursesRoute: {
        title: "Tanfolyamkereső",
        route: "/courses"
    },

    learningRoute: {
        title: "Tanulás",
        route: "/learning",

        learningOverviewRoute: {
            title: "Áttekintés",
            route: "/learning",
            icon: <School color={"secondary"} />,
            exact: true
        },

        myCoursesRoute: {
            title: "Kurzusaim",
            route: "/learning/myCourses",
            icon: <Subscriptions color={"secondary"} />
        },

        myExamsRoute: {
            title: "Vizsgáim",
            route: "/learning/myExams",
            icon: <Assignment color={"secondary"} />
        }
    },

    administrationRoute: {
        title: "Adminisztracio",
        route: "/administration",

        statisticsRoute: {
            title: "Statisztika",
            route: "/administration",
            icon: <BarChart color={"secondary"} />,
            exact: true
        },
        usersRoute: {
            title: "Felhasználók kezelése",
            route: "/administration/users",
            icon: <Person color={"secondary"} />,

            addRoute: {
                title: "Felhasznalo hozzaadasa",
                route: "/administration/users/add"
            }
        },
        coursesRoute: {
            title: "Kurzusok kezelése",
            route: "/administration/courses",
            icon: <Subscriptions color={"secondary"} />,

            addRoute: {
                title: "Kurzus hozzaadasa",
                route: "/administration/courses/add"
            },
            editCourseRoute: {
                title: "Kurzus szerkesztese",
                route: "/administration/courses/:courseId"
            },
            addVideoRoute: {
                title: "Kurzus szerkesztese",
                route: "/administration/courses/:courseId/item/add"
            },
            editVideoRoute: {
                title: "Kurzus szerkesztese",
                route: "/administration/courses/:courseId/item/:itemId"
            }
        }
    },

    settingsRoute: {
        title: "Beállítások",
        route: "/settings",
        icon: <Settings></Settings>,

        preferencesRoute: {
            title: "Általános",
            route: "/settings/preferences",
        },

        displayRoute: {
            title: "Megjelenítés",
            route: "/settings/display",
        },

        securityRoute: {
            title: "Biztonság",
            route: "/settings/security",
        },

        notificationsRoute: {
            title: "Értesítések",
            route: "/settings/notifications",
        }
    }
};