import { log, logError } from "./logger";

// 
// Env Init 
//

type EnvironmentType = "development" | "production" | "demo" | "local";

export const currentEnvironmentName = (process.env.NODE_ENV ?? "local") as EnvironmentType;

const getEnvConfigEntry = (entryName: string, allowEmptyStr?: boolean) => {

    log("Accessing config.env entry: " + entryName);
    const fullEntryName = entryName;
    const value = process.env[fullEntryName];

    if (!value && value != "false" && !allowEmptyStr)
        throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${currentEnvironmentName}'!`);

    return value ?? "";
}

export const initailizeDotEnvEnvironmentConfig = () => {

    log("Loading config.env...");
    require('dotenv').config({ path: "config.env" });

    const globalConfig = new GlobalConfiguration();

    log(`Started in '${globalConfig.misc.environmentName}' environment!`);

    return globalConfig;
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
        frontendUrl: getEnvConfigEntry("FRONTEND_URL")
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

    mongo = {
        dbName: getEnvConfigEntry("MONGO_DB_DB_NAME"),
        dbUsername: getEnvConfigEntry("MONGO_DB_DB_USER_NAME"),
        dbPassword: getEnvConfigEntry("MONGO_DB_DB_PASSWORD"),
        connectionUrl: getEnvConfigEntry("MONGO_DB_CONNECTION_URL"),
    }
}