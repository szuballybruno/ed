import Postgres, { PoolClient } from 'pg';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';

export class SQLPoolService {

    private _pool: Postgres.Pool;
    private _config: GlobalConfiguration;

    constructor(config: GlobalConfiguration) {

        this._config = config;
    }

    createPool() {

        log('Creating postgres client pool...');

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

        this._pool = pool;
    }

    async connectClientAsync() {

        return await this._pool.connect();
    }
}