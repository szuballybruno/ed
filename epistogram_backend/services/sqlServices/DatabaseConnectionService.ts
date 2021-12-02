import { User } from "../../models/entity/User";
import { getDatabaseConnectionParameters, GlobalConfiguration } from "../environment";
import { log, logObject } from "../misc/logger";
import { ORMConnectionService } from "./ORMConnectionService";
import { SeedService } from "./SeedService";
import { SQLBootstrapperService } from "./SQLBootstrapper";
import { ExecSQLFunctionType, SQLConnectionService } from "./SQLConnectionService";

export type SQLConnectionType = {
    executeSQL: ExecSQLFunctionType,
    terminateConnectionAsync: () => Promise<void>
}

export class DbConnectionService {

    private _config: GlobalConfiguration;
    private _sqlBootstrapperSvc: SQLBootstrapperService;
    private _sqlConnectionService: SQLConnectionService;
    private _ormConnectionService: ORMConnectionService;
    private _seedService: SeedService;

    constructor(
        config: GlobalConfiguration,
        sqlConnectionService: SQLConnectionService,
        sqlStrapper: SQLBootstrapperService,
        ormConnectionService: ORMConnectionService,
        seedService: SeedService) {

        this._config = config;
        this._sqlBootstrapperSvc = sqlStrapper;
        this._sqlConnectionService = sqlConnectionService;
        this._ormConnectionService = ormConnectionService;
        this._seedService = seedService;
    }

    async initializeAsync() {

        const allowPurge = this._config.database.allowPurge;
        const forcePurge = this._config.database.forcePurge;

        // test DB
        await this.testDbConnection();

        // purge DB
        if (allowPurge && forcePurge)
            await this._sqlBootstrapperSvc.purgeDBAsync();

        await this.connectDatabaseAsync();
    }

    async seedDBAsync() {

        const isFreshDB = await this.isEmptyDatabase();
        if (isFreshDB) {

            log("Seeding DB...", "strong");

            await this._seedService.seedDBAsync();

            log("Seeding DB done!", "strong");
        }
    }

    private async connectDatabaseAsync() {

        log("Connecting database...");

        // connect TypeORM
        await this._ormConnectionService.connectORMAsync();

        // bootstrap database 
        await this._sqlBootstrapperSvc.bootstrapDatabase();
    }

    private async testDbConnection() {

        log("Making first database connection...", "strong");
        log("Connection properties: ")
        logObject(JSON.stringify(getDatabaseConnectionParameters()));

        const sqlConnection = await this._sqlConnectionService.connectToDBAsync();

        log("Connection successful!", "strong");
    }

    private isEmptyDatabase = async () => {

        const users = await this._ormConnectionService
            .getRepository(User)
            .find();

        return users.length === 0;
    }
}