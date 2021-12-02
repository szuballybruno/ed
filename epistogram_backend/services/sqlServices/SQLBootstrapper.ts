
import { readFileSync } from "fs";
import { replaceAll } from "../../utilities/helpers";
import { GlobalConfiguration } from "../environment";
import { log } from "../misc/logger";
import { ExecSQLFunctionType, SQLConnectionService } from "./SQLConnectionService";

export type SchemaDefinitionType = {
    entities: Function[],
    viewScripts: string[],
    functionScripts: string[],
}

export class SQLBootstrapperService {

    private _sqlConnectionService: SQLConnectionService;
    private _dbSchema: SchemaDefinitionType;
    private _configuration: GlobalConfiguration;

    constructor(sqlco: SQLConnectionService, schema: SchemaDefinitionType, configuration: GlobalConfiguration) {

        this._sqlConnectionService = sqlco;
        this._dbSchema = schema;
        this._configuration = configuration;
    }

    bootstrapDatabase = async () => {

        await this.recreateViewsAsync(this._dbSchema.viewScripts);
        await this.recreateFunctionsAsync(this._dbSchema.functionScripts);
    }

    executeSeedScriptAsync = async (seedScriptName: string) => {

        const { executeSQL, terminateConnectionAsync: terminateConnection } = await this._sqlConnectionService.connectToDBAsync();
        const sql = readFileSync(`./sql/seed/${seedScriptName}.sql`, 'utf8');

        const replacedSQl = this.replaceSymbols(sql);

        await executeSQL(replacedSQl);

        await terminateConnection();
    }

    purgeDBAsync = async () => {

        log("Purging DB...", "strong");

        const dropDBScript = this._dbSchema
            .entities
            .map(x => `DROP TABLE IF EXISTS public.${this.toSQLName(x.name)} CASCADE;`)
            .join("\n");

        // const dropDBScriptPath = `./sql/misc/dropDB.sql`;
        // writeFileSync(dropDBScriptPath, dropDBScript, { encoding: "utf-8" });

        const { executeSQL, terminateConnectionAsync } = await this._sqlConnectionService.connectToDBAsync();

        const results = await executeSQL(dropDBScript);

        await terminateConnectionAsync();
    }

    private toSQLName = (name: string) => {

        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    private recreateFunctionsAsync = async (functionNames: string[]) => {

        log("Recreating functions...");

        const { executeSQL, terminateConnectionAsync: terminateConnection } = await this._sqlConnectionService.connectToDBAsync();

        // drop functions 
        const drops = functionNames
            .map(functionName => `DROP FUNCTION IF EXISTS ${functionName};`);

        await executeSQL(drops.join("\n"));

        // create functions
        for (let index = 0; index < functionNames.length; index++) {

            const functionName = functionNames[index];
            const script = readFileSync(`./sql/functions/${functionName}.sql`, 'utf8');

            log(`Creating function: [${functionName}]...`);
            await executeSQL(script);
        }

        // terminate SQL connection
        await terminateConnection();
    }

    private recreateViewsAsync = async (viewNames: string[]) => {

        log("Recreating views...");

        const { executeSQL, terminateConnectionAsync: terminateConnection } = await this._sqlConnectionService.connectToDBAsync();

        await this.dropViews(viewNames, executeSQL);
        await this.createViews(viewNames, executeSQL);

        await terminateConnection();
    }

    private replaceSymbols = (sql: string) => {

        const url = this._configuration.fileStorage.assetStoreUrl;
        return replaceAll(sql, "{CDN_BUCKET_URL}", url);
    }

    private createViews = async (viewNames: string[], execSql: ExecSQLFunctionType) => {

        for (let index = 0; index < viewNames.length; index++) {

            const viewName = viewNames[index];
            const script = this.getViewCreationScript(viewName);

            log(`Creating view: [${viewName}]...`);
            await execSql(script);
        }
    }

    private dropViews = async (viewNames: string[], execSql: ExecSQLFunctionType) => {

        const drops = viewNames
            .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

        await execSql(drops.join("\n"));
    }

    private getViewCreationScript = (viewName: string) => {

        const sql = readFileSync(`./sql/views/${viewName}.sql`, 'utf8');
        return `CREATE VIEW ${viewName}\nAS\n${sql}`;
    }
}