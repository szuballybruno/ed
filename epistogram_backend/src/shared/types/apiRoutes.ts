export const apiRoutes = {

    registration: {
        registerUserViaPublicToken: '/registration/register-user-via-public-token',
        registerUserViaInvitationToken: '/registration/register-user-via-invitation-token',
        registerUserViaActivationCode: '/registration/register-user-via-activation-code',
        inviteUser: '/registration/invite-user'
    },

    misc: {
        getJobTitles: '/misc/get-job-titles',
        getHomePageDTO: '/misc/get-overview-page-dto',
        getCurrentCourseItemCode: '/misc/get-current-course-item-code',
        getCourseOverviewData: '/misc/get-course-overview-data'
    },

    roles: {
        getRoles: '/roles/get-roles',
        createRole: '/roles/create-role',
        getRoleEditData: '/roles/get-role-edit-data',
        deleteRole: '/roles/delete-role',
        saveRole: '/roles/save-role',
        getAssignableRoles: '/roles/get-assignable-roles',
        getAssignablePermissions: '/roles/get-assignable-permissions',
        getUserAssignedAuthItems: '/roles/get-user-assigned-auth-items'
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
        getRoleManageCompanies: '/companies/get-role-manage-companies',
    },

    scheduledJobs: {
        evaluateUserProgress: '/scheduledjobs/evaluate-user-progress'
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
        answerPrequizQuestion: '/prequiz/answer-prequiz-question'
    },

    pretest: {
        getPretestData: '/pretest/get-pretest-data',
        getPretestResults: '/pretest/get-pretest-results',
        getPretestExamId: '/pretest/get-pretest-exam-id'
    },

    courseRating: {
        getCourseRatingGroups: '/courserating/get-course-rating-groups',
        getCourseRatingAnswers: '/courserating/get-course-rating-answers',
        saveCourseRatingGroupAnswers: '/courserating/save-course-rating-answers'
    },

    userStats: {
        getUserStats: '/userstats/get-user-stats'
    },

    userProgress: {
        getUserProgressData: '/userprogress/get-user-progress-data',
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
        deleteUser: '/users/delete-user',
        saveUser: '/users/save-user',
        saveUserSimple: '/users/save-user-simple',
        getBriefUserData: '/users/get-brief-user-data',
        getUserListForAdministration: '/users/get-user-administartion-user-list'
    },

    file: {
        uploadUserAvatar: '/file/upload-user-avatar'
    },

    signup: {
        answerSignupQuestion: '/signup/answer-signup-question',
        getSignupData: '/signup/get-signup-data',
        getUserPersonalityData: '/signup/get-user-personality-data'
    },

    player: {
        getPlayerData: '/player/get-player-data',
        getCourseItems: '/player/get-course-items',
        answerVideoQuestion: '/questions/answer-video-question'
    },

    playback: {
        saveVideoPlaybackSample: '/playback/save-video-playback-sample',
    },

    course: {
        getCourseContentEditData: '/course/get-course-content-edit-data',
        getCourseDetailsEditData: '/course/get-course-details-edit-data',
        getCourseBriefData: '/course/get-course-brief-data',
        saveCourseDetails: '/course/save-course-details-data',
        saveCourseContent: '/course/save-course-content-data',
        saveCourseThumbnail: '/course/save-course-thumbnail',
        getAvailableCourses: '/course/get-available-courses',
        deleteCourse: '/course/delete-course',
        createCourse: '/course/create-course',
        getCourseDetails: '/course/get-course-details',
        getAdminCourseList: '/course/get-admin-course-list',
        setCourseMode: '/course/set-course-mode',
        getCourseProgressData: '/course/get-course-progress-data',
        getCourseProgressShort: '/course/get-course-progress-short'
    },

    module: {
        createModule: '/module/create-module',
        deleteModule: '/module/delete-module',
        getModuleEditData: '/module/get-edit-data',
        saveModule: '/module/save-module',
        getModuleListEditData: '/module/get-modules'
    },

    video: {
        createVideo: '/video/create-video',
        deleteVideo: '/video/delete-video',
        uploadVideoFile: '/video/upload-video-file',
        uploadVideoFileChunks: '/video/upload-video-file-chunks',
        saveVideo: '/video/save-video',
        getVideoEditData: '/video/get-video-edit-data',
        getVideoQuestionEditData: '/video/get-video-question-edit-data',
        saveVideoQuestionEditData: '/video/save-video-question-edit-data'
    },

    questions: {
        getQuestionEditData: '/questions/get-question-edit-data',
        saveQuestion: '/questions/save-question',
        answerPractiseQuestion: '/questions/answer-practise-question',
        getPractiseQuestions: '/questions/get-practise-question',
    },

    exam: {
        getExamEditData: '/exam/get-exam-edit-data',
        getExamQuestionEditData: '/exam/get-exam-question-edit-data',
        saveExamQuestionEditData: '/exam/save-exam-question-edit-data',
        saveExam: '/exam/save-exam',
        createExam: '/exam/create-exam',
        deleteExam: '/exam/delete-exam',
        answerExamQuestion: '/exam/answer-exam-question',
        getExamResults: '/exam/get-exam-results',
        startExam: '/exam/start-exam'
    }
};