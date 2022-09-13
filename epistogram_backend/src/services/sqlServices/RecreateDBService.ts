import { toSQLSnakeCasing } from '../../utilities/helpers';
import { LoggerService } from '../LoggerService';
import { XDBMSchemaService } from '../XDBManager/XDBManagerTypes';
import { CreateDBService } from './CreateDBService';
import { SeedService } from './SeedService';
import { ExecSQLFunctionType, SQLConnectionService } from './SQLConnectionService';

export type SQLConnectionType = {
    executeSQL: ExecSQLFunctionType,
    terminateConnectionAsync: () => Promise<void>
}

export class RecreateDBService {

    constructor(
        private _createDBService: CreateDBService,
        private _seedService: SeedService,
        private _dbSchema: XDBMSchemaService,
        private _sqlConnectionService: SQLConnectionService,
        private _logger: LoggerService) {
    }

    async recreateDBAsync() {

        // PURGE DB
        await this
            ._purgeDBAsync();

        // CREATE  
        await this._createDBService
            .createDatabaseSchemaAsync(true);

        // SEED 
        await this._seedService
            .seedDBAsync();
    }

    private _purgeDBAsync = async () => {

        this._logger.logScoped('BOOTSTRAP', 'Purging DB / Start...');

        const dropDBScript = this._dbSchema
            .entities
            .map(x => `DROP TABLE IF EXISTS public.${toSQLSnakeCasing(x.name)} CASCADE;`)
            .join('\n');

        const results = await this._sqlConnectionService
            .executeSQLAsync(dropDBScript);

        this._logger.logScoped('BOOTSTRAP', 'Purging DB / Done.');
    };
}