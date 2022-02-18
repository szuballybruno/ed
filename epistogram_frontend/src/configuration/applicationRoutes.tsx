import { AdminPanelSettings, Assignment, Business, Equalizer, GraphicEq, Home, People, Person, School, Search, Settings, Subscriptions } from "@mui/icons-material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { translatableTexts } from "../static/translatableTexts";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getAssetUrl } from "../static/frontendHelpers";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

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
        title: translatableTexts.routeTitles.player,
        route: "/watch",

        watchRoute: {
            title: translatableTexts.routeTitles.player,
            route: "/watch/:descriptorCode",
            exact: true
        },

        prequizRoute: {
            title: translatableTexts.routeTitles.prequiz,
            route: "/watch/prequiz/:courseId",
            exact: true
        },

        pretestRoute: {
            title: translatableTexts.routeTitles.pretest,
            route: "/watch/pretest/:courseId",
            exact: true
        },

        pretestResultsRoute: {
            title: translatableTexts.routeTitles.pretestResults,
            route: "/watch/pretest-results/:courseId",
            exact: true
        },
    
        courseRatingRoute: {
            title: translatableTexts.routeTitles.player,
            route: "/watch/course-rating/:courseId"
        },
    
        courseOverviewRoute: {
            title: translatableTexts.routeTitles.courseOverview,
            route: "/watch/course-overview/:courseId"
        },
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

    registerViaActivationCodeRoute: {
        title: translatableTexts.routeTitles.registerViaActivationCode,
        route: "/register-via-activation-code"
    },

    homeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: "/home",
        icon: <Home />
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
        icon: <Search />
    },

    courseDetailsRoute: {
        title: "",
        route: "/course-details/:courseId",
    },

    learningRoute: {
        title: translatableTexts.routeTitles.learning,
        route: "/learning",
        icon: <School />,

        learningOverviewRoute: {
            title: translatableTexts.routeTitles.learningOverview,
            route: "/learning",
            icon: <img
                src={getAssetUrl("images/overview3D.png")}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: "contain"
                }} />,
            exact: true
        },

        myStatisticsRoute: {
            title: translatableTexts.routeTitles.learningStatistics,
            route: "/learning/myStatistics",
            icon: <img
                src={getAssetUrl("images/mystatsicon3D.png")}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: "contain"
                }} />,
        },

        myCoursesRoute: {
            title: translatableTexts.routeTitles.learningCourses,
            route: "/learning/myCourses",
            icon: <img
                src={getAssetUrl("images/watchedvideos3Dsmaller.png")}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: "contain"
                }} />,
        },

        myExamsRoute: {
            title: translatableTexts.routeTitles.learningExams,
            route: "/learning/myExams",
            icon: <img
                src={getAssetUrl("images/examsicon3D.png")}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: "contain"
                }} />,
        }
    },

    administrationRoute: {
        title: translatableTexts.routeTitles.administration,
        route: "/administration",
        icon: <AdminPanelSettings />,

        usersRoute: {
            title: translatableTexts.routeTitles.administrationUserAdmin,
            route: "/administration/users",
            icon: <Person className="fontXXL" color={"secondary"} />,

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

            teacherInfoRoute: {
                title: translatableTexts.routeTitles.administrationEditTeacherInfo,
                route: "/administration/users/:userId/teacherinfo"
            }
        },

        coursesRoute: {
            title: translatableTexts.routeTitles.administrationCourseAdmin,
            route: "/administration/courses",
            icon: <Subscriptions className="fontXXL" color={"secondary"} />,
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
            videoStatsRoute: {
                title: translatableTexts.routeTitles.administrationVideoStatistics,
                route: "/administration/courses/:courseId/video/:videoId/stats"
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

        shopRoute: {
            title: translatableTexts.routeTitles.administrationShopMain,
            route: "/administration/shop",
            icon: <ShoppingCartIcon className="fontXXL" color={"secondary"} />,
            exact: true,

            addRoute: {
                title: translatableTexts.routeTitles.administrationShopAdd,
                route: "/administration/shop/add"
            },

            editRoute: {
                title: translatableTexts.routeTitles.administrationShopEdit,
                route: "/administration/shop/edit/:shopItemId"
            }
        },

        personalityAssessmentRoute: {
            title: translatableTexts.routeTitles.administrationPersonalityAssessmentMain,
            route: "/administration/personality-assessment",
            icon: <SupervisedUserCircleIcon className="fontXXL" color={"secondary"} />,
            exact: true,

            editTips: {
                title: translatableTexts.routeTitles.administrationPersonalityAssessmentTips,
                route: "/administration/personality-assessment/:traitCategoryId/:isMax/",
                exact: true,

                editTip: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentTip,
                    route: "/administration/personality-assessment/:traitCategoryId/:isMax/tip/:dailyTipId"
                }
            },
        },

        myCompanyRoute: {
            title: "Céges statisztika",
            route: "/administration/mycompany",
            icon: <Business className="fontXXL" color={"secondary"} />,
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
        },

        coinTransactionsRoute: {
            title: translatableTexts.routeTitles.coinTransactions,
            route: "/settings/coin-transactions",
            icon: <AttachMoneyIcon />
        }
    }
}
