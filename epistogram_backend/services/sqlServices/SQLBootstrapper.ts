
import { readFileSync } from "fs";
import { replaceAll } from "../../utilities/helpers";
import { GlobalConfiguration } from "../misc/GlobalConfiguration";
import { log, logObject } from "../misc/logger";
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

    recalcSequencesAsync = async () => {

        log("Recalculating sequance max values...");

        const dbName = this._configuration.database.name;

        const script = `
            DO $$
                DECLARE
                i TEXT;
                BEGIN
                FOR i IN (SELECT tbls.table_name 
                    FROM information_schema.tables AS tbls 
                    INNER JOIN information_schema.columns AS cols 
                    ON tbls.table_name = cols.table_name 
                    WHERE tbls.table_catalog='${dbName}' 
                        AND tbls.table_schema='public' 
                        AND cols.column_name='id'
                        AND tbls.table_type = 'BASE TABLE') 
                    LOOP
                    
                    EXECUTE 'SELECT setval(''"' || i || '_id_seq"'', (SELECT MAX(id) FROM ' || quote_ident(i) || '));';
                END LOOP;
            END $$;
        `;

        await this._sqlConnectionService.executeSQLAsync(script);

        log("-- Recalculating sequance max values done.");
    }

    executeSeedScriptAsync = async (seedScriptName: string) => {

        log(`Seeding ${seedScriptName}...`);

        const sql = readFileSync(`./sql/seed/${seedScriptName}.sql`, 'utf8');

        const replacedSQl = this.replaceSymbols(sql);

        await this._sqlConnectionService.executeSQLAsync(replacedSQl);
    }

    purgeDBAsync = async () => {

        log("Purging DB...", "strong");

        const dropDBScript = this._dbSchema
            .entities
            .map(x => `DROP TABLE IF EXISTS public.${this.toSQLName(x.name)} CASCADE;`)
            .join("\n");

        // const dropDBScriptPath = `./sql/misc/dropDB.sql`;
        // writeFileSync(dropDBScriptPath, dropDBScript, { encoding: "utf-8" });

        logObject(dropDBScript);

        const results = await this._sqlConnectionService.executeSQLAsync(dropDBScript);
    }

    private recreateConstraintsAsync = async (constraints: SQLConstraintType[]) => {

        // drop constraints
        const drops = constraints
            .map(constraint => `ALTER TABLE ${constraint.tableName} DROP CONSTRAINT IF EXISTS ${constraint.name};`);

        await this._sqlConnectionService.executeSQLAsync(drops.join("\n"));

        // create constraints 
        for (let index = 0; index < constraints.length; index++) {

            const constraint = constraints[index];
            const script = readFileSync(`./sql/constraints/${constraint.name}.sql`, 'utf8');

            log(`-- Creating constraint: [${constraint.tableName} <- ${constraint.name}]...`);
            await this._sqlConnectionService.executeSQLAsync(script);
        }
    }

    private toSQLName = (name: string) => {

        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    private recreateFunctionsAsync = async (functionNames: string[]) => {

        // drop functions 
        const drops = functionNames
            .map(functionName => `DROP FUNCTION IF EXISTS ${functionName};`);

        await this._sqlConnectionService.executeSQLAsync(drops.join("\n"));

        // create functions
        for (let index = 0; index < functionNames.length; index++) {

            const functionName = functionNames[index];
            const script = readFileSync(`./sql/functions/${functionName}.sql`, 'utf8');

            log(`-- Creating function: [${functionName}]...`);
            await this._sqlConnectionService.executeSQLAsync(script);
        }
    }

    private recreateViewsAsync = async (viewNames: string[]) => {

        await this.dropViews(viewNames);
        await this.createViews(viewNames);
    }

    private replaceSymbols = (sql: string) => {

        const url = this._configuration.fileStorage.assetStoreUrl;
        return replaceAll(sql, "{CDN_BUCKET_URL}", url);
    }

    private createViews = async (viewNames: string[]) => {

        for (let index = 0; index < viewNames.length; index++) {

            const viewName = viewNames[index];
            const script = this.getViewCreationScript(viewName);

            log(`-- Creating view: [${viewName}]...`);
            await this._sqlConnectionService.executeSQLAsync(script);
        }
    }

    private dropViews = async (viewNames: string[]) => {

        const drops = viewNames
            .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

        await this._sqlConnectionService.executeSQLAsync(drops.join("\n"));
    }

    private getViewCreationScript = (viewName: string) => {

        const sql = readFileSync(`./sql/views/${viewName}.sql`, 'utf8');
        return `CREATE VIEW ${viewName}\nAS\n${sql}`;
    }
}