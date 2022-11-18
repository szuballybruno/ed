import { CourseUserPresetType, Id, LeaderboardPeriodType } from '@episto/commontypes';
import { AdminPanelSettings, Build, Business, Equalizer, Home, Person, School, Search, Settings, Subscriptions } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { UserDataGridPresetType } from '../components/administration/users/AminUserGridView';
import { ApplicationRoute, EpistoRoute } from '../models/types';
import { Environment } from '../static/Environemnt';
import { EpistoIcons } from '../static/EpistoIcons';
import { translatableTexts } from '../static/translatableTexts';
import SortIcon from '@mui/icons-material/Sort';

export type ApplicationRoutesType = {
    matchAll: ApplicationRoute;
    loginRoute: ApplicationRoute<any, any>;
    underMaintanenceRoute: ApplicationRoute;
    registrationRoute: ApplicationRoute<{ token: string, isInvited: boolean }>;
    surveyRoute: ApplicationRoute;
    setNewPasswordRoute: ApplicationRoute<void, { token: string }>;
    registerViaActivationCodeRoute: ApplicationRoute<void, { activationCode?: string }>;
    homeRoute: ApplicationRoute;
    rootHomeRoute: ApplicationRoute;
    shopRoute: ApplicationRoute;
    availableCoursesRoute: ApplicationRoute;
    courseDetailsRoute: ApplicationRoute<{ courseId: Id<'Course'> }, { descriptorCode: string }>;
    playerRoute: ApplicationRoute & {
        greetingRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        watchRoute: ApplicationRoute<{ descriptorCode: string }>;
        prequizRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        pretestRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        pretestGreetingRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        pretestResultsRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        courseRatingRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
        courseOverviewRoute: ApplicationRoute<{ courseId: Id<'Course'> }>;
    };
    leaderboardRoute: ApplicationRoute<void, { preset?: LeaderboardPeriodType }>;
    learningRoute: ApplicationRoute & {
        overviewRoute: ApplicationRoute;
        myStatisticsRoute: ApplicationRoute;
        myCoursesRoute: ApplicationRoute;
        myExamsRoute: ApplicationRoute;
    };
    administrationRoute: ApplicationRoute & {
        statsRoute: ApplicationRoute & {
            overviewRoute: ApplicationRoute;
            detailsRoute: ApplicationRoute;
        };
        usersRoute: ApplicationRoute<void, { preset?: UserDataGridPresetType }> & {
            indexRoute: ApplicationRoute;
            addRoute: ApplicationRoute;
            userRoute: ApplicationRoute<{ userId: Id<'User'> }> & {
                editRoute: ApplicationRoute<{ userId: Id<'User'> }>;
                statsRoute: ApplicationRoute<{ userId: Id<'User'> }>;
                teacherInfoRoute: ApplicationRoute<{ userId: Id<'User'> }>;
                courseContentRoute: ApplicationRoute<{ userId: Id<'User'> }>;
            };
        };
        coursesRoute: ApplicationRoute & {
            landingRoute: ApplicationRoute;
            addRoute: ApplicationRoute;
            courseDetailsRoute: ApplicationRoute;
            courseContentRoute: ApplicationRoute;
            statisticsCourseRoute: ApplicationRoute;
            courseUserProgressRoute: ApplicationRoute<{ courseId: Id<'Course'> }, { preset?: CourseUserPresetType }>;
            interactiveCourseRoute: ApplicationRoute;
        };
        shopRoute: ApplicationRoute & {
            overviewRoute: ApplicationRoute;
            addRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ shopItemId: Id<'ShopItem'> }>;
        };
        personalityAssessmentRoute: ApplicationRoute & {
            indexRoute: ApplicationRoute,
            editTipsRoute: ApplicationRoute<{ traitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean }> & {
                editTipRoute: ApplicationRoute<{ traitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean, dailyTipId: Id<'DailyTip'> }>;
            };
        };
        myCompanyRoute: ApplicationRoute;
        companiesRoute: ApplicationRoute & {
            indexRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
            coursesRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
            activationCodesRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
        };
        rolesRoute: ApplicationRoute & {
            indexRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ roleId: Id<'Role'> }>;
        };
        activationCodesRoute: ApplicationRoute;
        debugRoute: ApplicationRoute & {
            indexRoute: ApplicationRoute;
        };
    };
    settingsRoute: ApplicationRoute & {
        preferencesRoute: ApplicationRoute;
        featurePreviewRoute: ApplicationRoute;
        coinTransactionsRoute: ApplicationRoute;
    };
};

