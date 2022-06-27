import { User } from '../../models/entity/User';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log, logSecondary } from '../misc/logger';
import { ORMConnectionService } from '../ORMConnectionService/ORMConnectionService';
import { SeedService } from './SeedService';
import { SQLBootstrapperService } from './SQLBootstrapper';
import { ExecSQLFunctionType } from './SQLConnectionService';

export type SQLConnectionType = {
    executeSQL: ExecSQLFunctionType,
    terminateConnectionAsync: () => Promise<void>
}

export class DbConnectionService {

    private _config: GlobalConfiguration;
    private _sqlBootstrapperSvc: SQLBootstrapperService;
    private _ormConnectionService: ORMConnectionService;
    private _seedService: SeedService;

    constructor(
        config: GlobalConfiguration,
        sqlStrapper: SQLBootstrapperService,
        ormConnectionService: ORMConnectionService,
        seedService: SeedService) {

        this._config = config;
        this._sqlBootstrapperSvc = sqlStrapper;
        this._ormConnectionService = ormConnectionService;
        this._seedService = seedService;
    }

    async connectTypeORM() {

        logSecondary('Connecting TypeORM...');

        // connect TypeORM
        await this._ormConnectionService
            .connectTypeORMAsync(true);
    }

    async bootstrapDBAsync() {

        // PURGE IF NECESSARY
        await this._purgeDBIfNecessary();

        // CREATE TABLES 
        await this._connectTypeORMAndCreateTables();

        // BOOTSTRAP 
        await this._sqlBootstrapperSvc
            .bootstrapDatabase();

        // DO NOT SEED IF HAS DATA
        const isFreshDB = await this._isEmptyDatabase();
        if (!isFreshDB) {

            log('DB contains data, skipping seed.', { entryType: 'strong' });
            return;
        }

        // SEED IF HAS NO DATA
        log('Seeding DB...', { entryType: 'strong' });

        await this._seedService
            .seedDBAsync();

        log('Seeding DB done!', { entryType: 'strong' });
    }

    //
    // PRIVATE
    //

    private async _purgeDBIfNecessary() {

        const isPurgeDbEnabled = this._config.database.isDangerousDBPurgeEnabled;
        const isProdEnvironemnt = this._config.getIsProdEnvironment();

        // check for prod <> purge conflict 
        if (isPurgeDbEnabled && isProdEnvironemnt)
            throw new Error('----- TRYING TO PURGE DB ON PROD!!!! ----');

        // purge DB
        if (isPurgeDbEnabled)
            await this._sqlBootstrapperSvc
                .purgeDBAsync();
    }

    private async _connectTypeORMAndCreateTables() {

        logSecondary('Connecting TypeORM and creating tables...');

        // connect TypeORM
        await this._ormConnectionService
            .connectTypeORMAsync();
    }

    private _isEmptyDatabase = async () => {

        const users = await this._ormConnectionService
            .query(User)
            .getMany();

        return users.length === 0;
    };
}