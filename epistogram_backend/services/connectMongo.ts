import {Db, MongoClient} from "mongodb";
// @ts-ignore
import tunnel from "tunnel-ssh"
import { mongoDBCredentials, MongoConfig } from "./environment";
import { log } from "./logger";

// class Connection {
//     public static db: Db;

//     static connectToMongo(mongoConfig: MongoConfig) {
        
//         if ( this.db )
//             return Promise.resolve(this.db)
        
//         const tunnelInstance = tunnel(mongoConfig.vpsSSHAuthConfig, (error: string, server: string) => {
            
//             if(error){
//                 log("SSH connection error: " + error);
//             }
            
//             log(JSON.stringify(server))
            
//             MongoClient.connect(
//                 mongoConfig.connectionUrl, 
//                 mongoConfig.options, 
//                 (err: any, client: { db: (databaseName: string) => any; }) => {
                    
//                     log("Mongodb csatlakoztatva")
//                     Connection.db = client.db(config.database.dbName)
//                 });
//         });
//     }
// }

export class Connection {
    public static db: Db;
}

export const connectToMongoDB = (dbConfig: MongoConfig) : Promise<void> => {
   
   log("Connecting to MongoDB...");
   
    return new Promise((resolve, reject) => {

        const connectToDB = () => {
        
            MongoClient.connect(
                dbConfig.connectionUrl, 
                dbConfig.options, 
                (err: any, client: { db: (databaseName: string) => any; }) => {
                    
                    log("Mongodb csatlakoztatva")
                    const db = client.db(mongoDBCredentials.dbName);
    
                    // promise resolved
                    Connection.db = db;
                    resolve();
                });
        };

        // CONNECT TO MONGO DB TROUGH SSH
        if(dbConfig.isSSHConnection){
            
            const tunnelInstance = tunnel(dbConfig.vpsSSHAuthConfig, (error: string, server: string) => {
                
                // SSH failed
                if(error){
                    
                    log("SSH connection error: " + error);
                }
    
                // connected trough SSH
                else{
    
                    log("SSH connection succeeded!");
                    log(JSON.stringify(server));
                    
                    connectToDB();
                }
            });
        }

        // CONNECT TO MONGO DB
        else{

            connectToDB();
        }
    })
}
