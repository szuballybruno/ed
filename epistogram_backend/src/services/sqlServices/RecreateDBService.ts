import { toSQLSnakeCasing } from '../../utilities/helpers';
import { log } from '../misc/logger';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { SeedService } from './SeedService';
import { CreateDBService } from './CreateDBService';
import { ExecSQLFunctionType, SQLConnectionService } from './SQLConnectionService';

export type SQLConnectionType = {
    executeSQL: ExecSQLFunctionType,
    terminateConnectionAsync: () => Promise<void>
}

export class RecreateDBService {

    constructor(
        private _createDBService: CreateDBService,
        private _seedService: SeedService,
        private _dbSchema: XDBMSchemaType,
        private _sqlConnectionService: SQLConnectionService) {
    }

    async recreateDBAsync() {

        // PURGE DB
        await this
            ._purgeDBAsync();

        // CREATE  
        await this._createDBService
            .createDatabaseSchemaAsync();

        // SEED 
        await this._seedService
            .seedDBAsync();
    }

    private _purgeDBAsync = async () => {

        log('Purging DB / Start...', { entryType: 'strong' });

        const dropDBScript = this._dbSchema
            .entities
            .map(x => `DROP TABLE IF EXISTS public.${toSQLSnakeCasing(x.name)} CASCADE;`)
            .join('\n');

        const results = await this._sqlConnectionService
            .executeSQLAsync(dropDBScript);

        log('Purging DB / Done.', { entryType: 'strong' });
    };
}