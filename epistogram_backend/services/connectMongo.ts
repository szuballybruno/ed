import {Db, MongoClient} from "mongodb";
import {config} from "../configuration/config";
// @ts-ignore
import tunnel from "tunnel-ssh"

const tunnelConfig = {
    username: "spenglermanfred",
    host: "80.77.112.163",
    privateKey: require('fs').readFileSync('/Users/spenc/Documents/putty_id_rsa.ppk'),
    agent: process.env.SSH_AUTH_SOCK,
    passphrase: "MrPeach243Cock*",
    dstPort: 27017,
}

class Connection {
    public static db: Db;
    public static url: string;
    public static options: object;

    static connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db)
        return tunnel(tunnelConfig, function (error: string, server: string) {
            if(error){
                console.log("SSH connection error: " + error);
            }
            console.log(JSON.stringify(server))
            MongoClient.connect(Connection.url, Connection.options, (err: any, client: { db: (databaseName: string) => any; }) => {
                console.log("Mongodb csatlakoztatva")
                Connection.db = client.db(config.database.dbName)
            })

        });
    }
}

Connection.url = `mongodb://localhost:27017/`
Connection.options = {
    bufferMaxEntries:   0,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

export {Connection}
