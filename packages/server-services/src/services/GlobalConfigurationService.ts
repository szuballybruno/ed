import { instantiate } from "@episto/commonlogic";

export type EnvironmentType = 'development' | 'production' | 'demo' | 'local';

export type LogScopeType =
    'ORM' |
    'BOOTSTRAP' |
    'ROLLING SESSION' |
    'GIVEN ANSWER' |
    'GENERIC' |
    'TRANSACTION' |
    'TEMPOMAT' |
    'REGISTRATION' |
    'VERSION SAVE' |
    'COINS' |
    'SERVER' |
    'ERROR' |
    'FILE UPLOAD';

export type ExcludeFunctions<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export type DBConnectionParamsType = {
    host: string;
    username: string;
    password: string;
    databaseName: string;
    port?: number;
    socketPath?: string;
};

export class GlobalConfigurationService {

    rootDirectory: string;
    security: {
        secrets: {
            accessTokenSecret: string;
            refreshTokenSecret: string;
            regTokenSecret: string;
            invitationTokenSecret: string;
            setNewPasswordTokenSecret: string;
        },
        tokenLifespans: {
            accessTokenLifespanInS: number;
            refreshTokenLifespanInS: number;
            setNewPasswordTokenLifespanInS: number;
            registrationTokenLifespanInS: number;
            invitationTokenLifespanInS: number;
        },
        gcpStorageAuthCredentials: any;
    }
    misc: {
        hostPort: string;
        environmentName: string;
        isProd: boolean;
        bypassDBTokenCheck: boolean;
        sendRealEmails: boolean;
        domainTemplate: string;
        useSecureCookies: boolean;
        logDotEnv: boolean;
        accessTokenCookieName: string;
        refreshTokenCookieName: string;
        videoCompletedPercentage: number;
    };

    tempomat: {
        defaultMinutesPerDay: number;
    };

    fileStorage: {
        assetStoreUrl: string;
        bucketName: string;
    };

    mail: {
        mailHost: string;
        senderEmail: string;
        senderPassword: string;
    };

    database: {
        name: string;
        publicHostAddress: string;
        gcpCloudSqlConnectionName: string;
        port: number;
        serviceUserName: string;
        serviceUserPassword: string;
        isOrmLoggingEnabled: boolean;
        isHostedOnGCP: boolean;
    };

    logging: {
        enabledScopes: string[];
    };

    practiseQuestions: {
        incorrectQuestionDelayMinutes: number;
        correctQuestionDelayMinutes: number;
        incorrectPractiseQuestionDelayMinutes: number;
    };

    questionAnswer: {
        maxQuestionScore: number;
        correctAnswerScore: number;
    };

    coinRewardAmounts: {
        questionCorrectAnswer: number;
        videoWatched: number;
        answerStreak: {
            shortStreak: {
                length: number;
                rewardAmount: number;
            },
            longStreak: {
                length: number;
                rewardAmount: number;
            }
        },
        genericActivity: number;
        activityStreak3Days: number;
        activityStreak5Days: number;
        activityStreak10Days: number;
    };

    getDatabaseConnectionParameters(): DBConnectionParamsType {

        const gcpCloudSqlConnectionString = '/cloudsql/gifted-country-324010:europe-central2:epistogram';

        return instantiate<DBConnectionParamsType>({
            host: this.database.isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : this.database.publicHostAddress,
            port: this.database.isHostedOnGCP
                ? undefined
                : this.database.port,
            username: this.database.serviceUserName,
            password: this.database.serviceUserPassword,
            databaseName: this.database.name,
            socketPath: this.database
                .isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : undefined
        })
    };

    constructor(config: ExcludeFunctions<GlobalConfigurationService>) {

        for (const key in config) {
            if (Object.prototype.hasOwnProperty.call(config, key)) {

                (this as any)[key] = (config as any)[key];
            }
        }
    }
};

