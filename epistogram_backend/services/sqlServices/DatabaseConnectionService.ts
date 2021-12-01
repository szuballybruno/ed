import { Connection } from "typeorm";
import { ClassType } from "../../models/Types";
import { getDatabaseConnectionParameters, GlobalConfiguration } from "../environment";
import { log, logObject } from "../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";
import { ExecSQLFunctionType } from "./SQLConnectionService";

export type TypeORMConnection = Connection;

export type SQLConnectionType = {
    executeSQL: ExecSQLFunctionType,
    terminateConnectionAsync: () => Promise<void>
}

export class DbConnectionService {

    private _ormConnection: TypeORMConnection;
    private _sqlConnection: SQLConnectionType;
    private _config: GlobalConfiguration;
    private _sqlBootstrapperSvc: SQLBootstrapperService;

    constructor(config: GlobalConfiguration, sqlStrapper: SQLBootstrapperService) {

        this._config = config;
        this._sqlBootstrapperSvc = sqlStrapper;
    }

    async initializeAsync(ormConnection: TypeORMConnection, sqlConnection: SQLConnectionType) {

        this._ormConnection = ormConnection;
        this._sqlConnection = sqlConnection;

        const allowPurge = this._config.database.allowPurge;
        const forcePurge = this._config.database.forcePurge;

        // test DB
        await this.testDbConnection();

        // purge DB
        if (allowPurge && forcePurge)
            await this.purgeDBAsync();

        // connect TypeORM
        this._ormConnection = await this.connectORM();

        // bootstrap database 
        await this._sqlBootstrapperSvc.bootstrapDatabase();

        //
        // SEED DB
        //
        const isFreshDB = await getIsFreshDB();
        if (isFreshDB) {

            log("Seeding DB...", "strong");

            await seedDB();

            log("Seeding DB done!", "strong");
        }

        return { sqlConnection, ormConnection: staticProvider.ormConnection };
    }

    private async connectORM() {

        const allowPurge = this._config.database.allowPurge;
        const forcePurge = this._config.database.forcePurge;

        try {

            log("Connecting to database with TypeORM...", "strong");
            const postgresOptions = this.getPorstgresOptions();
            const ormConnection = await this.createTypeORMConnection(postgresOptions);
            return ormConnection;
        } catch (e) {

            logObject(e);

            if (allowPurge && !forcePurge) {

                log("Purging DB...", "strong");
                await this.purgeDBAsync();

                //
                // CONNECT TYPE ORM AGAIN
                //
                log("(#2 attempt) Connecting to database with TypeORM...", "strong");
                const postgresOptions = this.getPorstgresOptions();
                const ormConnection = await this.createTypeORMConnection(postgresOptions);
                return ormConnection;
            }
        }
    }

    private async testDbConnection() {

        log("Making first database connection...", "strong");
        log("Connection properties: ")
        logObject(JSON.stringify(getDatabaseConnectionParameters()));

        const sqlConnection = await this.connectToDBAsync();

        log("Connection successful!", "strong");
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    getSQLConnection() {

        return this._sqlConnection;
    }

    purgeDBAsync = async () => {

        log("Purging DB...", "strong");

        const dropDBScript = dbSchema
            .entities
            .map(x => `DROP TABLE IF EXISTS public.${toSQLName(x.name)} CASCADE;`)
            .join("\n");

        const dropDBScriptPath = `./sql/misc/dropDB.sql`;

        writeFileSync(dropDBScriptPath, dropDBScript, { encoding: "utf-8" });

        const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();
        const results = await executeSQL(dropDBScript);

        await terminateConnection();
    }

    toSQLName = (name: string) => {

        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    getIsFreshDB = async () => {

        const users = await staticProvider
            .ormConnection
            .getRepository(User)
            .find();

        return users.length === 0;
    }

    createTypeORMConnection = async (opt: ConnectionOptions) => {

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

    getPorstgresOptions = () => {

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
            namingStrategy: new SnakeNamingStrategy(),
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
}