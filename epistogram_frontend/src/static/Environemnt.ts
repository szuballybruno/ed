export const serverUrl = process.env.REACT_APP_SERVER_URL;
export const assetCDNStorageUrl = process.env.REACT_APP_CDN_URL;
export const currentVersion = process.env.REACT_APP_CURRENT_VERSION;
export const oneSignalAppId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;
export const isUnderMaintenance = process.env.REACT_APP_UNDER_MAINTENANCE === 'true';
export const isLocalhost = process.env.REACT_APP_IS_LOCALHOST === 'true';

export const currentOrigin = window.location.origin;
export const fetchNewAccessTokenIntervalInMs = 5 * 60 * 1000; // 5 minutes
export const fetchUserIntervalInMs = 10 * 60 * 1000; // 10 minutes
export const eventPoolingIntervalInMs = 20 * 1000; // 20 secs
export const verboseLogging = false;
export const loggingSettings = {
    routing: false,
    render: true
};

console.log('Current version: ' + currentVersion);
console.log('Server url: ' + serverUrl);
console.log('CDN url: ' + assetCDNStorageUrl);
