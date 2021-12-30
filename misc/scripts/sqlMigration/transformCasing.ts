import { readFileSync, writeFileSync } from "fs";

const toSQLSnakeCasing = (name: string) => {

    return name.split(/(?=[A-Z])/).join('_').toLowerCase();
}

console.log("----- START");

const inFilePath = `C:\\Users\\EpistoLEN15_001\\sql_migration\\prod_data.sql`;
const outFilePath = `C:\\Users\\EpistoLEN15_001\\sql_migration\\prod_data_gen.sql`;
const fileText = readFileSync(inFilePath, "utf-8");

const regex = "\".*\"";

const reg = /\".*?\"/g;

const newStr = fileText
    .replace(reg, (match: string) => {

        const newasd = toSQLSnakeCasing(match.substring(1, match.length - 1));
        return newasd;
    });

writeFileSync(outFilePath, newStr, { encoding: "utf8" });

console.log("---- END");