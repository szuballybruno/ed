export const serverUrl = process.env.REACT_APP_SERVER_URL;

export const backendUrl = serverUrl
    ? serverUrl
    : "http://localhost:5000/";

export const currentOrigin = window.location.origin;
export const refreshTokenRefreshIntervalInS = 10 * 60 * 1000; // 10 minutes
export const userRefreshIntervalInS = 11 * 60 * 1000; // 11 minutes

console.log("REACT_APP_SERVER_URL: " + process.env.REACT_APP_SERVER_URL);