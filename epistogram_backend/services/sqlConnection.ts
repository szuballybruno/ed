import { Pool, Client } from 'pg';
import { staticProvider } from '../staticProvider';

export const connectToDB = () => {

    const dbConfig = staticProvider.globalConfig.database;

    const pool = new Pool({
        user: dbConfig.serviceUserName,
        host: dbConfig.hostAddress,
        database: dbConfig.name,
        password: dbConfig.serviceUserPassword,
        port: dbConfig.port,
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