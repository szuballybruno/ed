import { CourseUserPresetType, Id, LeaderboardPeriodType, LeaderboardScopeType } from '@episto/commontypes';
import { AdminPanelSettings, Build, Business, Equalizer, Home, Person, School, Search, Settings, Subscriptions } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { UserDataGridPresetType } from '../components/administration/users/AminUserGridView';
import { AdminActiveCompanyRouteParamType, ApplicationRoute, EpistoRoute } from '../models/types';
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
    leaderboardRoute: ApplicationRoute<void, { period?: LeaderboardPeriodType, scope?: LeaderboardScopeType }>;
    learningRoute: ApplicationRoute & {
        overviewRoute: ApplicationRoute;
        myStatisticsRoute: ApplicationRoute;
        myCoursesRoute: ApplicationRoute;
        myExamsRoute: ApplicationRoute;
    };
    administrationRoute: ApplicationRoute<AdminActiveCompanyRouteParamType> & {
        statsRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            overviewRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
            detailsRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
        };
        usersRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, { preset?: UserDataGridPresetType }> & {
            indexRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
            addRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
            userRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { userId: Id<'User'> }> & {
                editRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { userId: Id<'User'> }>;
                statsRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { userId: Id<'User'> }>;
                teacherInfoRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { userId: Id<'User'> }>;
                courseContentRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { userId: Id<'User'> }>;
            };
        };
        coursesRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            landingRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
            addRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
            courseDetailsRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { courseId: Id<'Course'> }>;
            courseContentRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { courseId: Id<'Course'> }>;
            statisticsCourseRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { courseId: Id<'Course'> }>;
            courseUserProgressRoute: ApplicationRoute<AdminActiveCompanyRouteParamType & { courseId: Id<'Course'> }, { preset?: CourseUserPresetType }>;
            interactiveCourseRoute: ApplicationRoute<AdminActiveCompanyRouteParamType>;
        };
        shopRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            overviewRoute: ApplicationRoute;
            addRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ shopItemId: Id<'ShopItem'> }>;
        };
        personalityAssessmentRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            indexRoute: ApplicationRoute,
            editTipsRoute: ApplicationRoute<{ traitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean }> & {
                editTipRoute: ApplicationRoute<{ traitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean, dailyTipId: Id<'DailyTip'> }>;
            };
        };
        myCompanyRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void>;
        companiesRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            indexRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
            coursesRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
            activationCodesRoute: ApplicationRoute<{ companyId: Id<'Company'> }>;
        };
        rolesRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
            indexRoute: ApplicationRoute;
            editRoute: ApplicationRoute<{ roleId: Id<'Role'> }>;
        };
        activationCodesRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void>;
        debugRoute: ApplicationRoute<AdminActiveCompanyRouteParamType, void> & {
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
            route: new EpistoRoute('/', 'administration/:activeCompanyId', '*'),
            icon: <AdminPanelSettings />,

            statsRoute: {
                title: translatableTexts.routeTitles.administrationHomeOverview,
                route: new EpistoRoute('/administration/:activeCompanyId', 'stats'),
                icon: <Equalizer className="fontXXL"
                    color={'secondary'} />,

                overviewRoute: {
                    title: translatableTexts.routeTitles.administrationHomeOverview,
                    route: new EpistoRoute('/administration/:activeCompanyId/users', 'add'),
                },

                detailsRoute: {
                    title: translatableTexts.routeTitles.administrationHomeDetails,
                    route: new EpistoRoute('/administration/:activeCompanyId/users', 'add'),
                },
            },

            usersRoute: {
                title: translatableTexts.routeTitles.administrationUserAdmin,
                route: new EpistoRoute('/administration/:activeCompanyId', 'users', '*'),
                icon: <Person className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: translatableTexts.routeTitles.administrationUserIndex,
                    route: new EpistoRoute('/administration/:activeCompanyId/users', ''),
                },
                addRoute: {
                    title: translatableTexts.routeTitles.administrationAddUser,
                    route: new EpistoRoute('/administration/:activeCompanyId/users', 'add'),
                },
                userRoute: {
                    title: translatableTexts.routeTitles.administrationEditUser,
                    route: new EpistoRoute('/administration/:activeCompanyId/users', ':userId', '*'),
                    icon: <Person className="fontXXL"
                        color={'secondary'} />,

                    editRoute: {
                        title: translatableTexts.routeTitles.administrationEditUser,
                        route: new EpistoRoute('/administration/:activeCompanyId/users/:userId', ''),
                        icon: <Person className="fontXXL"
                            color={'secondary'} />,
                    },
                    statsRoute: {
                        title: translatableTexts.routeTitles.administrationUserStatistics,
                        route: new EpistoRoute('/administration/:activeCompanyId/users/:userId', 'statistics'),
                    },
                    teacherInfoRoute: {
                        title: translatableTexts.routeTitles.administrationEditTeacherInfo,
                        route: new EpistoRoute('/administration/:activeCompanyId/users/:userId', 'teacherinfo'),
                    },
                    courseContentRoute: {
                        title: translatableTexts.routeTitles.administrationUserCourses,
                        route: new EpistoRoute('/administration/:activeCompanyId/users/:userId', 'courses'),
                    },
                },
            },

            coursesRoute: {
                title: translatableTexts.routeTitles.administrationCourseAdmin,
                route: new EpistoRoute('/administration/:activeCompanyId', 'courses', '*'),
                icon: <Subscriptions
                    className="fontXXL"
                    color={'secondary'} />,

                landingRoute: {
                    title: translatableTexts.routeTitles.administrationCourseAdmin,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', '/')
                },
                addRoute: {
                    title: translatableTexts.routeTitles.administrationAddCourse,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', 'add'),
                },
                courseDetailsRoute: {
                    title: translatableTexts.routeTitles.administrationCourseDetails,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', ':courseId/details'),
                    icon: <Subscriptions className="fontXXL"
                        color={'secondary'} />,
                },
                courseContentRoute: {
                    title: translatableTexts.routeTitles.administrationCourseContent,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', ':courseId/content'),
                },
                statisticsCourseRoute: {
                    title: translatableTexts.routeTitles.administrationCourseStatistics,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', ':courseId/statistics'),
                },
                courseUserProgressRoute: {
                    title: translatableTexts.routeTitles.administrationCourseUserProgress,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', ':courseId/userprogress'),
                },
                interactiveCourseRoute: {
                    title: translatableTexts.routeTitles.administrationInteractiveCourse,
                    route: new EpistoRoute('/administration/:activeCompanyId/courses', ':courseId/editinteractive'),
                }
            },

            shopRoute: {
                title: translatableTexts.routeTitles.administrationShopMain,
                route: new EpistoRoute('/administration/:activeCompanyId', 'shop', '*'),
                icon: <ShoppingCartIcon className="fontXXL"
                    color={'secondary'} />,

                overviewRoute: {
                    title: translatableTexts.routeTitles.administrationShopAdd,
                    route: new EpistoRoute('/administration/:activeCompanyId/shop', '/'),
                },

                addRoute: {
                    title: translatableTexts.routeTitles.administrationShopAdd,
                    route: new EpistoRoute('/administration/:activeCompanyId/shop', 'add'),
                },

                editRoute: {
                    title: translatableTexts.routeTitles.administrationShopEdit,
                    route: new EpistoRoute('/administration/:activeCompanyId/shop', 'edit/:shopItemId'),
                }
            },

            personalityAssessmentRoute: {
                title: translatableTexts.routeTitles.administrationPersonalityAssessmentMain,
                route: new EpistoRoute('/administration/:activeCompanyId', 'personality-assessment', '*'),
                icon: <SupervisedUserCircleIcon
                    className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentMain,
                    route: new EpistoRoute('/administration/:activeCompanyId/personality-assessment', ''),
                },

                editTipsRoute: {
                    title: translatableTexts.routeTitles.administrationPersonalityAssessmentTips,
                    route: new EpistoRoute('/administration/:activeCompanyId/personality-assessment', ':traitCategoryId/:isMax'),

                    editTipRoute: {
                        title: translatableTexts.routeTitles.administrationPersonalityAssessmentTip,
                        route: new EpistoRoute('/administration/:activeCompanyId/personality-assessment/:traitCategoryId/:isMax', 'tip/:dailyTipId'),
                    }
                },
            },

            myCompanyRoute: {
                title: 'Céges statisztika',
                route: new EpistoRoute('/administration/:activeCompanyId', 'mycompany'),
                icon: <Business className="fontXXL"
                    color={'secondary'} />
            },

            companiesRoute: {
                title: 'Cégek',
                route: new EpistoRoute('/administration/:activeCompanyId', 'companies', '*'),
                icon: <LocationCityIcon
                    className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: 'Cégek',
                    route: new EpistoRoute('/administration/:activeCompanyId/companies', '/')
                },
                editRoute: {
                    title: 'Cég szerkesztese',
                    route: new EpistoRoute('/administration/:activeCompanyId/companies', '/:companyId/edit')
                },
                coursesRoute: {
                    title: 'Ceg kurzusai',
                    route: new EpistoRoute('/administration/:activeCompanyId/companies', '/:companyId/company-associated-courses')
                },
                activationCodesRoute: {
                    title: 'Aktivációs kódok',
                    route: new EpistoRoute('/administration/:activeCompanyId/companies', '/:companyId/activation-codes')
                }
            },

            rolesRoute: {
                title: 'Roles',
                route: new EpistoRoute('/administration/:activeCompanyId', 'roles'),
                icon: <LocalPoliceIcon
                    className="fontXXL"
                    color={'secondary'} />,

                indexRoute: {
                    title: 'Roles',
                    route: new EpistoRoute('/administration/:activeCompanyId/roles', '/')
                },
                editRoute: {
                    title: 'Role edit',
                    route: new EpistoRoute('/administration/:activeCompanyId/roles', '/:roleId/edit')
                },
            },

            activationCodesRoute: {
                title: 'Activation Codes',
                route: new EpistoRoute('/administration/:activeCompanyId', 'activation-codes'),
                icon: <EpistoIcons.Link
                    className="fontXXL"
                    color={'secondary'} />
            },

            debugRoute: {
                title: 'Debug',
                route: new EpistoRoute('/administration/:activeCompanyId', 'debug'),
                icon: <Build
                    className='fontXXL'
                    color='secondary' />,
                indexRoute: {
                    title: 'Debug',
                    route: new EpistoRoute('/administration/:activeCompanyId/roles', '/')
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
