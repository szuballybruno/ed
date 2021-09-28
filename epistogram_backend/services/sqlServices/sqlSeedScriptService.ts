import { readFileSync } from "fs";
import { staticProvider } from "../../staticProvider";
import { replaceAll } from "../../utilities/helpers";
import { connectToDBAsync } from "./sqlConnection";

export const executeSeedScriptAsync = async (seedScriptName: string) => {

    const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();
    const sql = readFileSync(`./sql/seed/${seedScriptName}.sql`, 'utf8');

    const replacedSQl = replaceSymbols(sql);

    await executeSQL(replacedSQl);

    await terminateConnection();
}

const replaceSymbols = (sql: string) => {

    const url = staticProvider.globalConfig.fileStorage.assetStoreUrl;
    return replaceAll(sql, "{CDN_BUCKET_URL}", url);
}