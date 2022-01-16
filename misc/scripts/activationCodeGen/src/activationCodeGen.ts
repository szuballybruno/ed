import { readFileSync, writeFileSync } from "fs";
import { generate } from "generate-password";

const count = 100;
const idStart = 900;
const codeCommandPairArray = [] as { code: string, command: string }[];
const prefix = "DEBUG";

const genCode = () => `${prefix}-${generate({ numbers: true, length: 6 }).toUpperCase()}`;

for (let index = 0; index < count; index++) {

    const id = idStart + index;
    const code = genCode();

    codeCommandPairArray
        .push({
            command: `INSERT INTO public.activation_code (id, code, organization_id, is_used) VALUES (${id}, '${code}', 2, false);`,
            code
        });
}

writeFileSync(__dirname + "/../out/script.sql", codeCommandPairArray.map(x => x.command).join("\n"), 'utf8');
writeFileSync(__dirname + "/../out/codes.txt", codeCommandPairArray.map(x => x.code).join("\n"), 'utf8');