import { CourseUserPresetType, Id, LeaderboardPeriodType, LeaderboardScopeType } from "@episto/commontypes";
import { SaveCourseContentDTO } from "../admin/SaveCourseContentDTO";
import { CompanyAssociatedCourseDTO } from "../company/CompanyAssociatedCourseDTO";
import { CourseStartDTO } from "../CourseStartDTO";
import { Mutation } from "../mutations/Mutation";
import { AdminUserCourseDTO } from "../AdminUserCourseDTO";
import { FeatureDTO } from "../FeatureDTO";
import { CompanyFeatureDTO } from "../CompanyFeatureDTO";
import { CourseFeatureDTO } from "../CourseFeatureDTO";
import { CreateCourseCategoryDTO } from "../CreateCourseCategoryDTO";
import { CompanyCourseCategoriesDTO } from "../CompanyCourseCategoriesDTO";

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
        getLeaderboard: '/leaderboard/get-leaderboard' as ParametrizedRouteType<{ query: { period: LeaderboardPeriodType, scope: LeaderboardScopeType } }>
    },

    misc: {
        healthcheck: '/misc/healthcheck',
        getHomePageDTO: '/misc/get-overview-page-dto',
        getCurrentCourseData: '/misc/get-current-course-data',
        getCourseOverviewData: '/misc/get-course-overview-data' as ParametrizedRouteType<{ query: { userId: Id<'User'> | null, courseId: Id<'Course'> | null } }>,
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
        getPermissions: '/permissions/get-permissions',
        checkPermission: '/permissions/check-permission'
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

    feature: {
        checkFeature: '/feature/check-feature' as ParametrizedRouteType<{ body: FeatureDTO }>,
        getCompanyFeatures: '/feature/get-company-features' as ParametrizedRouteType<{ query: { companyId: Id<'Company'> } }>,
        saveCompanyFeatures: '/feature/save-company-feature' as ParametrizedRouteType<{ body: { companyId: Id<'Company'>, mutations: Mutation<CompanyFeatureDTO, 'featureId'>[] } }>,
        getCourseFeatures: '/feature/get-course-features' as ParametrizedRouteType<{ query: { courseId: Id<'Course'> } }>,
        saveCourseFeatures: '/feature/save-course-feature' as ParametrizedRouteType<{ body: { courseId: Id<'Course'>, mutations: Mutation<CourseFeatureDTO, 'featureId'>[] } }>
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

    admin: {
        getCourseStatsCarouselData: '/adminstats/get-course-stats-carousel-data' as ParametrizedRouteType<{ query: { companyId: Id<'Company'> } }>,
        getAdminUserCourses: '/userstats/get-admin-user-courses' as ParametrizedRouteType<{ query: { userId: Id<'User'>, loadAvailable: boolean } }>,
        getAdminCourseUsers: '/userstats/get-admin-course-users' as ParametrizedRouteType<{ query: { courseId: Id<'Course'>, preset: CourseUserPresetType } }>,
        getAdminUsersList: '/users/get-admin-user-list' as ParametrizedRouteType<{ query: { companyId: Id<'Company'>, isToBeReviewed: boolean } }>,
        saveUserCourses: '/users/save-user-courses' as ParametrizedRouteType<{ body: { mutations: Mutation<AdminUserCourseDTO, 'courseId'>[], userId: Id<'User'> } }>,
        getAdminCourseList: '/course/get-admin-course-list' as ParametrizedRouteType<{ query: { companyId: Id<'Company'> } }>,
    },

    userStats: {
        getHomePageStats: '/userstats/get-home-page-stats',
        getUserLearningPageStats: '/userstats/get-user-learning-page-stats',
        getUserVideoStats: '/userstats/get-user-video-stats',
        getUserExamStats: '/userstats/get-user-exam-stats',
        getUserModuleStats: '/userstats/get-user-module-stats',
        getUserLearningOverviewData: '/userstats/get-user-learning-overview-data',
        getUserCourseStatsOverviewData: '/userstats/get-user-course-stats-overview-data'
    },

    userProgress: {
        getUserProgressData: '/userprogress/get-user-progress-data' as ParametrizedRouteType<{ body: { courseId: Id<'CourseId'> } }>,
        getCourseProgressOverview: '/userprogress/get-course-progress-overview',
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
        getEditUserData: '/users/get-edit-user-data',
        deleteUser: '/users/delete-user' as ParametrizedRouteType<{ body: { userId: Id<'User'> } }>,
        saveUser: '/users/save-user',
        saveUserSimple: '/users/save-user-simple',
        getBriefUserData: '/users/get-brief-user-data',
        getUserControlDropdownData: '/users/get-user-control-dropdown-data'
    },

    file: {
        uploadUserAvatar: '/file/upload-user-avatar'
    },

    survey: {
        answerSurveyQuestion: '/survey/answer-question',
        getSurveyData: '/survey/get-data',
        completeSignupSurvey: '/survey/complete-signup-survey',
        getUserPersonalityData: '/survey/get-user-personality-data',
        checkIfSurveySkippable: '/survey/check-if-survey-skippable'
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
        setCourseMode: '/course/set-course-mode',
        startCourse: '/course/start-course' as ParametrizedRouteType<{ body: CourseStartDTO }>,
    },

    courseCategory: {
        getAvailableCourseCategories: '/coursecategory/get-available-course-categories',
        createCourseCategory: '/coursecategory/create-course-category' as ParametrizedRouteType<{ body: CreateCourseCategoryDTO }>,
        deleteCourseCategory: '/coursecategory/delete-course-category' as ParametrizedRouteType<{ body: { courseCategoryId: Id<'CourseCategory'>, companyId: Id<'Company'> } }>,
        getCompanyCourseCategories: '/coursecategory/get-company-course-categories' as ParametrizedRouteType<{ query: { companyId: Id<'Company'> } }>,
        saveCompanyCourseCategories: '/coursecategory/save-company-course-categories' as ParametrizedRouteType<{ body: { companyId: Id<'Company'>, mutations: Mutation<CompanyCourseCategoriesDTO, 'courseCategoryId'>[] } }>
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
