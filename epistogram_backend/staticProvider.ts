import { TypeORMConnection } from "./database";
import { DbConnectionService } from "./services/databaseConnectionService";
import { GlobalConfiguration } from "./services/environment";
import { MapperService } from "./services/mapperService";
import { SQLConnectionType } from "./services/sqlServices/sqlConnection";
import { SQLFunctionsService } from "./services/sqlServices/sqlFunctionsService";
import { UserSessionActivityService } from "./services/userSessionActivityService";
import { UserStatsService } from "./services/userStatsService";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as TypeORMConnection,
    sqlConnection: {} as SQLConnectionType,
    mapperService: {} as MapperService,
    services: {} as {
        mapperService: MapperService,
        databaseConnectionService: DbConnectionService,
        userStatsService: UserStatsService,
        sqlFunctionService: SQLFunctionsService,
        userSessionActivityService: UserSessionActivityService
    },
    rootDirectory: __dirname,
}