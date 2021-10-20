export const serverUrl = process.env.REACT_APP_SERVER_URL;

export const backendUrl = serverUrl
    ? serverUrl
    : "http://localhost:5000/";

export const currentOrigin = window.location.origin;
export const refreshTokenRefreshIntervalInMs = 5 * 60 * 1000; // 5 minutes
export const userRefreshIntervalInMs = 10 * 60 * 1000; // 10 minutes

console.log("REACT_APP_SERVER_URL: " + process.env.REACT_APP_SERVER_URL);