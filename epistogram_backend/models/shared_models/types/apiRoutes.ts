export const apiRoutes = {

    open: {
        renewUserSession: "/open/renew-user-session",
        loginUser: "/open/login-user",
        registerUser: "/open/register-user",
        registerInvitedUser: "/open/register-invited-user"
    },

    misc: {
        logoutUser: "/misc/logout-user",
        getJobTitles: "/get-job-titles"
    },

    userManagement: {
        getEditUserData: "/users/get-edit-user-data",
        inviteUser: "/users/invite-user",
        deleteUser: "/users/delete-user",
        upadateUser: "/users/update-user",
        getUserListForAdministration: "/users/get-user-administartion-user-list"
    },

    signup: {
        answerSignupQuestion: '/signup/answer-signup-question',
        getSignupData: "/signup/get-signup-data",
        getUserPersonalityData: "/signup/get-user-personality-data"
    },


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