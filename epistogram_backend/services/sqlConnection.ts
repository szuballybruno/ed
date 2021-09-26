import { Pool, Client } from 'pg';
import { staticProvider } from '../staticProvider';
import { getCloudSQLHost } from './environment';
import { log } from './misc/logger';

export const connectToDB = () => {

    log("Connecting to SQL...");

    const dbConfig = staticProvider.globalConfig.database;

    const pool = new Pool({
        // host: dbConfig.hostAddress,
        // port: dbConfig.port,
        host: getCloudSQLHost(),
        user: dbConfig.serviceUserName,
        database: dbConfig.name,
        password: dbConfig.serviceUserPassword,
    })

    const executeSQLAsync = async (sql: string) => {

        const results = await pool.query(sql);

        return results;
    }

    return {
        executeSQL: executeSQLAsync,
        terminateConnectionAsync: () => pool.end()
    }
}