import { readFileSync } from "fs";
import { staticProvider } from "../staticProvider";
import { log } from "./misc/logger";

export const createSQLViewAsync = async (viewName: string) => {

    log("");
    log(`Creating SQL View (${viewName})...`);

    // Read view script 
    const sql = readFileSync(`./models/entity/view_sql_scripts/${viewName}.sql`, 'utf8');

    // execute view script 
    await staticProvider
        .ormConnection
        .manager
        .query(sql);
}