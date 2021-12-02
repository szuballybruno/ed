import { CoinAcquireService } from "./services/coinAcquireService";
import { GlobalConfiguration } from "./services/environment";
import { MapperService } from "./services/mapperService";
import { DbConnectionService, SQLConnectionType } from "./services/sqlServices/DatabaseConnectionService";
import { ORMConnection } from "./services/sqlServices/ORMConnectionService";
import { SQLBootstrapperService } from "./services/sqlServices/SQLBootstrapper";
import { SQLFunctionsService } from "./services/sqlServices/SQLFunctionsService";
import { UserSessionActivityService } from "./services/userSessionActivityService";
import { UserStatsService } from "./services/userStatsService";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as ORMConnection,
    sqlConnection: {} as SQLConnectionType,
    mapperService: {} as MapperService,
    services: {} as {
        mapperService: MapperService,
        databaseConnectionService: DbConnectionService,
        userStatsService: UserStatsService,
        sqlFunctionService: SQLFunctionsService,
        userSessionActivityService: UserSessionActivityService,
        coinAcquireService: CoinAcquireService,
        sqlBootstrapperService: SQLBootstrapperService
    },
    rootDirectory: __dirname,
}