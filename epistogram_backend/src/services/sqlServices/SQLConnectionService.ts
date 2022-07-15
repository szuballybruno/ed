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

    executeSQLAsync = async (sql: string, values?: any[]) => {

        try {

            // console.log('conn');
            // this._currentClient = await this._pool
            //     .connect();

            if (!this._client)
                throw new Error('Trying to use a disconnected postgres client!');

            return await this._client
                .query(sql, values);
        }
        catch (e) {

            const err = e as any;
            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    };
}