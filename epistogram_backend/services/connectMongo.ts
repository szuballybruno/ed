import { Db, MongoClient } from "mongodb";
import { globalConfig } from "../server";
import { log } from "./logger";

export class Connection {
    public static db: Db;
}

type MongoClientType = { db: (databaseName: string) => any; };

export const connectToMongoDB = (): Promise<void> => {

    log("Connecting to MongoDB...");

    const dbConfig = globalConfig.mongodbConfig;

    return new Promise((resolve, reject) => {

        const connectionSettings = {
            url: dbConfig.connectionUrl,
            options: dbConfig.options,
            dbName: globalConfig.mongodbConfig.mongoDBCredentials.dbName
        }

        log("Trying to connect to: " + connectionSettings.url);

        MongoClient.connect(
            connectionSettings.url,
            connectionSettings.options,
            (err: any, client: MongoClientType) => {

                if (!err) {
                    
                    log("Successfully connected to MongoDB")
                    Connection.db = client.db(connectionSettings.dbName);
                    resolve();
                }
                else {

                    reject(err);
                }
            });
    })
}
