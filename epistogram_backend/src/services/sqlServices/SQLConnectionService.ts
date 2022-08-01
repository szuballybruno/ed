import Postgres from 'pg';
import { LoggerService } from '../LoggerService';
import { logSecondary } from '../misc/logger';
import { SQLPoolService } from './SQLPoolService';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<Postgres.QueryResult<any>>;

export class SQLConnectionService {

    private _client: Postgres.PoolClient | null;

    constructor(
        private _poolService: SQLPoolService,
        private _loggerService: LoggerService) {

    }

    async createConnectionClientAsync() {

        this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', 'Connecting postgres client...');
        this._client = await this._poolService.connectClientAsync();
    }

    releaseConnectionClient() {

        logSecondary('Releasing postgres client...');
        this._client?.release();
    }

    async endPoolAsync(){

        await this._poolService.endPool();
    }

    executeSQLAsync = async (sql: string, values?: any[]) => {

        try {

            if (!this._client)
                throw new Error('Trying to use a disconnected postgres client!');

            return await this._client
                .query(sql, values);
        }
        catch (err: any) {
            
            // this._loggerService.logScoped('GENERIC', 'ERROR', err.message);
            // this._loggerService.logScoped('GENERIC', 'ERROR', err.stack);
            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    };
}