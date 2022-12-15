import { initJsExtensions } from "@episto/x-core";
import { Scaffolder } from "./Scaffold";
import { SimpleSQLConnectionService } from "./SimpleSQLConnectionService";
import { XOrmConnectionService } from "./XORMConnectionService";

initJsExtensions();

process
    .on('uncaughtException', function (exception) {

        console.error(exception);
        throw exception; 
    });

(async () => {

    try {

        console.log('Running...');

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

        const connection = new XOrmConnectionService(sqlConnection);
        const scaffolder = new Scaffolder(connection);

        await scaffolder
            .scaffoldAsync('..//temp');
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