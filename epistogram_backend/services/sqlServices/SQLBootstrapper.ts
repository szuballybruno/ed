
import { readFileSync } from "fs";
import { replaceAll } from "../../utilities/helpers";
import { GlobalConfiguration } from "../environment";
import { log } from "../misc/logger";
import { ExecSQLFunctionType, SQLConnectionService } from "./SQLConnectionService";

export type SchemaDefinitionType = {
    entities: Function[];
    viewScripts: string[];
    functionScripts: string[];
    constraints: SQLConstraintType[];
}

export type SQLConstraintType = {
    name: string;
    tableName: string;
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

        log("Recreating views...");
        await this.recreateViewsAsync(this._dbSchema.viewScripts);

        log("Recreating functions...");
        await this.recreateFunctionsAsync(this._dbSchema.functionScripts);

        log("Recreating constraints...");
        await this.recreateConstraintsAsync(this._dbSchema.constraints);
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

        try {

            const results = await executeSQL(dropDBScript);
        }
        finally {

            await terminateConnectionAsync();
        }
    }

    private recreateConstraintsAsync = async (constraints: SQLConstraintType[]) => {

        const { executeSQL, terminateConnectionAsync } = await this._sqlConnectionService.connectToDBAsync();

        try {

            // drop constraints
            const drops = constraints
                .map(constraint => `ALTER TABLE ${constraint.tableName} DROP CONSTRAINT IF EXISTS ${constraint.name};`);

            await executeSQL(drops.join("\n"));

            // create constraints 
            for (let index = 0; index < constraints.length; index++) {

                const constraint = constraints[index];
                const script = readFileSync(`./sql/constraints/${constraint.name}.sql`, 'utf8');

                log(`-- Creating constraint: [${constraint.tableName} <- ${constraint.name}]...`);
                await executeSQL(script);
            }
        }
        finally {

            await terminateConnectionAsync();
        }
    }

    private toSQLName = (name: string) => {

        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    private recreateFunctionsAsync = async (functionNames: string[]) => {

        const { executeSQL, terminateConnectionAsync } = await this._sqlConnectionService.connectToDBAsync();

        try {

            // drop functions 
            const drops = functionNames
                .map(functionName => `DROP FUNCTION IF EXISTS ${functionName};`);

            await executeSQL(drops.join("\n"));

            // create functions
            for (let index = 0; index < functionNames.length; index++) {

                const functionName = functionNames[index];
                const script = readFileSync(`./sql/functions/${functionName}.sql`, 'utf8');

                log(`-- Creating function: [${functionName}]...`);
                await executeSQL(script);
            }
        }
        finally {

            // terminate SQL connection
            await terminateConnectionAsync();
        }

    }

    private recreateViewsAsync = async (viewNames: string[]) => {

        const { executeSQL, terminateConnectionAsync: terminateConnection } = await this._sqlConnectionService.connectToDBAsync();

        try {

            await this.dropViews(viewNames, executeSQL);
            await this.createViews(viewNames, executeSQL);
        }
        finally {

            await terminateConnection();
        }
    }

    private replaceSymbols = (sql: string) => {

        const url = this._configuration.fileStorage.assetStoreUrl;
        return replaceAll(sql, "{CDN_BUCKET_URL}", url);
    }

    private createViews = async (viewNames: string[], execSql: ExecSQLFunctionType) => {

        for (let index = 0; index < viewNames.length; index++) {

            const viewName = viewNames[index];
            const script = this.getViewCreationScript(viewName);

            log(`-- Creating view: [${viewName}]...`);
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