import { Db, MongoClient } from "mongodb";
// @ts-ignore
import tunnel from "tunnel-ssh"
import { globalConfig } from "../server";
import { log } from "./logger";

export class Connection {
    public static db: Db;
}

export const connectToMongoDB = (): Promise<void> => {

    log("Connecting to MongoDB...");

    const dbConfig = globalConfig.mongodbConfig;

    return new Promise((resolve, reject) => {

        const connectToDB = () => {

            const connectionSettings = {
                url: dbConfig.connectionUrl,
                options: dbConfig.options,
                dbName: globalConfig.mongodbConfig.mongoDBCredentials.dbName
            }

            log("Trying to connect to: " + connectionSettings.url);

            MongoClient.connect(
                connectionSettings.url,
                connectionSettings.options,
                (err: any, client: { db: (databaseName: string) => any; }) => {

                    log("Successfully connected to MongoDB")
                    const db = client.db(connectionSettings.dbName);

                    // promise resolved
                    Connection.db = db;
                    resolve();
                });
        };

        // CONNECT TO MONGO DB TROUGH SSH
        if (dbConfig.isSSHConnection) {

            log("Connecting SSH Tunnel...");
            log(dbConfig.vpsSSHAuthConfig);
            const tunnelInstance = tunnel(dbConfig.vpsSSHAuthConfig, (error: string, server: string) => {

                // SSH failed
                if (error) {
                    log("SSH connection error: " + error);
                }

                // connected trough SSH
                else {

                    log("SSH connection succeeded!");
                    log(JSON.stringify(server));

                    connectToDB();
                }
            });
            console.log("Ez a tunnelInstance" + JSON.stringify(tunnelInstance))
        }

        // CONNECT TO MONGO DB
        else {

            connectToDB();
        }
    })
}
