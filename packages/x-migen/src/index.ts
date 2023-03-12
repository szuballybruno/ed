import { initJsExtensions } from "@episto/x-core";
import { ensureDirSync } from "fs-extra";
import * as url from 'url';
import { MigrationScriptGenerator } from "./MigrationScriptGenerator";
import { PgService } from "./PgService";
import { Polyfills, writeFileSync } from "./polyfills";

process
    .on('uncaughtException', (err) => {

        console.error('---- FATAL ERROR -----');
        throw err;
    });

(async () => {


    initJsExtensions();

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const projectRoot = `${__dirname}/..`;

    console.log(process.argv);

    const getArgValue = <TType extends 'int' | 'string' = 'string'>(name: string, type?: TType): TType extends 'int' ? number : string => {

        const fullname = `--${name}=`;
        const argString = process
            .argv
            .firstOrNull(x => x.startsWith(fullname))

        if (!argString)
            throw new Error(`Arg not found by name "${name}"!`);

        const value = argString
            .replace(fullname, '');

        if (type === 'int')
            return Polyfills.saveParseInt(value) as any;

        return value as any;
    }

    const args = {
        dbname: getArgValue('dbname'),
        dbhost: getArgValue('dbhost'),
        dbusername: getArgValue('dbusername'),
        dbport: getArgValue('dbport', 'int'),
        dbpassword: getArgValue('dbpassword'),
        outFolderPath: getArgValue('outFolderPath'),
        schemaFolderPath: getArgValue('schemaFolderPath'),
        isScriptOnlyMode: (() => {
            const mode = getArgValue('mode');
            if (mode !== 'SCRIPT_ONLY' && mode !== 'EXECUTE')
                throw new Error(`Mode is invalid: "${mode}"!`);
            return mode === 'SCRIPT_ONLY';
        })(),
    }

    const flushScript = (script: string) => {

        const outFolderPath = `${projectRoot}/out`;
        ensureDirSync(outFolderPath);
        const outFilePath = `${outFolderPath}/migration-script.sql`
        console.log(`Writing file... ${outFilePath}`);
        writeFileSync(outFilePath, script);
    };

    const pgService = new PgService({
        database: args.dbname,
        host: args.dbhost,
        password: args.dbpassword,
        port: args.dbport,
        user: args.dbusername
    });

    /**
     * Create script 
     */
    console.log(`Creating script...`);
    const script = await new MigrationScriptGenerator(
        projectRoot,
        console.log,
        pgService,
        args.schemaFolderPath)
        .createScriptAsync();

    flushScript(script);

    /**
     * Exec script if not script only mode
     */
    if (!args.isScriptOnlyMode) {

        console.log(`Running script...`);
        await pgService
            .queryAsync(script);
    }

    console.log('Success! Exiting....');
    process.exit(0);
})();
