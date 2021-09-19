import { readFileSync, stat } from "fs";
import { staticProvider } from "../staticProvider";
import { log } from "./misc/logger";

export const recreateViewsAsync = async (viewNames: string[]) => {

    log("Recreating views...");

    await dropViews(viewNames);
    await createViews(viewNames);
}

export const executeSeedScriptAsync = async (seedScriptName: string) => {

    const sql = readFileSync(`./sql/seed/${seedScriptName}.sql`, 'utf8');

    const replacedSQl = replaceSymbols(sql);

    await staticProvider
        .ormConnection
        .manager
        .query(replacedSQl);
}

const replaceSymbols = (sql: string) => {

    sql = sql.replace("{CDN_BUCKET_URL}", staticProvider.globalConfig.fileStorage.assetStoreUrl);

    return sql;
}

const createViews = async (viewNames: string[]) => {

    for (let index = 0; index < viewNames.length; index++) {

        const viewName = viewNames[index];
        const script = getViewCreationScript(viewName);

        log(`Creating view: [${viewName}]...`);
        await staticProvider
            .ormConnection
            .manager
            .query(script);
    }
}

const dropViews = async (viewNames: string[]) => {

    const drops = viewNames
        .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

    await staticProvider
        .ormConnection
        .manager
        .query(drops.join("\n"));
}

const getViewCreationScript = (viewName: string) => {

    const sql = readFileSync(`./sql/views/${viewName}.sql`, 'utf8');
    return `CREATE VIEW ${viewName}\nAS\n${sql}`;
}