import pg from 'pg';
import { SQLConnectionOptions } from './models/SQLConnectionOptions';
import { ISQLConnectionService } from './XORMTypes';

export class SimpleSQLConnectionService implements ISQLConnectionService {

    constructor(private _connectOptions: SQLConnectionOptions) {

    }

    async executeSQLAsync<T = any>(sql: string, values?: any[]): Promise<{ rows: T[] }> {

        try {

            const pool = new pg.Pool({
                host: this._connectOptions.host,
                port: this._connectOptions.port,
                database: this._connectOptions.database,
                password: this._connectOptions.password,
                user: this._connectOptions.user
            });

            const res = await pool
                .query<any>(sql, values);

            return res as any as { rows: T[] };
        }
        catch (err: any) {

            throw new Error(`Message: ${err.message} Detail: ${err.detail}`);
        }
    }
}