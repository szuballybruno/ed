export const serverUrl = process.env.REACT_APP_SERVER_URL;

export const backendUrl = serverUrl
    ? serverUrl
    : "http://localhost:5000/";

export const currentOrigin = window.location.origin;
export const refreshTokenRefreshIntervalInMs = 5 * 60 * 1000; // 5 minutes
export const userRefreshIntervalInMs = 10 * 60 * 1000; // 10 minutes

console.log("REACT_APP_SERVER_URL: " + process.env.REACT_APP_SERVER_URL);
console.log("REACT_APP_CDN_URL: " + process.env.REACT_APP_CDN_URL);

export const verboseLogging = false;
export const assetStorageUrl = process.env.REACT_APP_CDN_URL; // "https://storage.googleapis.com/epistogram_bucket_dev"
export const currentVersion = process.env.REACT_APP_CURRENT_VERSION;
export const oneSignalAppId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;
export const isUnderMaintenance = process.env.REACT_APP_UNDER_MAINTENANCE === "true";

console.log("Current version: " + currentVersion);
