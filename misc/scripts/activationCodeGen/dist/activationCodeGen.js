"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_password_1 = require("generate-password");
const count = 100;
const idStart = 800;
const codeCommandPairArray = [];
const prefix = "EPI";
const genCode = () => `${prefix}-${(0, generate_password_1.generate)({ numbers: true, length: 6 }).toUpperCase()}`;
for (let index = 0; index < count; index++) {
    const id = idStart + index;
    const code = genCode();
    codeCommandPairArray
        .push({
        command: `INSERT INTO public.activation_code (id, code, organization_id, is_used) VALUES (${id}, '${code}', 2, false);`,
        code
    });
}
(0, fs_1.writeFileSync)(__dirname + "/../out/script.sql", codeCommandPairArray.map(x => x.command).join("\n"), 'utf8');
(0, fs_1.writeFileSync)(__dirname + "/../out/codes.txt", codeCommandPairArray.map(x => x.code).join("\n"), 'utf8');
