import Postgres, { PoolClient } from 'pg';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<Postgres.QueryResult<any>>;

export class SQLConnectionService {

    private _pool: Postgres.Pool;
    private _config: GlobalConfiguration;
    private _currentClient: PoolClient;

    constructor(config: GlobalConfiguration) {

        this._config = config;
    }

    async establishConnectionAsync() {

        log('Connecting to SQL...');

        const dbConfig = this._config
            .getDatabaseConnectionParameters();

        const pool = new Postgres.Pool({
            port: dbConfig.port,
            host: dbConfig.host,
            user: dbConfig.username,
            database: dbConfig.databaseName,
            password: dbConfig.password,
        });

        // listen to errors 
        pool.on('error', x => {

            console.error('NodePG: On error: ');
            console.error(x);
        });

        // test connection
        await pool.query('CREATE TABLE IF NOT EXISTS public."connection_test_table" ("columnA" integer);');

        this._pool = pool;
    }

    executeSQLAsync = async (sql: string, values?: any[]) => {

        try {

            // console.log('conn');
            // this._currentClient = await this._pool
            //     .connect();

            return await this._pool
                .query(sql, values);
        }
        catch (e) {

            const err = e as any;
            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
        finally {

        }
    };
}