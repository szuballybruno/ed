import { ExcludeFunctions, GlobalConfigurationService, LogScopeType } from '@episto/server-services';
import { IXCookieOptions } from '@episto/x-gateway';
import { AdvancedDotEnv } from './AdvancedDotEnv';

class Helper {
    static getEnvConfigEntry(entryName: string): string;
    static getEnvConfigEntry(entryName: string, type: 'bool'): boolean;
    static getEnvConfigEntry(entryName: string, type: 'int'): number;
    static getEnvConfigEntry(entryName: string, type?: 'string' | 'bool' | 'int'): string | boolean | number {

        const fullEntryName = entryName;
        const value = process.env[fullEntryName];

        if (value === '' || value === undefined || value === null)
            throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${Helper.getEnvName()}'!`);

        /**
         * bool
         */
        if (type === 'bool') {

            if (!(value === 'false' || value === 'true'))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a boolean.`);

            return value === 'true';
        }

        /**
         * int
         */
        if (type === 'int') {

            const asInt = parseInt(value);

            if (Number.isNaN(asInt))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a int.`);

            return asInt;
        }

        /**
         * string
         */
        return value;
    }

    static loadEnv(rootDirectory: string, envName: string) {

        AdvancedDotEnv
            .loadDotEnvFile(`${rootDirectory}/../config/default.config.env`);

        AdvancedDotEnv
            .loadDotEnvFile(`${rootDirectory}/../config/${envName}.config.env`);
    }

    static getEnvName() {

        return process.env.ENV_NAME ?? 'local';
    }
}

