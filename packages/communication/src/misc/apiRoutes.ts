import { CourseUserPresetType, Id, LeaderboardPeriodType } from "@episto/commontypes";
import { SaveCourseContentDTO } from "../admin/SaveCourseContentDTO";
import { CompanyAssociatedCourseDTO } from "../company/CompanyAssociatedCourseDTO";
import { CourseStartDTO } from "../CourseStartDTO";
import { Mutation } from "../mutations/Mutation";
import { UserCourseStatsDTO } from "../UserCourseStatsDTO";

export type RouteParameterType<TBody = any, TQuery = any> = { body?: TBody, query?: TQuery };
export type ParametrizedRouteType<T extends RouteParameterType> = string & T;
export type GetParametrizedRouteType<T> = T extends ParametrizedRouteType<infer A> ? A : never;

export const apiRoutes = {

    registration: {
        registerViaPublicToken: '/registration/register-via-public-token',
        registerViaInvitationToken: '/registration/register-via-invitation-token',
        registerViaActivationCode: '/registration/register-via-activation-code',
    },

    invitation: {
        inviteUser: '/invitation/invite-user'
    },

    leaderboard: {
        getLeaderboard: '/leaderboard/get-leaderboard' as ParametrizedRouteType<{ query: { period: LeaderboardPeriodType } }>
    },

    misc: {
        getHomePageDTO: '/misc/get-overview-page-dto',
        getCurrentCourseItemCode: '/misc/get-current-course-item-code',
        getCourseOverviewData: '/misc/get-course-overview-data' as ParametrizedRouteType<{ query: { userId?: Id<'User'>, courseId?: Id<'Course'> } }>,
        getCourseOverviewModuleCompareData: '/misc/get-course-overview-module-compare-data' as ParametrizedRouteType<{ query: { userId?: Id<'User'>, courseId?: Id<'Course'> } }>,
        getActivationCodeList: '/misc/get-activation-code-list' as ParametrizedRouteType<{ query: { urlTemplate: string, companyId: Id<'Company'> } }>,
        generateActivationCodesPreview: '/misc/generate-activation-codes-preview' as ParametrizedRouteType<{ body: { count: number, prefix: string, companyId: Id<'Company'> } }>,
        generateActivationCodes: '/misc/generate-activation-codes' as ParametrizedRouteType<{ body: { count: number, prefix: string, companyId: Id<'Company'> } }>
    },

    roles: {
        getRoles: '/roles/get-roles',
        createRole: '/roles/create-role',
        getRoleEditData: '/roles/get-role-edit-data',
        deleteRole: '/roles/delete-role',
        saveRole: '/roles/save-role',
    },

    permissions: {
        getPermissions: '/permissions/get-permissions'
    },

    companies: {
        getCompanies: '/companies/get-companies',
        getCompaniesAdmin: '/companies/get-companies-admin',
        getCompanyEditData: '/companies/get-company-edit-data',
        createCompany: '/companies/create-company',
        deleteCompany: '/companies/delete-company',
        saveCompany: '/companies/save-company',
        getAvailableCompaniesForRoleCreation: '/companies/get-available-companies-for-role-creation',
        getRoleAssignCompanies: '/companies/get-role-assign-companies',
        getCompanyDetailsByDomain: '/companies/get-company-details-by-domain' as ParametrizedRouteType<{ query: { domain: string } }>,
        getCompanyCourseAssociations: '/companies/get-company-course-associations' as ParametrizedRouteType<{ query: { companyId: Id<'Company'> } }>,
        saveCompanyCourseAssociations: '/companies/save-company-course-associations' as ParametrizedRouteType<{ body: { companyId: Id<'Company'>, mutations: Mutation<CompanyAssociatedCourseDTO, 'courseId'>[] } }>,
        createCompanyActivationCodes: '/companies/create-company-activation-codes' as ParametrizedRouteType<{ body: { activationCodeCount: number, companyId: Id<'Company'> } }>,
        getUserInvitationCompanyData: '/companies/get-user-invitation-company-data' as ParametrizedRouteType<{}>
    },

    teacherInfo: {
        getTeacherInfo: '/teacherinfo/get-teacher-info',
        saveTeacherInfo: '/teacherinfo/save-teacher-info'
    },

    tempomat: {
        setTempomatMode: '/tempomat/set-tempomat-mode',
        getTempomatMode: '/tempomat/get-tempomat-mode'
    },

    passwordChange: {
        setNewPassword: '/pwchange/set-new-password',
        requestPasswordChangeAuthenticated: '/pwchange/request-password-change-authenticated',
        requestPasswordChange: '/pwchange/request-password-change'
    },

    videoRating: {
        rateVideoExperience: '/videorating/rate-video-experience',
        rateVideoDifficulty: '/videorating/rate-video-difficulty',
        getVideoRating: '/videorating/get-video-rating',
    },

    authentication: {
        establishAuthHandshake: '/authentication/establish-auth-handshake',
        logoutUser: '/authentication/logout-user',
        loginUser: '/authentication/login-user',
    },

    courseItem: {
        getCourseItemEditData: '/courseitem/get-course-item-edit-data'
    },

    personalityAssessment: {
        getPersonalityTraitCategories: '/personalityassessment/get-personality-trait-categories',
        getPersonalityTraitCategoryDetails: '/personalityassessment/get-personality-trait-category-details'
    },

    dailyTip: {
        getDailyTip: '/dailytip/get-daily-tip',
        deleteDailyTip: '/dailytip/delete-daily-tip',
        createDailyTip: '/dailytip/create-daily-tip',
        getDailyTipEditData: '/dailytip/get-daily-tip-edit-data',
        saveDailyTip: '/dailytip/save-daily-tip',
    },

    shop: {
        getShopItems: '/shop/get-shop-items',
        getShopItemCategories: '/shop/get-shop-items-categories',
        purchaseShopItem: '/shop/purchase-shop-item',
        getAdminShopItems: '/shop/get-admin-shop-items',
        getShopItemBriefData: '/shop/get-shop-item-brief-data',
        getShopItemEditData: '/shop/get-shop-item-edit-data',
        getPrivateCourseList: '/shop/get-private-course-list',
        saveShopItem: '/shop/save-shop-item',
        createShopItem: '/shop/create-shop-item'
    },

    event: {
        getUnfulfilledEvent: '/event/get-unfulfilled-event'
    },

    prequiz: {
        getQuestions: '/prequiz/get-questions',
        getUserAnswer: '/prequiz/get-user-answer',
        answerPrequizQuestion: '/prequiz/answer-prequiz-question',
        finishPrequiz: '/prequiz/finish-prequiz' as ParametrizedRouteType<{ body: { courseId: Id<'Course'> } }>
    },

    pretest: {
        getPretestData: '/pretest/get-pretest-data',
        getPretestResults: '/pretest/get-pretest-results',
        finishPretest: '/pretest/finish-pretest' as ParametrizedRouteType<{ body: { answerSessionId: Id<'AnswerSession'> } }>
    },

    courseRating: {
        getCourseRatingGroups: '/courserating/get-course-rating-groups',
        getCourseRatingAnswers: '/courserating/get-course-rating-answers',
        saveCourseRatingGroupAnswers: '/courserating/save-course-rating-answers'
    },

    userStats: {
        getHomePageStats: '/userstats/get-home-page-stats',
        getUserLearningPageStats: '/userstats/get-user-learning-page-stats',
        getImproveYourselfPageStats: '/userstats/get-improve-yourself-page-stats',
        getAdminUserCourses: '/userstats/get-user-courses' as ParametrizedRouteType<{ query: { userId: Id<'User'>, loadAvailable: boolean } }>,
        getAdminCourseUsers: '/userstats/get-course-users' as ParametrizedRouteType<{ query: { courseId: Id<'Course'>, preset: CourseUserPresetType } }>,
        getUserVideoStats: '/userstats/get-user-video-stats',
        getUserExamStats: '/userstats/get-user-exam-stats',
        getUserModuleStats: '/userstats/get-user-module-stats',
        getUserLearningOverviewData: '/userstats/get-user-learning-overview-data',
        getAdminHomeOverviewStats: '/userstats/get-admin-home-overview-stats',
        getUserCourseStatsOverviewData: '/userstats/get-user-course-stats-overview-data'
    },

    userProgress: {
        getUserProgressData: '/userprogress/get-user-progress-data' as ParametrizedRouteType<{ body: { courseId: Id<'CourseId'> } }>,
        getRecommendedItemQuota: '/userprogress/get-recommended-item-quota',
        getActiveCourses: '/userprogress/get-active-courses'
    },

    coinTransactions: {
        getCoinTransactions: '/cointransactions/get-coin-transactions',
        getCoinBalance: '/cointransactions/get-coin-balance',
        getCoinBalanceOfUser: '/cointransactions/get-coin-balance-of-user',
        giftCoinsToUser: '/cointransactions/gift-coins-to-user'
    },

    user: {
        getAdminUsersList: '/users/get-admin-user-list',
        getEditUserData: '/users/get-edit-user-data',
        deleteUser: '/users/delete-user',
        saveUser: '/users/save-user',
        saveUserSimple: '/users/save-user-simple',
        getBriefUserData: '/users/get-brief-user-data',
        saveUserCourses: '/users/save-user-courses' as ParametrizedRouteType<{ body: { mutations: Mutation<UserCourseStatsDTO, 'courseId'>[], userId: Id<'User'> } }>,
        getUserControlDropdownData: '/users/get-user-control-dropdown-data'
    },

    file: {
        uploadUserAvatar: '/file/upload-user-avatar'
    },

    survey: {
        answerSurveyQuestion: '/survey/answer-question',
        getSurveyData: '/survey/get-data',
        completeSignupSurvey: '/survey/complete-signup-survey',
        getUserPersonalityData: '/survey/get-user-personality-data'
    },

    player: {
        getPlayerData: '/player/get-player-data',
        answerVideoQuestion: '/questions/answer-video-question',
    },

    playback: {
        saveVideoPlaybackSample: '/playback/save-video-playback-sample',
        saveVideoSeekEvent: '/playback/save-video-seek-event',
    },

    course: {
        getPermissionAssignCourses: '/course/get-permission-assign-courses',
        getCourseContentEditData: '/course/get-course-content-edit-data',
        getCourseDetailsEditData: '/course/get-course-details-edit-data',
        getCourseBriefData: '/course/get-course-brief-data',
        saveCourseDetails: '/course/save-course-details-data',
        getGreetingsData: '/courses/get-greetings-data' as ParametrizedRouteType<{ query: { courseId: Id<'Course'> } }>,
        saveCourseContent: '/course/save-course-content-data' as ParametrizedRouteType<{ body: SaveCourseContentDTO }>,
        saveCourseThumbnail: '/course/save-course-thumbnail',
        getAvailableCourses: '/course/get-available-courses',
        deleteCourse: '/course/delete-course',
        createCourse: '/course/create-course',
        getCourseDetails: '/course/get-course-details',
        getAdminCourseList: '/course/get-admin-course-list',
        setCourseMode: '/course/set-course-mode',
        getAvailableCourseCategories: '/course/get-available-course-categories',
        startCourse: '/course/start-course' as ParametrizedRouteType<{ body: CourseStartDTO }>
    },

    courseProgress: {
        getCourseProgressData: '/courseprogress/get-course-progress-data',
        getCourseProgressShort: '/courseprogress/get-course-progress-short'
    },

    module: {
        getModuleListEditData: '/module/get-modules',
        saveCoverFile: '/module/save-cover-file' as ParametrizedRouteType<{ body: { moduleVersionId: Id<'ModuleVersion'> } }>
    },

    video: {
        uploadVideoFile: '/video/upload-video-file',
        uploadVideoFileChunks: '/video/upload-video-file-chunks',
    },

    questions: {
        answerPractiseQuestion: '/questions/answer-practise-question',
        getPractiseQuestions: '/questions/get-practise-question',
    },

    exam: {
        answerExamQuestion: '/exam/answer-exam-question',
        getExamResults: '/exam/get-exam-results' as ParametrizedRouteType<{ query: { answerSessionId: Id<'AnswerSession'> } }>,
        getLatestExamResults: '/exam/get-latest-exam-results' as ParametrizedRouteType<{ query: { answerSessionId: Id<'AnswerSession'> } }>,
        startExam: '/exam/start-exam',
        completeExam: '/exam/complete-exam'
    },

    comment: {
        createComment: '/comment/create-comment',
        createLike: '/comment/create-like',
        getComments: '/comment/get-comments',
        deleteLike: '/comment/delete-like'
    }
};