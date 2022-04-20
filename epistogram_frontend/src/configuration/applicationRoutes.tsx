import { AdminPanelSettings, Business, Home, Person, School, Search, Settings, Subscriptions } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { ApplicationRoute, EpistoRoute } from '../models/types';
import { assetCDNStorageUrl } from '../static/Environemnt';
import { getAssetUrl as old } from '../static/frontendHelpers';
import { translatableTexts } from '../static/translatableTexts';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

const getAssetUrl = (path: string) => old(path, assetCDNStorageUrl);

export type ApplicationRoutesType = {
    matchAll: ApplicationRoute;
    loginRoute: ApplicationRoute;
    underMaintanenceRoute: ApplicationRoute;
    registrationRoute: ApplicationRoute;
    signupRoute: ApplicationRoute;
    setNewPasswordRoute: ApplicationRoute;
    registerViaActivationCodeRoute: ApplicationRoute;
    homeRoute: ApplicationRoute;
    rootHomeRoute: ApplicationRoute;
    shopRoute: ApplicationRoute;
    availableCoursesRoute: ApplicationRoute;
    courseDetailsRoute: ApplicationRoute;
    playerRoute: ApplicationRoute & {
        watchRoute: ApplicationRoute;
        prequizRoute: ApplicationRoute;
        pretestRoute: ApplicationRoute;
        pretestResultsRoute: ApplicationRoute;
        courseRatingRoute: ApplicationRoute;
        courseOverviewRoute: ApplicationRoute;
    };
    learningRoute: ApplicationRoute & {
        overview: ApplicationRoute;
        myStatisticsRoute: ApplicationRoute;
        myCoursesRoute: ApplicationRoute;
        myExamsRoute: ApplicationRoute;
    };
    administrationRoute: ApplicationRoute & {
        homeRoute: ApplicationRoute & {
            overviewRoute: ApplicationRoute;
            detailsRoute: ApplicationRoute;
        };
        usersRoute: ApplicationRoute & {
            addRoute: ApplicationRoute;
            editRoute: ApplicationRoute;
            statsRoute: ApplicationRoute;
            teacherInfoRoute: ApplicationRoute;
            courseContentRoute: ApplicationRoute;
        };
        coursesRoute: ApplicationRoute & {
            landingRoute: ApplicationRoute;
            addRoute: ApplicationRoute;
            courseDetailsRoute: ApplicationRoute;
            courseContentRoute: ApplicationRoute;
            statisticsCourseRoute: ApplicationRoute;
            courseUserProgressRoute: ApplicationRoute;
            interactiveCourseRoute: ApplicationRoute;
        };
        shopRoute: ApplicationRoute & {
            overview: ApplicationRoute;
            addRoute: ApplicationRoute;
            editRoute: ApplicationRoute;
        };
        personalityAssessmentRoute: ApplicationRoute & {
            editTips: ApplicationRoute & {
                editTip: ApplicationRoute;
            };
        };
        myCompanyRoute: ApplicationRoute;
        companiesRoute: ApplicationRoute & {
            indexRoute: ApplicationRoute;
            editCompanyRoute: ApplicationRoute;
        };
        rolesRoute: ApplicationRoute;
    };
    settingsRoute: ApplicationRoute & {
        preferencesRoute: ApplicationRoute;
        developmentNotes: ApplicationRoute;
        featurePreviewRoute: ApplicationRoute;
        coinTransactionsRoute: ApplicationRoute;
    };
};

