import { readFileSync } from "fs";
import { log } from "../misc/logger";
import { connectToDBAsync } from "./sqlConnection";

export const recreateFunctionsAsync = async (functionNames: string[]) => {

    log("Recreating functions...");

    const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();

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