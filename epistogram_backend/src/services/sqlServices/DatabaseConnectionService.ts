import { User } from '../../models/entity/User';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';
import { ORMConnectionService } from './ORMConnectionService';
import { SeedService } from './SeedService';
import { SQLBootstrapperService } from './SQLBootstrapper';
import { ExecSQLFunctionType, SQLConnectionService } from './SQLConnectionService';

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

        const isPurgeDbEnabled = this._config.database.isDangerousDBPurgeEnabled;
        const isProdEnvironemnt = this._config.getIsProdEnvironment();

        // check for prod <> purge conflict 
        if (isPurgeDbEnabled && isProdEnvironemnt)
            throw new Error('----- TRYING TO PURGE DB ON PROD!!!! ----');

        // connect sql
        await this._sqlConnectionService.establishConnectionAsync();

        // purge DB
        if (isPurgeDbEnabled)
            await this._sqlBootstrapperSvc.purgeDBAsync();

        await this.connectDatabaseAsync();
    }

    async seedDBAsync() {

        const isFreshDB = await this.isEmptyDatabase();
        if (isFreshDB) {

            log('Seeding DB...', 'strong');

            await this._seedService.seedDBAsync();

            log('Seeding DB done!', 'strong');
        }
    }

    private async connectDatabaseAsync() {

        log('Connecting database...');

        // connect TypeORM
        await this._ormConnectionService.connectORMAsync();

        // bootstrap database 
        await this._sqlBootstrapperSvc.bootstrapDatabase();
    }

    private isEmptyDatabase = async () => {

        const users = await this._ormConnectionService
            .getRepository(User)
            .find();

        return users.length === 0;
    }
}