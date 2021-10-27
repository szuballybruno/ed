export const apiRoutes = {

    open: {
        renewUserSession: "/open/renew-user-session",
        loginUser: "/open/login-user",
        registerUser: "/open/register-user",
        registerInvitedUser: "/open/register-invited-user"
    },

    misc: {
        logoutUser: "/misc/logout-user",
        getJobTitles: "/get-job-titles",
        getDailyTip: "/misc/get-get-daily-tip"
    },

    userManagement: {
        getEditUserData: "/users/get-edit-user-data",
        inviteUser: "/users/invite-user",
        deleteUser: "/users/delete-user",
        upadateUser: "/users/update-user",
        getBriefUserData: "/users/get-brief-user-data",
        getUserListForAdministration: "/users/get-user-administartion-user-list"
    },

    signup: {
        answerSignupQuestion: '/signup/answer-signup-question',
        getSignupData: "/signup/get-signup-data",
        getUserPersonalityData: "/signup/get-user-personality-data"
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
        getAdminCourseList: "/course/get-admin-course-list"
    },

    video: {
        createVideo: "/video/create-video",
        deleteVideo: "/video/delete-video",
        uploadVideoFile: "/video/upload-video-file",
        saveVideo: "/video/save-video",
        getVideoEditData: "/video/get-video-edit-data",
    },

    questions: {
        getQuestionEditData: "/questions/get-question-edit-data",
        saveQuestion: "/questions/save-question"
    },

    exam: {
        getExamEditData: "/exam/get-exam-edit-data",
        saveExam: "/exam/save-exam",
        createExam: "/exam/create-exam",
        deleteExam: "/exam/delete-exam",
    }
}

export const isOpenRoute = (routePath: string) => {

    const openRoutes = apiRoutes.open;

    for (const key in openRoutes) {
        if (Object.prototype.hasOwnProperty.call(apiRoutes.open, key)) {

            const routeName = (openRoutes as any)[key] as string;

            if (routePath === routeName)
                return true;
        }
    }

    return false;
}