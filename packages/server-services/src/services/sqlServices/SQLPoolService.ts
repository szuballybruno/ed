import Postgres from 'pg';
import { GlobalConfigurationService } from '../GlobalConfigurationService';
import { log } from '../misc/logger';

export class SQLPoolService {

    private _pool: Postgres.Pool;
    private _config: GlobalConfigurationService;

    constructor(config: GlobalConfigurationService) {

        this._config = config;
        this.createPool();
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

    async endPool(){

        await this._pool.end();
    }
}