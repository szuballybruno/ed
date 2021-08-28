import { TypeORMConnection } from "./database";
import { GlobalConfiguration } from "./services/environment";

export const staticProvider = {

    globalConfig: {} as GlobalConfiguration,
    ormConnection: {} as TypeORMConnection
}