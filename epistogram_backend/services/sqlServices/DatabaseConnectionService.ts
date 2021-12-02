import { User } from "../../models/entity/User";
import { getDatabaseConnectionParameters, GlobalConfiguration } from "../environment";
import { log, logObject } from "../misc/logger";
import { ORMConnectionService } from "./ORMConnectionService";
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

    constructor(
        config: GlobalConfiguration,
        sqlConnectionService: SQLConnectionService,
        sqlStrapper: SQLBootstrapperService,
        ormConnectionService: ORMConnectionService) {

        this._config = config;
        this._sqlBootstrapperSvc = sqlStrapper;
        this._sqlConnectionService = sqlConnectionService;
        this._ormConnectionService = ormConnectionService;
    }

    async initializeAsync() {

        const allowPurge = this._config.database.allowPurge;
        const forcePurge = this._config.database.forcePurge;

        // test DB
        await this.testDbConnection();

        // purge DB
        if (allowPurge && forcePurge)
            await this._sqlBootstrapperSvc.purgeDBAsync();

        // connect TypeORM
        await this._ormConnectionService.connectORMAsync();

        // bootstrap database 
        await this._sqlBootstrapperSvc.bootstrapDatabase();

        // seed database 
        await this.seedDB();
    }

    private async seedDB() {

        const isFreshDB = await this.isEmptyDatabase();
        if (isFreshDB) {

            log("Seeding DB...", "strong");

            // await this.seedDB();

            log("Seeding DB done!", "strong");
        }
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