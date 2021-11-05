export const serverUrl = process.env.REACT_APP_SERVER_URL;
export const assetStorageUrl = process.env.REACT_APP_CDN_URL;
export const currentVersion = process.env.REACT_APP_CURRENT_VERSION;
export const oneSignalAppId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;

export const isLocalhost = !currentVersion;
export const currentOrigin = window.location.origin;
export const refreshTokenRefreshIntervalInMs = 5 * 60 * 1000; // 5 minutes
export const userRefreshIntervalInMs = 10 * 60 * 1000; // 10 minutes
export const verboseLogging = false;

console.log("Current version: " + currentVersion);
console.log("Server url: " + serverUrl);
console.log("CDN url: " + assetStorageUrl);
