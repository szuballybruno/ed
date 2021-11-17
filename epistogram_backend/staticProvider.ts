import { TypeORMConnection } from "./database";
import { GlobalConfiguration } from "./services/environment";
import { MapperService } from "./services/mapperService";
import { SQLConnectionType } from "./services/sqlServices/sqlConnection";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as TypeORMConnection,
    sqlConnection: {} as SQLConnectionType,
    mapperService: {} as MapperService,
    rootDirectory: __dirname,
}