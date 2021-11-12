import { staticProvider } from "../staticProvider";
import { log, logError } from "./misc/logger";

// 
// Env Init 
//

type EnvironmentType = "development" | "production" | "demo" | "local";

export const getCurrentEnvironmentName = () => {

    return process.env.ENVIRONMENT_NAME as EnvironmentType;
}

log("Environemnt: " + getCurrentEnvironmentName());

const getEnvConfigEntry = (entryName: string, allowEmptyStr?: boolean) => {

    const fullEntryName = entryName;
    const value = process.env[fullEntryName];

    if (!value && value !== "false" && !allowEmptyStr)
        throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${getCurrentEnvironmentName()}'!`);

    log(entryName + " -> " + value);
    return value ?? "";
}

export const initailizeDotEnvEnvironmentConfig = () => {

    log("Loading config.env...");
    require('dotenv').config({ path: "config.env" });

    const globalConfig = new GlobalConfiguration();

    // set static global config
    staticProvider.globalConfig = globalConfig;

    log(`Started in '${globalConfig.misc.environmentName}' environment!`);
}

export class GlobalConfiguration {

    security = {
        jwtSignSecret: getEnvConfigEntry("JWT_SIGN_SECRET"),
        accessTokenLifespanInS: 15 * 60, // 15 minutes
        refreshTokenLifespanInS: 604800, // one week
        passwordHashKey: "abcd",
        createPasswordTokenSecret: "Z3Vlc3Q="
    }

    misc = {
        hostPort: getEnvConfigEntry("HOST_PORT"),
        environmentName: getEnvConfigEntry("ENVIRONMENT_NAME"),
        frontendUrl: getEnvConfigEntry("FRONTEND_URL"),
        isLocalhost: getEnvConfigEntry("IS_LOCALHOST") === "true",
        accessTokenCookieName: "accessToken",
        refreshTokenCookieName: "refreshToken",
        isUnderMaintanence: getEnvConfigEntry("IS_UNDER_MAINTENANCE") === "true"
    }

    fileStorage = {
        assetStoreUrl: getEnvConfigEntry("FILE_STORAGE_URL"),
        bucketName: getEnvConfigEntry("FILE_STORAGE_BUCKET_NAME"),
    }

    mail = {
        tokenMailSecret: getEnvConfigEntry("MAIL_TOKEN_SECRET"),
        mailHost: getEnvConfigEntry("MAIL_HOST"),
        senderEmail: getEnvConfigEntry("MAIL_SENDER_MAIL"),
        senderPassword: getEnvConfigEntry("MAIL_SENDER_PASSWORD")
    }

    database = {
        name: getEnvConfigEntry("DB_NAME"),
        publicHostAddress: getEnvConfigEntry("DB_HOST_ADDRESS"),
        gcpCloudSqlConnectionName: "gifted-country-324010:europe-central2:epistogram",
        port: parseInt(getEnvConfigEntry("DB_PORT")),
        serviceUserName: getEnvConfigEntry("DB_SERVICE_USER_NAME"),
        serviceUserPassword: getEnvConfigEntry("DB_SERVICE_USER_PASSWORD"),
        isOrmSyncEnabled: getEnvConfigEntry("DB_IS_ORM_SYNC_ENABLED") === "true",
        isOrmLoggingEnabled: getEnvConfigEntry("DB_IS_ORM_LOGGING_ENABLED") === "true",
        allowPurge: getEnvConfigEntry("DB_ALLOW_PURGE") === "true",
        forcePurge: getEnvConfigEntry("DB_FORCE_PURGE") === "true",
        isHostedOnGCP: getEnvConfigEntry("IS_HOSTED_ON_GCP") === "true"
    }
}

export const getDatabaseConnectionParameters = () => {

    const dbConfig = staticProvider.globalConfig.database;
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