import { TypeORMConnection } from "./database";
import { GlobalConfiguration } from "./services/environment";
import { SQLConnectionType } from "./services/sqlServices/sqlConnection";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as TypeORMConnection,
    sqlConnection: {} as SQLConnectionType
}