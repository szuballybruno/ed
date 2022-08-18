
export type LoggingKeysType =
    'ROUTING' |
    'RENDER' |
    'MUTATIONS' |
    'AUTH' |
    'GRID' |
    'DIALOGS' |
    'WARNING' |
    'VIDEO_POPUPS' | 
    'PLAYBACK' |
    'FILE UPLOAD';

export const Environment = (() => {

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const assetCDNStorageUrl = process.env.REACT_APP_CDN_URL;
    const currentVersion = process.env.REACT_APP_CURRENT_VERSION;
    const oneSignalAppId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;
    const isUnderMaintenance = process.env.REACT_APP_UNDER_MAINTENANCE === 'true';
    const isLocalhost = process.env.REACT_APP_IS_LOCALHOST === 'true';

    const currentOrigin = window.location.origin;
    const getAuthHandshakeIntervalInMs = 5 * 60 * 1000; // 5 minutes
    const eventPoolingIntervalInMs = 5 * 60 * 1000; // 5 mins
    const loggingEnabled = false;
    const loggingEnabledKeys: LoggingKeysType[] = ['WARNING', 'VIDEO_POPUPS'];

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
        loggingEnabled,
        loggingEnabledKeys,
        getAssetUrl
    };
})();
