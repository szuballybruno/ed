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
    require('dotenv').config({ path: "config.env" })

    // LOADED SUCCESSFULLY
    if (!!process.env.ENVIRONMENT_NAME) {

        log("Loaded configuration for environemnt: " + process.env.ENVIRONMENT_NAME);
        const globalConfig = new GlobalConfiguration();

        return globalConfig;
    }

    // LOAD FAILED 
    else {

        throw new Error("Failed to load the configuration!");
    }
}

export class GlobalConfiguration {

    // 
    // COMPLEX
    // 

    security = {
        rsaPrivateKey: getEnvConfigEntry("RSA_PRIVATE_KEY"),
        jwtSignSecret: getEnvConfigEntry("JWT_SIGN_SECRET"),
    }

    misc = {
        uploadFolderPath: getEnvConfigEntry("UPLOAD_FOLDER_PATH"),
        tokenSecret: getEnvConfigEntry("TOKEN_SECRET"),
        hostPort: getEnvConfigEntry("HOST_PORT")
    }

    urls = {
        backendUrl: getEnvConfigEntry("BACKEND_URL"),
        backendUrlMinimal: getEnvConfigEntry("BACKEND_URL_MINIMAL"),
        frontendUrl: getEnvConfigEntry("FRONTEND_URL")
    }

    mail = {
        tokenMailSecret: getEnvConfigEntry("MAIL_TOKEN_SECRET"),
        mailHost: getEnvConfigEntry("MAIL_HOST"),
        senderEmail: getEnvConfigEntry("MAIL_SENDER_MAIL"),
        senderPassword: getEnvConfigEntry("MAIL_SENDER_PASSWORD")
    }

    vpsSSHAuthConfig = {
        host: getEnvConfigEntry("VPS_SSH_HOST"),
        port: getEnvConfigEntry("VPS_SSH_PORT"),

        username: getEnvConfigEntry("VPS_SSH_USERNAME"),
        passphrase: getEnvConfigEntry("VPS_SSH_PASSPHRASE"),

        dstPort: getEnvConfigEntry("VPS_SSH_DST_PORT"),
        agent: process.env.SSH_AUTH_SOCK,
        privateKey: this.security.rsaPrivateKey,
    };

    vpsSCPConfig = {
        host: getEnvConfigEntry("VPS_SCP_HOST"),
        port: getEnvConfigEntry("VPS_SCP_PORT"),

        username: getEnvConfigEntry("VPS_SCP_USERNAME"),
        passphrase: getEnvConfigEntry("VPS_SCP_PASSPHRASE"),

        privateKey: this.security.rsaPrivateKey
    };

    mongodbConfig = {
        vpsSSHAuthConfig: this.vpsSSHAuthConfig,
        connectionUrl: getEnvConfigEntry("MONGO_DB_CONNECTION_URL"),
        options: {
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        isSSHConnection: getEnvConfigEntry("MONGO_DB_IS_SSH") == "true",
        mongoDBCredentials: {
            serverUrl: getEnvConfigEntry("MONGO_DB_SERVER_URL"),
            dbName: getEnvConfigEntry("MONGO_DB_DB_NAME"),
            dbUsername: getEnvConfigEntry("MONGO_DB_DB_USER_NAME"),
            dbPassword: getEnvConfigEntry("MONGO_DB_DB_PASSWORD")
        }
    };
}