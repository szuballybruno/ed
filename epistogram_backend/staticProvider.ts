import { CoinAcquireService } from "./services/coinAcquireService";
import { DbConnectionService } from "./services/sqlServices/DatabaseConnectionService";
import { GlobalConfiguration } from "./services/environment";
import { MapperService } from "./services/mapperService";
import { SQLFunctionsService } from "./services/sqlServices/SQLFunctionsService";
import { UserSessionActivityService } from "./services/userSessionActivityService";
import { UserStatsService } from "./services/userStatsService";
import { SQLBootstrapperService } from "./services/sqlServices/SQLBootstrapper";

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
        userSessionActivityService: UserSessionActivityService,
        coinAcquireService: CoinAcquireService,
        sqlBootstrapperService: SQLBootstrapperService
    },
    rootDirectory: __dirname,
}