
console.log('Environment');

export const Environment = (() => {

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const assetCDNStorageUrl = process.env.REACT_APP_CDN_URL;
    const currentVersion = process.env.REACT_APP_CURRENT_VERSION;
    const oneSignalAppId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;
    const isUnderMaintenance = process.env.REACT_APP_UNDER_MAINTENANCE === 'true';
    const isLocalhost = process.env.REACT_APP_IS_LOCALHOST === 'true';

    const currentOrigin = window.location.origin;
    const getAuthHandshakeIntervalInMs = 5 * 60 * 1000; // 5 minutes
    const eventPoolingIntervalInMs = 1 * 60 * 1000; // 1 mins
    const verboseLogging = false;
    const loggingSettings = {
        routing: false,
        render: false,
        mutations: false,
        auth: true
    };

    console.log('Current version: ' + currentVersion);
    console.log('Server url: ' + serverUrl);
    console.log('CDN url: ' + assetCDNStorageUrl);

    const getAssetUrl = (path: string, assetUrlPath?: string) => {

        return (assetUrlPath ? assetUrlPath : assetCDNStorageUrl) + ('/' + path).replace('//', '/');
    };

    return {
        serverUrl,
        assetCDNStorageUrl,
        currentVersion,
        oneSignalAppId,
        isUnderMaintenance,
        isLocalhost,
        currentOrigin,
        getAuthHandshakeIntervalInMs,
        eventPoolingIntervalInMs,
        verboseLogging,
        loggingSettings,
        getAssetUrl
    };
})();
