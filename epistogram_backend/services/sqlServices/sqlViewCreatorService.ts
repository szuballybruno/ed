import { readFileSync } from "fs";
import { log } from "../misc/logger";
import { connectToDBAsync, ExecSQLFunctionType } from "./sqlConnection";

export const recreateViewsAsync = async (viewNames: string[]) => {

    log("Recreating views...");

    const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();

    await dropViews(viewNames, executeSQL);
    await createViews(viewNames, executeSQL);

    await terminateConnection();
}

const createViews = async (viewNames: string[], execSql: ExecSQLFunctionType) => {

    for (let index = 0; index < viewNames.length; index++) {

        const viewName = viewNames[index];
        const script = getViewCreationScript(viewName);

        log(`Creating view: [${viewName}]...`);
        await execSql(script);
    }
}

const dropViews = async (viewNames: string[], execSql: ExecSQLFunctionType) => {

    const drops = viewNames
        .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

    await execSql(drops.join("\n"));
}

const getViewCreationScript = (viewName: string) => {

    const sql = readFileSync(`./sql/views/${viewName}.sql`, 'utf8');
    return `CREATE VIEW ${viewName}\nAS\n${sql}`;
}