export const applicationRoutes: ApplicationRoutesType = {

    matchAll: {
        title: 'Match all',
        route: new EpistoRoute('', '*')
    },

    loginRoute: {
        title: translatableTexts.routeTitles.login,
        route: new EpistoRoute('/', 'login'),
    },

    underMaintanenceRoute: {
        title: translatableTexts.routeTitles.underMaintanence,
        route: new EpistoRoute('/', 'under-maintanence'),
    },

    registrationRoute: {
        title: translatableTexts.routeTitles.registration,
        route: new EpistoRoute('/', 'registration'),
    },

    signupRoute: {
        title: translatableTexts.routeTitles.registration,
        route: new EpistoRoute('/', 'signup'),
    },

    setNewPasswordRoute: {
        title: translatableTexts.routeTitles.setNewPassword,
        route: new EpistoRoute('/', 'set-new-password'),
    },

    registerViaActivationCodeRoute: {
        title: translatableTexts.routeTitles.registerViaActivationCode,
        route: new EpistoRoute('/', 'register-via-activation-code'),
    },

    homeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: new EpistoRoute('/', 'home'),
        icon: <Home />
    },

    shopRoute: {
        title: translatableTexts.routeTitles.shopPage,
        route: new EpistoRoute('/', 'shop'),
    },

    rootHomeRoute: {
        title: translatableTexts.routeTitles.homePage,
        route: new EpistoRoute('', '/'),
    },

    availableCoursesRoute: {
        title: translatableTexts.routeTitles.availableCourses,
        route: new EpistoRoute('/', 'courses'),
        icon: <Search />
    },

    courseDetailsRoute: {
        title: '',
        route: new EpistoRoute('/', 'course-details/:courseId'),
    },

    playerRoute: {
        title: translatableTexts.routeTitles.player,
        route: new EpistoRoute('/', 'watch', '*'),

        watchRoute: {
            title: translatableTexts.routeTitles.player,
            route: new EpistoRoute('/watch', ':descriptorCode'),
        },

        prequizRoute: {
            title: translatableTexts.routeTitles.prequiz,
            route: new EpistoRoute('/watch', 'prequiz/:courseId'),
        },

        pretestRoute: {
            title: translatableTexts.routeTitles.pretest,
            route: new EpistoRoute('/watch', 'pretest/:courseId'),
        },

        pretestResultsRoute: {
            title: translatableTexts.routeTitles.pretestResults,
            route: new EpistoRoute('/watch', 'pretest-results/:courseId'),
        },

        courseRatingRoute: {
            title: translatableTexts.routeTitles.player,
            route: new EpistoRoute('/watch', 'course-rating/:courseId'),
        },

        courseOverviewRoute: {
            title: translatableTexts.routeTitles.courseOverview,
            route: new EpistoRoute('/watch', 'course-overview/:courseId'),
        },
    },

    learningRoute: {
        title: translatableTexts.routeTitles.learning,
        route: new EpistoRoute('/', 'learning', '*'),
        icon: <School />,

        overview: {
            title: translatableTexts.routeTitles.learningOverview,
            route: new EpistoRoute('/learning', 'overview'),
            icon: <img
                src={getAssetUrl('images/overview3D.png')}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: 'contain'
                }} />
        },

        myStatisticsRoute: {
            title: translatableTexts.routeTitles.learningStatistics,
            route: new EpistoRoute('/learning', 'myStatistics'),
            icon: <img
                src={getAssetUrl('images/mystatsicon3D.png')}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: 'contain'
                }} />,
        },

        myCoursesRoute: {
            title: translatableTexts.routeTitles.learningCourses,
            route: new EpistoRoute('/learning', 'myCourses'),
            icon: <img
                src={getAssetUrl('images/watchedvideos3Dsmaller.png')}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: 'contain'
                }} />,
        },

        myExamsRoute: {
            title: translatableTexts.routeTitles.learningExams,
            route: new EpistoRoute('/learning', 'myExams'),
            icon: <img
                src={getAssetUrl('images/examsicon3D.png')}
                alt=""
                style={{
                    width: 45,
                    height: 45,
                    objectFit: 'contain'
                }} />,
        }
    },

    administrationRoute: {
        title: translatableTexts.routeTitles.administration,
        route: new EpistoRoute('/', 'administration', '*'),
        icon: <AdminPanelSettings />,

        homeRoute: {
            title: translatableTexts.routeTitles.administrationHome,
            route: new EpistoRoute('/administration', 'home', '*'),
            icon: <Home className="fontXXL"
                color={'secondary'} />,

            overviewRoute: {
                title: translatableTexts.routeTitles.administrationHomeOverview,
                route: new EpistoRoute('/administration/home', 'overview'),
                icon: <Home className="fontXXL"
                    color={'secondary'} />
            },
            detailsRoute: {
                title: translatableTexts.routeTitles.administrationHomeDetails,
                route: new EpistoRoute('/administration/home', 'details'),
            },
        },

        usersRoute: {
            title: translatableTexts.routeTitles.administrationUserAdmin,
            route: new EpistoRoute('/administration', 'users', '*'),
            icon: <Person className="fontXXL"
                color={'secondary'} />,

            addRoute: {
                title: translatableTexts.routeTitles.administrationAddUser,
                route: new EpistoRoute('/administration/users', 'add'),
            },

            editRoute: {
                title: translatableTexts.routeTitles.administrationEditUser,
                route: new EpistoRoute('/administration/users', ':userId/edit'),
                icon: <Person className="fontXXL"
                    color={'secondary'} />,
            },

            statsRoute: {
                title: translatableTexts.routeTitles.administrationUserStatistics,
                route: new EpistoRoute('/administration/users', ':userId/statistics'),
            },

            teacherInfoRoute: {
                title: translatableTexts.routeTitles.administrationEditTeacherInfo,
                route: new EpistoRoute('/administration/users', ':userId/teacherinfo'),
            },

            courseContentRoute: {
                title: translatableTexts.routeTitles.administrationUserCourses,
                route: new EpistoRoute('/administration/users', ':userId/courses'),
            },
        },

        coursesRoute: {
            title: translatableTexts.routeTitles.administrationCourseAdmin,
            route: new EpistoRoute('/administration', 'courses', '*'),
            icon: <Subscriptions className="fontXXL"
                color={'secondary'} />,

            landingRoute: {
                title: translatableTexts.routeTitles.administrationCourseAdmin,
                route: new EpistoRoute('/administration/courses', '/')
            },
            addRoute: {
                title: translatableTexts.routeTitles.administrationAddCourse,
                route: new EpistoRoute('/administration/courses', 'add'),
            },
            courseDetailsRoute: {
                title: translatableTexts.routeTitles.administrationCourseDetails,
                route: new EpistoRoute('/administration/courses', ':courseId/details'),
                icon: <Subscriptions className="fontXXL"
                    color={'secondary'} />,
            },
            courseContentRoute: {
                title: translatableTexts.routeTitles.administrationCourseContent,
                route: new EpistoRoute('/administration/courses', ':courseId/content'),
            },
            statisticsCourseRoute: {
                title: translatableTexts.routeTitles.administrationCourseStatistics,
                route: new EpistoRoute('/administration/courses', ':courseId/statistics'),
            },
            courseUserProgressRoute: {
                title: translatableTexts.routeTitles.administrationCourseUserProgress,
                route: new EpistoRoute('/administration/courses', ':courseId/userprogress'),
            },
            interactiveCourseRoute: {
                title: translatableTexts.routeTitles.administrationInteractiveCourse,
                route: new EpistoRoute('/administration/courses', ':courseId/editinteractive'),
            }
        },

        shopRoute: {
            title: translatableTexts.routeTitles.administrationShopMain,
            route: new EpistoRoute('/administration', 'shop', '*'),
            icon: <ShoppingCartIcon className="fontXXL"
                color={'secondary'} />,

            overview: {
                title: translatableTexts.routeTitles.administrationShopAdd,
                route: new EpistoRoute('/administration/shop', 'overview'),
            },

            addRoute: {
                title: translatableTexts.routeTitles.administrationShopAdd,
                route: new EpistoRoute('/administration/shop', 'add'),
            },

            editRoute: {
                title: translatableTexts.routeTitles.administrationShopEdit,
                route: new EpistoRoute('/administration/shop', 'edit/:shopItemId'),
            }
        },

        personalityAssessmentRoute: {
            title: translatableTexts.routeTitles.administrationPersonalityAssessmentMain,
            route: new EpistoRoute('/administration', 'personality-assessment', '*'),
            icon: <SupervisedUserCircleIcon
                className="fontXXL"
                color={'secondary'} />,

            editTips: {
                title: translatableTexts.routeTitles.administrationPersonalityAssessmentTips,
                route: new EpistoRoute('/administration/personality-assessment', ':traitCategoryId/:isMax'),

                editTip: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentTip,
                    route: new EpistoRoute('/administration/personality-assessment/:traitCategoryId/:isMax', 'tip/:dailyTipId'),
                }
            },
        },

        myCompanyRoute: {
            title: 'Céges statisztika',
            route: new EpistoRoute('/administration', 'mycompany'),
            icon: <Business className="fontXXL"
                color={'secondary'} />
        },

        companiesRoute: {
            title: 'Cégek',
            route: new EpistoRoute('/administration', 'companies', '*'),
            icon: <LocationCityIcon
                className="fontXXL"
                color={'secondary'} />,

            indexRoute: {
                title: 'Cégek',
                route: new EpistoRoute('/administration/companies', '/')
            },
            editCompanyRoute: {
                title: 'Cég szerkesztese',
                route: new EpistoRoute('/administration/companies', '/:companyId/edit')
            },
        },

        rolesRoute: {
            title: 'Roles',
            route: new EpistoRoute('/administration', 'roles'),
            icon: <LocalPoliceIcon
                className="fontXXL"
                color={'secondary'} />
        }
    },

    settingsRoute: {
        title: translatableTexts.routeTitles.settings,
        route: new EpistoRoute('/administration', 'settings', '*'),
        icon: <Settings></Settings>,

        preferencesRoute: {
            title: translatableTexts.routeTitles.settingsOverview,
            route: new EpistoRoute('/administration/settings', 'preferences'),
            icon: <Settings></Settings>,
        },

        developmentNotes: {
            title: translatableTexts.routeTitles.developmentNotes,
            route: new EpistoRoute('/administration/settings', 'development-notes'),
            icon: <EventNoteIcon />
        },

        featurePreviewRoute: {
            title: translatableTexts.routeTitles.featurePreview,
            route: new EpistoRoute('/administration/settings', 'feature-preview'),
            icon: <AutoAwesomeIcon />
        },

        coinTransactionsRoute: {
            title: translatableTexts.routeTitles.coinTransactions,
            route: new EpistoRoute('/administration/settings', 'coin-transactions'),
            icon: <AttachMoneyIcon />
        }
    }
};