export const createGlobalConfiguration = (rootDir: string) => {

    const envName = Helper.getEnvName();
    Helper.loadEnv(rootDir, envName);

    const globalConfigObj: ExcludeFunctions<GlobalConfigurationService> = {
        rootDirectory: rootDir,
        security: {
            secrets: {
                accessTokenSecret: Helper.getEnvConfigEntry('JWT_SIGN_SECRET'),
                refreshTokenSecret: Helper.getEnvConfigEntry('JWT_SIGN_SECRET'),
                regTokenSecret: Helper.getEnvConfigEntry('JWT_SIGN_SECRET'),
                invitationTokenSecret: Helper.getEnvConfigEntry('JWT_SIGN_SECRET'),
                setNewPasswordTokenSecret: Helper.getEnvConfigEntry('JWT_SIGN_SECRET')
            },
            tokenLifespans: {
                accessTokenLifespanInS: 2 * 60 * 60, // 2 hours 
                refreshTokenLifespanInS: 72 * 60 * 60, // 72 hours
                setNewPasswordTokenLifespanInS: 8 * 60 * 60, // 8 hours,
                registrationTokenLifespanInS: 127 * 60 * 60, // 127 hours,
                invitationTokenLifespanInS: 127 * 60 * 60, // 127 hours
            },
            gcpStorageAuthCredentials: JSON
                .parse(`
                {
                    "type": "service_account",
                    "project_id": "gifted-country-324010",
                    "private_key_id": "30620e0d02feef285859e9111767700a059d5167",
                    "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDctzBpxf+34a8E\\nGcW7rlQLefMx6HvvTZysHDU11Q0JQoshZMc4K/4dPoIU936/pYXcMTdxWYBc+E0F\\nOtzBK2NbehT5qsWsvftv+3WMwOr14nWMV6Krpqkf7mE4nNGMlBBc9C4biOtTd4Jd\\nhHQMi8bZPVH2xUl38sdOQAS/QJjoFXinTVZQ37DjdQjoezh3xiXl0k/A3mttBlod\\neV2VpXq5PKy97Wt8otWneumVu6IJq0Y4AUTnKv9pEvYItyofJr/0UbWKF2u/U9Es\\nFb2copAgw4fZOgh8mv0wtf2CJgQw4lSNea4Yyjy+St5jXNu+KtA6EWzFyZFnqdwc\\nJRCMBFUnAgMBAAECggEAZx7RqEGhYay4Q/60kyT2UGxYMxOvP9WvovwE4lNZpV9p\\nOJ9osrZfIhOv3BLsLacsnP2DrVpHLmi2N4DSXhAi+jzWKvXeKICUxrOiLrJ9tIbr\\nK7hQIMmbj/ckhjpCb19IK93L4wJ8DEG0b3PwcmIl9B6Bun1ff4K3GrivXxnTtu5e\\npxOm3GuIvrdNimi4KF0bhcsq3gNMeh5JCFGTDNBPZ1JD97oMN3gw45isnO8eRW5s\\n0uFEgaHSYeR0nCyZwDcQl6dRX/m6ifsErRY+7AX3VzaSA/WOxD3+dZe3c9cF7BUO\\nWn/a3WAPO2g3FWpvSd+u8velOpksptcXRz9iCse/1QKBgQD83pbaujWvtkxE3u6Z\\nBXec7NSH1jaql0YcZHzfnQ4qDzvYugMoVnNY8y4YS0epMbj9Zi348HXHCm1xLJ5M\\nD4WyTHJDzU9tgorrDnWOxcpUYFGmXi2jLT91fla8O+eQb/O4H0qvHdRErf6DgXjQ\\nArgzAliZT2GBKpXmN4sp4rj/TQKBgQDfcrIPe/k1SmeOehtm4bCV/9hy+Ygf97wk\\noq/9HOk7NI0I0kpEveHuL4cV6QYmB0hxgAtpEW4Zk1Uwgwu0Q2qvd3T0OXAsH5Ff\\n0B9w3ZFNb/DIEoF8OWAH1gmMmXmLFU/+H+JPC2Pj5M+DafTlJBHC4Zw9PFaSHyhA\\nO70zm4WUQwKBgE+fVyjwUU9Ou51EBSUxz4QeHp3XGceFcpImIhvXPEqKGXIYwD3H\\nWvK7P9xud9YSzgkcT4V/UdamtedZAU855ANMhv5Ke6Qj4tI471NRfHAtFAiqxvwG\\nl2DLs0v6IOQeHEPxtnaFkf0+PFH0RrJY6N9G8db0Y+NkIWcoPi2mMlJRAoGBAKUC\\nYUYYCi/1c0X/HG88aZhL6H73kTPyUYlIbuhfSklDhIcoLFpZUxf/FyXyAG1i4XeX\\n1FVR3tmaOMXrcGA9jPJpKAAWzqR253c3DZDevqfN66UELYUcJbODt2eSCvTP11PW\\nHdy7j5fC6A+m1ofEvC0LSMLb5R5hTespco5C4kFbAoGAfYQrWmmT9AJszsDV5+0c\\no2eovcpA16tSQBfUn7bB0ExJ+FyXdT4gG8WcFx9cOybnfjV10R89r5cgHMrueL+O\\n0NB5rnxt8Ojb02dVaZUzeSUynBPLrQ5RNy5Sz5kUZ9hOG5sCFRlZNOVSv3CV11Dc\\nmhrLdRe8+zdWmmTVuKEu9N8=\\n-----END PRIVATE KEY-----\\n",
                    "client_email": "storage-admin-service-account@gifted-country-324010.iam.gserviceaccount.com",
                    "client_id": "105320048972068302567",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/storage-admin-service-account%40gifted-country-324010.iam.gserviceaccount.com"
                }
                  `)
        },
        tempomat: {
            defaultMinutesPerDay: 20
        },
        misc: {
            hostPort: Helper.getEnvConfigEntry('HOST_PORT'),
            environmentName: envName,
            isProd: envName === 'main',
            domainTemplate: Helper.getEnvConfigEntry('DOMAIN_TEMPLATE'),
            accessTokenCookieName: `epi_access_token_${envName}`,
            refreshTokenCookieName: `epi_refresh_token_${envName}`,
            videoCompletedPercentage: Helper.getEnvConfigEntry('VIDEO_COMPLETED_PERCENTAGE', 'int'),
            sendRealEmails: Helper.getEnvConfigEntry('SEND_REAL_EMAILS', 'bool'),
            bypassDBTokenCheck: Helper.getEnvConfigEntry('BYPASS_DB_TOKEN_CHECK', 'bool'),
            useSecureCookies: Helper.getEnvConfigEntry('USE_SECURE_COOKIES', 'bool'),
            logDotEnv: Helper.getEnvConfigEntry('LOG_DOTENV', 'bool')
        },
        fileStorage: {
            assetStoreUrl: `https://storage.googleapis.com/${Helper.getEnvConfigEntry('FILE_STORAGE_BUCKET_NAME')}`,
            bucketName: Helper.getEnvConfigEntry('FILE_STORAGE_BUCKET_NAME'),
        },
        mail: {
            mailHost: 'smtp.sendgrid.net',
            senderEmail: Helper.getEnvConfigEntry('MAIL_SERVICE_USER_NAME'),
            senderPassword: Helper.getEnvConfigEntry('MAIL_SERVICE_USER_PASSWORD')
        },
        database: {
            name: Helper.getEnvConfigEntry('DB_NAME'),
            publicHostAddress: Helper.getEnvConfigEntry('DB_HOST_ADDRESS'),
            gcpCloudSqlConnectionName: 'gifted-country-324010:europe-central2:epistogram',
            port: parseInt(Helper.getEnvConfigEntry('DB_PORT')),
            serviceUserName: Helper.getEnvConfigEntry('DB_SERVICE_USER_NAME'),
            serviceUserPassword: Helper.getEnvConfigEntry('DB_SERVICE_USER_PASSWORD'),
            isOrmLoggingEnabled: false,
            isHostedOnGCP: Helper.getEnvConfigEntry('IS_HOSTED_ON_GCP', 'bool'),
        },
        logging: {
            enabledScopes: ['GENERIC', 'ERROR'] as LogScopeType[],
        },
        practiseQuestions: {
            incorrectQuestionDelayMinutes: 1,
            correctQuestionDelayMinutes: 3,
            incorrectPractiseQuestionDelayMinutes: 5
        },
        questionAnswer: {
            maxQuestionScore: 4,
            correctAnswerScore: 1,
        },
        coinRewardAmounts: {
            questionCorrectAnswer: 1,
            videoWatched: 1,
            answerStreak: {
                shortStreak: {
                    length: 5,
                    rewardAmount: 5
                },
                longStreak: {
                    length: 10,
                    rewardAmount: 15
                }
            },
            genericActivity: 10,
            activityStreak3Days: 10,
            activityStreak5Days: 20,
            activityStreak10Days: 50,
        }
    };

    if (globalConfigObj.misc.logDotEnv)
        console.log(globalConfigObj);

    const globalConfigService = new GlobalConfigurationService(globalConfigObj);

    const cookieOptions: IXCookieOptions = {
        sameSite: 'strict',
        secure: globalConfigService.misc.useSecureCookies,
        httpOnly: true,
        domain: '.epistogram.com'
    };

    return {
        globalConfigService,
        cookieOptions
    }
};


