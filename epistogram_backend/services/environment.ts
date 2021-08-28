import { staticProvider } from "../staticProvider";
import { log, logError } from "./misc/logger";

// 
// Env Init 
//

type EnvironmentType = "development" | "production" | "demo" | "local";

export const getCurrentEnvironmentName = () => {

    // const node_env = process.env.NODE_ENV;

    // if (node_env == "production")
    //     return "production" as EnvironmentType;

    // if (node_env == "demo")
    //     return "demo" as EnvironmentType;

    // if (node_env == "development")
    //     return "development" as EnvironmentType;

    // return "local" as EnvironmentType;

    return process.env.ENVIRONMENT_NAME as EnvironmentType;
}

log("Environemnt: " + getCurrentEnvironmentName());

const getEnvConfigEntry = (entryName: string, allowEmptyStr?: boolean) => {

    const fullEntryName = entryName;
    const value = process.env[fullEntryName];

    if (!value && value != "false" && !allowEmptyStr)
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
        passwordHashKey: "abcd"
    }

    misc = {
        uploadFolderPath: getEnvConfigEntry("UPLOAD_FOLDER_PATH"),
        hostPort: getEnvConfigEntry("HOST_PORT"),
        environmentName: getEnvConfigEntry("ENVIRONMENT_NAME"),
        frontendUrl: getEnvConfigEntry("FRONTEND_URL"),
        assetStoreUrl: "https://dev.epistogram.com/assets/epistogram"
    }

    mail = {
        tokenMailSecret: getEnvConfigEntry("MAIL_TOKEN_SECRET"),
        mailHost: getEnvConfigEntry("MAIL_HOST"),
        senderEmail: getEnvConfigEntry("MAIL_SENDER_MAIL"),
        senderPassword: getEnvConfigEntry("MAIL_SENDER_PASSWORD")
    }

    vps = {
        host: getEnvConfigEntry("VPS_HOST"),
        scpPort: getEnvConfigEntry("VPS_SCP_PORT"),

        username: getEnvConfigEntry("VPS_USERNAME"),
        passphrase: getEnvConfigEntry("VPS_PASSPHRASE"),

        privateKey: getEnvConfigEntry("VPS_RSA_PRIVATE_KEY")
    }

    database = {
        name: getEnvConfigEntry("DB_NAME"),
        hostAddress: getEnvConfigEntry("DB_HOST_ADDRESS"),
        port: parseInt(getEnvConfigEntry("DB_PORT")),
        serviceUserName: getEnvConfigEntry("DB_SERVICE_USER_NAME"),
        serviceUserPassword: getEnvConfigEntry("DB_SERVICE_USER_PASSWORD"),
        isOrmSyncEnabled: getEnvConfigEntry("DB_IS_ORM_SYNC_ENABLED") == "true",
        isOrmLoggingEnabled: getEnvConfigEntry("DB_IS_ORM_LOGGING_ENABLED") == "true",
        recreateDatabaseAtStart: getEnvConfigEntry("DB_RECREATE_AT_START") == "true"
    }
}