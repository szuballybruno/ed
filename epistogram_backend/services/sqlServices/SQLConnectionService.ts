import { Pool, QueryResult } from 'pg';
import { getDatabaseConnectionParameters } from '../environment';
import { log } from '../misc/logger';

export type ExecSQLFunctionType = (sql: string, values?: any[]) => Promise<QueryResult<any>>;

export class SQLConnectionService {

    private _pool: Pool;

    constructor() {

    }

    async establishConnectionAsync() {

        log("Connecting to SQL...");

        const dbConfig = getDatabaseConnectionParameters();

        const pool = new Pool({
            port: dbConfig.port,
            host: dbConfig.host,
            user: dbConfig.username,
            database: dbConfig.databaseName,
            password: dbConfig.password,
        });

        // listen to errors 
        pool.on("error", x => console.error(x));

        // test connection
        await pool.query("CREATE TABLE IF NOT EXISTS public.\"connection_test_table\" (\"columnA\" integer);");

        this._pool = pool;
    }

    executeSQLAsync = async (sql: string, values?: any[]) => {

        try {

            return await this._pool.query(sql, values);
        }
        catch (e) {

            const err = e as any;
            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    }
}