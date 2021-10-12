export const apiRoutes = {

    open: {
        renewUserSession: "/open/renew-user-session",
        logoutUser: "/open/logout-user",
        loginUser: "/open/login-user",
        getSignupData: "/open/get-signup-data",
        registerUser: "/open/register-user"
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