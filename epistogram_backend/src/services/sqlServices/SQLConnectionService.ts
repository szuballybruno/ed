import Postgres, { QueryResultRow } from 'pg';
import { LoggerService } from '../LoggerService';
import { SQLPoolService } from './SQLPoolService';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<Postgres.QueryResult<any>>;

export class SQLConnectionService {

    private _client: Postgres.PoolClient | null;

    constructor(
        private _poolService: SQLPoolService,
        private _loggerService: LoggerService) {

    }

    async createConnectionClientAsync() {

        this._loggerService.logScoped('TRANSACTION', 'SECONDARY', 'Connecting postgres client...');
        this._client = await this._poolService.connectClientAsync();
    }

    releaseConnectionClient() {

        this._loggerService.logScoped('TRANSACTION', 'Releasing postgres client...');
        this._client?.release();
    }

    async endPoolAsync() {

        await this._poolService.endPool();
    }

    async executeSQLAsync<T extends QueryResultRow = any>(sql: string, values?: any[]) {

        try {

            if (!this._client)
                throw new Error('Trying to use a disconnected postgres client!');

            return await this._client
                .query<T>(sql, values);
        }
        catch (err: any) {

            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    }
}