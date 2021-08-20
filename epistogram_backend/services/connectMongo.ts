import { Db, MongoClient } from "mongodb";
import { globalConfig } from "../server";
import { log } from "./logger";

export class Connection {
    public static db: Db;
}

type MongoClientType = { db: (databaseName: string) => any; };

export const connectToMongoDB = (): Promise<void> => {

    log("Connecting to MongoDB...");

    return new Promise((resolve, reject) => {

        const dbName = globalConfig.mongo.dbName;
        const connectionUrl = globalConfig.mongo.connectionUrl;

        const options = {
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const callback = (err: any, client: MongoClientType) => {

            if (!err) {

                log("Successfully connected to MongoDB")
                Connection.db = client.db(dbName);
                resolve();
            }
            else {

                reject(err);
            }
        }

        log("Trying to connect to: " + connectionUrl);
        MongoClient.connect(connectionUrl, options, callback);
    })
}
