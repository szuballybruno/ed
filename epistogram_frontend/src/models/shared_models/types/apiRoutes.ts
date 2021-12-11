export const apiRoutes = {

    registration: {
        registerUserViaPublicToken: "/registration/register-user-via-public-token",
        registerUserViaInvitationToken: "/registration/register-user-via-invitation-token",
        registerUserViaActivationCode: "/registration/register-user-via-activation-code",
        inviteUser: "/registration/invite-user",
    },

    misc: {
        getJobTitles: "/misc/get-job-titles",
        getDailyTip: "/misc/get-get-daily-tip",
        getOrganizations: "/misc/get-organizations",
        getHomePageDTO: "/misc/get-overview-page-dto",
        getCurrentCourseItemCode: '/misc/get-current-course-item-code'
    },

    authentication: {
        getCurrentUser: "/authentication/get-current-user",
        setNewPassword: "/authentication/set-new-password",
        logoutUser: "/authentication/logout-user",
        requestPasswordChange: "/authentication/request-change-password",
        renewUserSession: "/authentication/renew-user-session",
        loginUser: "/authentication/login-user",
    },

    shop: {
        getShopItems: "/shop/get-shop-items",
        getShopItemCategories: "/shop/get-shop-items-categories"
    },

    event: {
        getUnfulfilledEvent: "/event/get-unfulfilled-event"
    },

    userStats: {
        getUserStats: "/userstats/get-user-stats"
    },

    coinTransactions: {
        getCoinTransactions: "/cointransactions/get-coin-transactions",
        getCoinBalance: "/cointransactions/get-coin-balance"
    },

    user: {
        getEditUserData: "/users/get-edit-user-data",
        deleteUser: "/users/delete-user",
        upadateUser: "/users/update-user",
        getBriefUserData: "/users/get-brief-user-data",
        getUserListForAdministration: "/users/get-user-administartion-user-list"
    },

    file: {
        uploadUserAvatar: "/file/upload-user-avatar"
    },

    signup: {
        answerSignupQuestion: '/signup/answer-signup-question',
        getSignupData: "/signup/get-signup-data",
        getUserPersonalityData: "/signup/get-user-personality-data"
    },

    player: {
        getPlayerData: '/player/get-player-data',
        saveVideoPlaybackSample: '/player/save-video-playback-sample',
        getCourseItems: '/player/get-course-items',
        answerVideoQuestion: "/questions/answer-video-question"
    },

    course: {
        getCourseEditData: '/course/get-course-edit-data',
        getCourseBriefData: '/course/get-course-brief-data',
        saveCourseData: '/course/save-course-data',
        saveCourseThumbnail: '/course/save-course-thumbnail',
        startCourse: "/course/start-course",
        getAvailableCourses: "/course/get-available-courses",
        deleteCourse: "/course/delete-course",
        createCourse: "/course/create-course",
        getCourseDetails: "/course/get-course-details",
        getAdminCourseList: "/course/get-admin-course-list",
        setCourseMode: "/course/set-course-mode",
        getCourseProgressData: "/course/get-course-progress-data"
    },

    module: {
        createModule: "/module/create-module",
        deleteModule: "/module/delete-module",
        getModuleEditData: "/module/get-edit-data",
        saveModule: "/module/save-module"
    },

    video: {
        createVideo: "/video/create-video",
        deleteVideo: "/video/delete-video",
        uploadVideoFile: "/video/upload-video-file",
        uploadVideoFileChunks: "/video/upload-video-file-chunks",
        saveVideo: "/video/save-video",
        getVideoEditData: "/video/get-video-edit-data",
    },

    questions: {
        getQuestionEditData: "/questions/get-question-edit-data",
        saveQuestion: "/questions/save-question",
        answerPractiseQuestion: "/questions/answer-practise-question",
        getPractiseQuestions: '/questions/get-practise-question',
    },

    exam: {
        getExamEditData: "/exam/get-exam-edit-data",
        saveExam: "/exam/save-exam",
        createExam: "/exam/create-exam",
        deleteExam: "/exam/delete-exam",
        answerExamQuestion: "/exam/answer-exam-question",
        getExamResults: "/exam/get-exam-results"
    }
}