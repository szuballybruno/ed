import { ISQLConnectionService } from '@thinkhub/x-orm';
import Postgres from 'pg';
import { LoggerService } from './LoggerService';
import { SQLPoolService } from './SQLPoolService';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<Postgres.QueryResult<any>>;

export class SQLConnectionService implements ISQLConnectionService {

    private _client: Postgres.PoolClient | null;

    constructor(
        private _poolService: SQLPoolService,
        private _loggerService: LoggerService) {

    }

    async createConnectionClientAsync() {

        this._loggerService.logScoped('TRANSACTION', 'SECONDARY', 'Connecting postgres client...');

        this._client = await this
            ._poolService
            .connectClientAsync();

        if (!this._client)
            throw new Error(`Unable to connect pool client!`);

        this._loggerService.logScoped('TRANSACTION', 'SECONDARY', 'Postgres client connected.');
    }

    releaseConnectionClient() {

        this
            ._loggerService
            .logScoped('TRANSACTION', 'Releasing postgres client...');

        this._client?.release();
    }

    async endPoolAsync() {

        await this
            ._poolService
            .endPool();
    }

    async executeSQLAsync<T = any>(sql: string, values?: any[]): Promise<{ rows: T[] }> {

        try {

            if (!this._client)
                throw new Error('Trying to use a disconnected postgres client!');

            const res = await this
                ._client
                .query<any>(sql, values);

            return res as any as { rows: T[] };
        }
        catch (err: any) {

            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    }
}