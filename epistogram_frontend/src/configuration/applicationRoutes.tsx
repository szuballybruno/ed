import { Assignment, Business, People, Person, School, Settings, Subscriptions } from "@mui/icons-material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { translatableTexts } from "../translatableTexts";
import EventNoteIcon from '@mui/icons-material/EventNote';

export const applicationRoutes = {

    loginRoute: {
        title: translatableTexts.routeTitles.login,
        route: "/login"
    },

    underMaintanenceRoute: {
        title: translatableTexts.routeTitles.underMaintanence,
        route: "/under-maintanence"
    },

    playerRoute: {
        title: "",
        route: "/watch/:itemCode"
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

    shopRoute: {
        title: translatableTexts.routeTitles.shopPage,
        route: "/shop"
    },

    rootHomeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: "/",
        exact: true
    },

    availableCoursesRoute: {
        title: translatableTexts.routeTitles.availableCourses,
        route: "/courses",

        courseDetailsRoute: {
            title: "",
            route: "/courses/:courseId",
        },
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
            exact: true,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddCourse,
                route: "/administration/courses/add"
            },
            courseDetailsRoute: {
                title: translatableTexts.routeTitles.administrationCourseDetails,
                route: "/administration/courses/:courseId/details"
            },
            courseContentRoute: {
                title: translatableTexts.routeTitles.administrationCourseContent,
                route: "/administration/courses/:courseId/content"
            },
            statisticsCourseRoute: {
                title: translatableTexts.routeTitles.administrationCourseStatistics,
                route: "/administration/courses/:courseId/statistics"
            },
            addVideoRoute: {
                title: translatableTexts.routeTitles.administrationAddVideo,
                route: "/administration/courses/:courseId/item/add"
            },
            editVideoRoute: {
                title: translatableTexts.routeTitles.administrationEditVideo,
                route: "/administration/courses/:courseId/video/:videoId",
                exact: true,
            },
            editVideoQuestionRoute: {
                title: translatableTexts.routeTitles.administrationEditQuestion,
                route: "/administration/courses/:courseId/video/:videoId/question/:questionId"
            },
            editExamRoute: {
                title: translatableTexts.routeTitles.administrationEditExam,
                route: "/administration/courses/:courseId/exam/:examId",
                exact: true,
            },
            editExamQuestionRoute: {
                title: translatableTexts.routeTitles.administrationEditQuestion,
                route: "/administration/courses/:courseId/exam/:examId/question/:questionId"
            },
            editModuleRoute: {
                title: translatableTexts.routeTitles.administrationEditModule,
                route: "/administration/courses/:courseId/module/:moduleId"
            }
        },
        groupsRoute: {
            title: "Csoportok",
            route: "/administration/groups",
            icon: <People color={"secondary"} />,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddGroup,
                route: "/administration/groups/add"
            },
            editRoute: {
                title: translatableTexts.routeTitles.administrationEditGroup,
                route: "/administration/groups/:groupId/edit"
            },
            statisticsRoute: {
                title: translatableTexts.routeTitles.administrationGroupStatistics,
                route: "/administration/groups/:groupId/statistics"
            },
        },
        myCompanyRoute: {
            title: "Céges statisztika",
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
            icon: <Settings></Settings>,
        },

        developmentNotes: {
            title: translatableTexts.routeTitles.developmentNotes,
            route: "/settings/development-notes",
            icon: <EventNoteIcon />
        },

        featurePreviewRoute: {
            title: translatableTexts.routeTitles.featurePreview,
            route: "/settings/feature-preview",
            icon: <AutoAwesomeIcon />
        }
    }
};
