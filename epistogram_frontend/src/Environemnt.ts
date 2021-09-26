export const isLocalhost = process.env.REACT_APP_IS_DEPLOYED ? false : true;

export const backendUrl = isLocalhost
    ? "http://localhost:5000/"
    : window.location.origin + "/api/";

export const currentOrigin = window.location.origin;
export const refreshTokenRefreshIntervalInS = 10 * 60 * 1000; // 10 minutes
export const userRefreshIntervalInS = 11 * 60 * 1000; // 11 minutes

if (isLocalhost)
    console.warn("Application is running on LOCALHOST, in localhost mode!");

console.log("REACT_APP_ENV_TEST: " + process.env.REACT_APP_ENV_TEST);