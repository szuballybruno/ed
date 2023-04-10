import { initJsExtensions } from "@episto/x-core";
import { Scaffolder } from "./Scaffold";
import { SimpleSQLConnectionService } from "./SimpleSQLConnectionService";
import { LiveSchemaProvider } from "./LiveSchemaProvider";
import { existsSync, readFileSync } from "fs";

initJsExtensions();

process
    .on('uncaughtException', function (exception) {

        console.error(exception);
        throw exception;
    });

(async () => {

    try {

        console.log('Running...');

        const parseArgOrNull = (name: string) => {

            const arg = process.argv.firstOrNull(x => x.startsWith(`--${name}=`));
            if (!arg)
                return null;

            return arg.split('=')[1];
        }

        const parseArg = (name: string) => {

            const arg = process.argv.firstOrNull(x => x.startsWith(`--${name}=`));
            if (!arg)
                throw new Error(`Arg not found by name: ${name}`);

            return arg.split('=')[1];
        }

        const sqlConnection = new SimpleSQLConnectionService({
            host: parseArg('dbhost'),
            database: parseArg('dbname'),
            password: parseArg('dbpassword'),
            user: parseArg('dbuser'),
            port: parseInt(parseArg('dbport')),
        });

        const connection = new LiveSchemaProvider(sqlConnection);

        const typemapFilePath = parseArgOrNull('typemapPath');
        if (typemapFilePath && !existsSync(typemapFilePath))
            throw new Error(`Typemap file not found at path specified: ${typemapFilePath}`);

        const typemap = typemapFilePath
            ? JSON.parse(readFileSync(typemapFilePath, 'utf-8'))
            : {};

        const scaffolder = new Scaffolder(connection, typemap);

        await scaffolder
            .scaffoldAsync(parseArg('modelsFolder'));
    }
    catch (e) {

        console.log(e);
    }

})()
    .then(x => console.log('Done'))
    .catch(x => {

        console.log(x);
        throw x;
    });