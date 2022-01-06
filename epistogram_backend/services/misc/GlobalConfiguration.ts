import { log, logError } from "./logger";

type EnvironmentType = "development" | "production" | "demo" | "local";

export class GlobalConfiguration {

    rootDirectory: string;

    security = {
        secrets: {
            passwordSalt: "abcdwafawcawa9w87d09awdanw0i21nd123kjndasdd",
            accessTokenSecret: GlobalConfiguration.getEnvConfigEntry("JWT_SIGN_SECRET"),
            refreshTokenSecret: "dasdmaodwhw8dha7y37iaiyd7sta77aw6eads7yawid",
            regTokenSecret: "dwafwfawiudaw8d79afya09d3asnklswf87aw0dja9wu8d",
            invitationTokenSecret: "d42dh9hd23c9283h9f2fj98h23d9ja0jd98jwd989awhd",
            setNewPasswordTokenSecret: "sdajwd99839d8y9ac9ayw7dya398yd9aysdas"
        },
        tokenLifespans: {
            accessTokenLifespanInS: 15 * 60, // 15 minutes
            refreshTokenLifespanInS: 72 * 60 * 60, // 72 hours
            setNewPasswordTokenLifespanInS: 8 * 60 * 60, // 8 hours,
            registrationTokenLifespanInS: 127 * 60 * 60, // 127 hours,
            invitationTokenLifespanInS: 127 * 60 * 60, // 127 hours
        }
    }

    misc = {
        hostPort: GlobalConfiguration.getEnvConfigEntry("HOST_PORT"),
        environmentName: GlobalConfiguration.getEnvConfigEntry("ENVIRONMENT_NAME"),
        frontendUrl: GlobalConfiguration.getEnvConfigEntry("FRONTEND_URL"),
        isLocalhost: GlobalConfiguration.getEnvConfigEntry("IS_LOCALHOST") === "true",
        accessTokenCookieName: "accessToken",
        refreshTokenCookieName: "refreshToken",
        isUnderMaintanence: GlobalConfiguration.getEnvConfigEntry("IS_UNDER_MAINTENANCE") === "true"
    }

    fileStorage = {
        assetStoreUrl: GlobalConfiguration.getEnvConfigEntry("FILE_STORAGE_URL"),
        bucketName: GlobalConfiguration.getEnvConfigEntry("FILE_STORAGE_BUCKET_NAME"),
    }

    mail = {
        mailHost: GlobalConfiguration.getEnvConfigEntry("MAIL_HOST"),
        senderEmail: GlobalConfiguration.getEnvConfigEntry("MAIL_SENDER_MAIL"),
        senderPassword: GlobalConfiguration.getEnvConfigEntry("MAIL_SENDER_PASSWORD")
    }

    database = {
        name: GlobalConfiguration.getEnvConfigEntry("DB_NAME"),
        publicHostAddress: GlobalConfiguration.getEnvConfigEntry("DB_HOST_ADDRESS"),
        gcpCloudSqlConnectionName: "gifted-country-324010:europe-central2:epistogram",
        port: parseInt(GlobalConfiguration.getEnvConfigEntry("DB_PORT")),
        serviceUserName: GlobalConfiguration.getEnvConfigEntry("DB_SERVICE_USER_NAME"),
        serviceUserPassword: GlobalConfiguration.getEnvConfigEntry("DB_SERVICE_USER_PASSWORD"),
        isOrmSyncEnabled: GlobalConfiguration.getEnvConfigEntry("DB_IS_ORM_SYNC_ENABLED") === "true",
        isOrmLoggingEnabled: GlobalConfiguration.getEnvConfigEntry("DB_IS_ORM_LOGGING_ENABLED") === "true",
        allowPurge: GlobalConfiguration.getEnvConfigEntry("DB_ALLOW_PURGE") === "true",
        forcePurge: GlobalConfiguration.getEnvConfigEntry("DB_FORCE_PURGE") === "true",
        isHostedOnGCP: GlobalConfiguration.getEnvConfigEntry("IS_HOSTED_ON_GCP") === "true"
    }

    constructor(rootDirectory: string) {

        this.rootDirectory = rootDirectory;
    }

    getDatabaseConnectionParameters = () => {

        const dbConfig = this.database;
        const isHostedOnGCP = dbConfig.isHostedOnGCP;
        const gcpCloudSqlConnectionString = `/cloudsql/gifted-country-324010:europe-central2:epistogram`;

        return {
            host: isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : dbConfig.publicHostAddress,
            port: isHostedOnGCP
                ? undefined
                : dbConfig.port,
            username: dbConfig.serviceUserName,
            password: dbConfig.serviceUserPassword,
            databaseName: dbConfig.name,
            socketPath: isHostedOnGCP
                ? gcpCloudSqlConnectionString
                : undefined
        }
    }

    static getEnvConfigEntry = (entryName: string, allowEmptyStr?: boolean) => {

        const fullEntryName = entryName;
        const value = process.env[fullEntryName];

        if (!value && value !== "false" && !allowEmptyStr)
            throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${GlobalConfiguration.getCurrentEnvironmentName()}'!`);

        log(entryName + " -> " + value);
        return value ?? "";
    }

    static initGlobalConfig = (rootDirectory: string) => {

        log("Environemnt: " + GlobalConfiguration.getCurrentEnvironmentName());

        log("Loading config.env...");
        require('dotenv').config({ path: "config.env" });

        const globalConfig = new GlobalConfiguration(rootDirectory);

        log(`Started in '${globalConfig.misc.environmentName}' environment!`);

        return globalConfig;
    }

    static getCurrentEnvironmentName = () => {

        return process.env.ENVIRONMENT_NAME as EnvironmentType;
    }
}