export const getApplicationRoutes = () => {

    const applicationRoutes: ApplicationRoutesType = {

        matchAll: {
            title: 'Match all',
            route: new EpistoRoute('', '*')
        },

        loginRoute: {
            title: translatableTexts.routeTitles.login,
            route: new EpistoRoute('/', 'login'),
            isUnauthorized: true
        },

        underMaintanenceRoute: {
            title: translatableTexts.routeTitles.underMaintanence,
            route: new EpistoRoute('/', 'under-maintanence'),
        },

        registrationRoute: {
            title: translatableTexts.routeTitles.registration,
            route: new EpistoRoute('/', 'registration'),
            isUnauthorized: true,
        },

        surveyRoute: {
            title: translatableTexts.routeTitles.survey,
            route: new EpistoRoute('/', 'survey'),
            ignoreAccessAppRestriction: true
        },

        setNewPasswordRoute: {
            title: translatableTexts.routeTitles.setNewPassword,
            route: new EpistoRoute('/', 'set-new-password'),
            isUnauthorized: true
        },

        registerViaActivationCodeRoute: {
            title: translatableTexts.routeTitles.registerViaActivationCode,
            route: new EpistoRoute('/', 'register-via-activation-code'),
            isUnauthorized: true
        },

        homeRoute: {
            title: translatableTexts.routeTitles.homePage,
            route: new EpistoRoute('/', 'home'),
            icon: <Home />
        },

        shopRoute: {
            title: translatableTexts.routeTitles.shopPage,
            route: new EpistoRoute('/', 'shop')
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

            greetingRoute: {
                title: translatableTexts.routeTitles.prequizGreeting,
                route: new EpistoRoute('/watch', 'greeting/:courseId')
            },

            prequizRoute: {
                title: translatableTexts.routeTitles.prequiz,
                route: new EpistoRoute('/watch', 'prequiz/:courseId'),
            },

            pretestRoute: {
                title: translatableTexts.routeTitles.pretest,
                route: new EpistoRoute('/watch', 'pretest/:courseId'),
            },

            pretestGreetingRoute: {
                title: translatableTexts.routeTitles.pretestGreeting,
                route: new EpistoRoute('/watch', 'pretest-greeting/:courseId'),
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

        leaderboardRoute: {
            title: translatableTexts.routeTitles.leaderboard,
            route: new EpistoRoute('/', 'leaderboard'),
            icon: <SortIcon />
        },

        learningRoute: {
            title: translatableTexts.routeTitles.learning,
            route: new EpistoRoute('/', 'learning', '*'),
            icon: <School />,

            overviewRoute: {
                title: translatableTexts.routeTitles.learningOverview,
                route: new EpistoRoute('/learning', 'overview'),
                icon: <img
                    src={Environment.getAssetUrl('images/overview3D.png')}
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
                    src={Environment.getAssetUrl('images/mystatsicon3D.png')}
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
                    src={Environment.getAssetUrl('images/watchedvideos3Dsmaller.png')}
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
                    src={Environment.getAssetUrl('images/examsicon3D.png')}
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

            statsRoute: {
                title: translatableTexts.routeTitles.administrationHomeOverview,
                route: new EpistoRoute('/administration', 'stats'),
                icon: <Equalizer className="fontXXL"
                    color={'secondary'} />,

                overviewRoute: {
                    title: translatableTexts.routeTitles.administrationHomeOverview,
                    route: new EpistoRoute('/administration/users', 'add'),
                },

                detailsRoute: {
                    title: translatableTexts.routeTitles.administrationHomeDetails,
                    route: new EpistoRoute('/administration/users', 'add'),
                },
            },

            usersRoute: {
                title: translatableTexts.routeTitles.administrationUserAdmin,
                route: new EpistoRoute('/administration', 'users', '*'),
                icon: <Person className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: translatableTexts.routeTitles.administrationUserIndex,
                    route: new EpistoRoute('/administration/users', ''),
                },
                addRoute: {
                    title: translatableTexts.routeTitles.administrationAddUser,
                    route: new EpistoRoute('/administration/users', 'add'),
                },
                userRoute: {
                    title: translatableTexts.routeTitles.administrationEditUser,
                    route: new EpistoRoute('/administration/users', ':userId', '*'),
                    icon: <Person className="fontXXL"
                        color={'secondary'} />,

                    editRoute: {
                        title: translatableTexts.routeTitles.administrationEditUser,
                        route: new EpistoRoute('/administration/users/:userId', ''),
                        icon: <Person className="fontXXL"
                            color={'secondary'} />,
                    },
                    statsRoute: {
                        title: translatableTexts.routeTitles.administrationUserStatistics,
                        route: new EpistoRoute('/administration/users/:userId', 'statistics'),
                    },
                    teacherInfoRoute: {
                        title: translatableTexts.routeTitles.administrationEditTeacherInfo,
                        route: new EpistoRoute('/administration/users/:userId', 'teacherinfo'),
                    },
                    courseContentRoute: {
                        title: translatableTexts.routeTitles.administrationUserCourses,
                        route: new EpistoRoute('/administration/users/:userId', 'courses'),
                    },
                },
            },

            coursesRoute: {
                title: translatableTexts.routeTitles.administrationCourseAdmin,
                route: new EpistoRoute('/administration', 'courses', '*'),
                icon: <Subscriptions
                    className="fontXXL"
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

                overviewRoute: {
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

                indexRoute: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentMain,
                    route: new EpistoRoute('/administration/personality-assessment', ''),
                },

                editTipsRoute: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentTips,
                    route: new EpistoRoute('/administration/personality-assessment', ':traitCategoryId/:isMax'),

                    editTipRoute: {
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
                editRoute: {
                    title: 'Cég szerkesztese',
                    route: new EpistoRoute('/administration/companies', '/:companyId/edit')
                },
                coursesRoute: {
                    title: 'Ceg kurzusai',
                    route: new EpistoRoute('/administration/companies', '/:companyId/company-associated-courses')
                },
                activationCodesRoute: {
                    title: 'Aktivációs kódok',
                    route: new EpistoRoute('/administration/companies', '/:companyId/activation-codes')
                }
            },

            rolesRoute: {
                title: 'Roles',
                route: new EpistoRoute('/administration', 'roles'),
                icon: <LocalPoliceIcon
                    className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: 'Roles',
                    route: new EpistoRoute('/administration/roles', '/')
                },
                editRoute: {
                    title: 'Role edit',
                    route: new EpistoRoute('/administration/roles', '/:roleId/edit')
                },
            },

            activationCodesRoute: {
                title: 'Activation Codes',
                route: new EpistoRoute('/administration', 'activation-codes'),
                icon: <EpistoIcons.Link
                    className="fontXXL"
                    color={'secondary'} />
            },

            debugRoute: {
                title: 'Debug',
                route: new EpistoRoute('/administration', 'debug'),
                icon: <Build
                    className='fontXXL'
                    color='secondary' />,
                indexRoute: {
                    title: 'Debug',
                    route: new EpistoRoute('/administration/roles', '/')
                },
            }
        },

        settingsRoute: {
            title: translatableTexts.routeTitles.settings,
            route: new EpistoRoute('/', 'settings', '*'),
            icon: <Settings></Settings>,

            preferencesRoute: {
                title: translatableTexts.routeTitles.settingsOverview,
                route: new EpistoRoute('/settings', '/'),
                icon: <Settings></Settings>,
            },

            featurePreviewRoute: {
                title: translatableTexts.routeTitles.featurePreview,
                route: new EpistoRoute('/settings', 'feature-preview'),
                icon: <AutoAwesomeIcon />
            },

            coinTransactionsRoute: {
                title: translatableTexts.routeTitles.coinTransactions,
                route: new EpistoRoute('/settings', 'coin-transactions'),
                icon: <AttachMoneyIcon />
            }
        }
    };

    const setNames = (routes: ApplicationRoute<any, any>) => {

        Object
            .keys(routes)
            .filter(key => !!routes[key].route)
            .forEach(key => {

                const route = routes[key] as ApplicationRoute<any, any>;
                route.name = key;

                setNames(route);
            });
    };

    const rootRoute: ApplicationRoute<any> = {
        route: new EpistoRoute('', '/', '*'),
        title: 'Root',
        name: 'root',
        ...applicationRoutes
    };

    setNames(rootRoute);

    return {
        applicationRoutes,
        rootRoute
    };
};

const routes = getApplicationRoutes();
export const applicationRoutes = routes.applicationRoutes;
export const rootRoute = routes.rootRoute;
