import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ClassType } from "../../models/Types";
import { GlobalConfiguration } from "../misc/GlobalConfiguration";
import { log } from "../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export type ORMConnection = Connection;

export type ORMSchemaType = {
    entities: any[],
    viewEntities: any[]
}

export class ORMConnectionService {

    private _config: GlobalConfiguration;
    private _schema: ORMSchemaType;
    private _sqlBootstrapperService: SQLBootstrapperService;
    private _ormConnection: ORMConnection;

    constructor(config: GlobalConfiguration, schema: ORMSchemaType, bootrstrapper: SQLBootstrapperService) {

        this._config = config;
        this._schema = schema;
        this._sqlBootstrapperService = bootrstrapper;
    }

    connectORMAsync = async () => {

        const isSyncEnabled = this._config.database.isOrmSyncEnabled;
        const isLoggingEnabled = this._config.database.isOrmLoggingEnabled;
        const allowPurge = this._config.database.allowPurge;
        const forcePurge = this._config.database.forcePurge;
        const canPurgeOnRetry = allowPurge && !forcePurge;
        const dbConnOpts = this._config.getDatabaseConnectionParameters();

        const options = {
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
                ...this._schema.entities,
                ...this._schema.viewEntities
            ],
        } as ConnectionOptions;

        try {

            log("Connecting to database with TypeORM...", "strong");
            this._ormConnection = await this.createTypeORMConnection(options);
        }
        catch (e) {

            if (!canPurgeOnRetry)
                throw e;

            log("Purging DB...", "strong");
            await this._sqlBootstrapperService.purgeDBAsync();

            log("(#2 attempt) Connecting to database with TypeORM...", "strong");
            this._ormConnection = await this.createTypeORMConnection(options);
        }
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    getOrmConnection() {

        return this._ormConnection;
    }

    private createTypeORMConnection = async (opt: ConnectionOptions) => {

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
}