import { readFileSync } from "fs";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { dbSchema } from "./services/misc/dbSchema";
import { User } from "./models/entity/User";
import { seedDB } from "./services/dbSeedService";
import { getDatabaseConnectionParameters } from "./services/environment";
import { log, logObject } from "./services/misc/logger";
import { connectToDBAsync } from "./services/sqlServices/sqlConnection";
import { recreateFunctionsAsync } from "./services/sqlServices/sqlFunctionCreatorService";
import { recreateViewsAsync } from "./services/sqlServices/sqlViewCreatorService";
import { staticProvider } from "./staticProvider";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async () => {

    const allowPurge = staticProvider.globalConfig.database.allowPurge;
    const forcePurge = staticProvider.globalConfig.database.forcePurge;

    // 
    // TEST DB CONNCETION 
    // 

    log("Making first database connection...", "strong");
    log("Connection properties: ")
    logObject(JSON.stringify(getDatabaseConnectionParameters()));

    const { executeSQL, terminateConnectionAsync } = await connectToDBAsync();
    staticProvider.sqlConnection = { executeSQL, terminateConnectionAsync };

    log("Connection successful!", "strong");

    // 
    // PURGE DB
    //
    if (allowPurge && forcePurge) {

        log("Purging DB...", "strong");
        await purgeDBAsync();
    }

    //
    // CONNECT TYPE ORM
    //
    try {

        log("Connecting to database with TypeORM...", "strong");
        const postgresOptions = getPorstgresOptions();
        staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);
    } catch (e) {

        logObject(e);

        // 
        // PURGE DB
        //
        if (allowPurge && !forcePurge) {

            log("Purging DB...", "strong");
            await purgeDBAsync();

            //
            // CONNECT TYPE ORM AGAIN
            //
            log("(#2 attempt) Connecting to database with TypeORM...", "strong");
            const postgresOptions = getPorstgresOptions();
            staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);
        }
    }

    log("TypeORM connected!", "strong");

    //
    // CREATE VIEWS
    //
    log("Creating SQL views...", "strong")

    await recreateViewsAsync(dbSchema.viewScripts);

    log("SQL views created!", "strong");

    //
    // CREATE FUNCTIONS
    //
    log("Creating SQL functions...", "strong")

    await recreateFunctionsAsync(dbSchema.functionScripts);

    log("SQL functions created!", "strong");

    //
    // SEED DB
    //
    const isFreshDB = await getIsFreshDB();
    if (isFreshDB) {

        log("Seeding DB...", "strong");

        await seedDB();

        log("Seeding DB done!", "strong");
    }
}

const purgeDBAsync = async () => {

    const sql = readFileSync(`./sql/misc/dropDB.sql`, 'utf8');

    const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();

    const results = await executeSQL(sql);

    await terminateConnection();
}

const getIsFreshDB = async () => {

    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    return users.length === 0;
}

const createTypeORMConnection = async (opt: ConnectionOptions) => {

    try {

        log("Connecting to SQL trough TypeORM...");
        const connection = await createConnection(opt);

        if (!connection.manager)
            throw new Error("TypeORM manager is null or undefined!");

        return connection;
    }
    catch (e) {

        throw new Error("Type ORM connection error!" + e);
    }
}

const getPorstgresOptions = () => {

    const dbConfig = staticProvider.globalConfig.database;

    const isSyncEnabled = dbConfig.isOrmSyncEnabled;
    const isLoggingEnabled = dbConfig.isOrmLoggingEnabled;
    const dbConnOpts = getDatabaseConnectionParameters();

    return {
        type: "postgres",
        port: dbConnOpts.port,
        host: dbConnOpts.host,
        username: dbConnOpts.username,
        password: dbConnOpts.password,
        database: dbConnOpts.databaseName,
        synchronize: isSyncEnabled,
        logging: isLoggingEnabled,
        extra: {
            socketPath: dbConnOpts.socketPath
        },
        // "models/entity/**/*.ts"
        entities: [
            ...dbSchema.entities,
            ...dbSchema.viewEntities
        ],
    } as ConnectionOptions;
}