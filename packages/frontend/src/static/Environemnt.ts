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
    'FILE UPLOAD' |
    'AUTO SCROLL' |
    'BUSY' |
    'AUTO NAV' |
    'EXAM' |
    'QUERY' |
    'SESSION' |
    'EVENTS' |
    'PLAYER DEBUG';

const bundler: 'vite' | 'cra' = 'vite';

const getEnvVar = (name: string): string => {

    if (bundler === 'vite') {
        return import.meta.env[`VITE_${name}`];
    }
    else {
        return process.env[`REACT_APP_${name}`] as any;
    }
};

export const Environment = (() => {

    const serverUrl = getEnvVar('SERVER_URL');
    const assetCDNStorageUrl = getEnvVar('CDN_URL');
    const currentVersion = getEnvVar('CURRENT_VERSION');
    const oneSignalAppId = getEnvVar('ONE_SIGNAL_APP_ID');
    const isUnderMaintenance = getEnvVar('UNDER_MAINTENANCE') === 'true';
    const isLocalhost = getEnvVar('IS_LOCALHOST') === 'true';

    const currentOrigin = window.location.origin;
    const getAuthHandshakeIntervalInMs = 5 * 60 * 1000; // 5 minutes
    const eventPoolingIntervalInMs = 5 * 60 * 1000; // 5 mins
    const sessionHangThresholdInMs = 2 * 60 * 60 * 1000; // 2 hours
    const loggingEnabled = true;
    const loggingEnabledKeys: LoggingKeysType[] = ['WARNING', 'PLAYER DEBUG', 'PLAYBACK'];

    const getAssetUrl = (path: string, assetUrlPath?: string) => {

        return (assetUrlPath ? assetUrlPath : assetCDNStorageUrl) + ('/' + path).replace('//', '/');
    };

    return {
        sessionHangThresholdInMs,
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
