import { existsSync, readFileSync } from "fs";

/**
 * Loads the .env file into the process.env variable
 */
const loadDotEnvFile = (filePath: string) => {

    if (!existsSync(filePath))
        throw new Error(`Dot env file does not exis: "${filePath}"!`);

    const contents = readFileSync(filePath, 'utf-8');
    const lines = contents
        .split('\n')
        .filter(x => x.includes('='))
        .map(x => x
            .replace('\r', '')
            .trimStart()
            .trimEnd());

    const touples = lines
        .map(x => x.split('='))
        .map(([key, value]) => ({
            key: key
                .trimStart()
                .trimEnd(),
            value: value
                .trimStart()
                .trimEnd()
        }));

    touples
        .forEach(x => process.env[x.key] = x.value);
}

/**
 * Encapsulation of .env file loading & parsing  
 */
export class XEnv {

    static getEnvConfigEntry(entryName: string): string;
    static getEnvConfigEntry(entryName: string, type: 'bool'): boolean;
    static getEnvConfigEntry(entryName: string, type: 'int'): number;
    static getEnvConfigEntry(entryName: string, type?: 'string' | 'bool' | 'int'): string | boolean | number {

        const fullEntryName = entryName;
        const value = process.env[fullEntryName];

        if (value === '' || value === undefined || value === null)
            throw new Error(`Unable to load .env variable '${fullEntryName}' in env '${XEnv.getEnvName()}'!`);

        /**
         * bool
         */
        if (type === 'bool') {

            if (!(value === 'false' || value === 'true'))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a boolean.`);

            return value === 'true';
        }

        /**
         * int
         */
        if (type === 'int') {

            const asInt = parseInt(value);

            if (Number.isNaN(asInt))
                throw new Error(`Unable to load .env variable ${fullEntryName}. It's not formatted as a int.`);

            return asInt;
        }

        /**
         * string
         */
        return value;
    }

    static loadEnv(rootDirectory: string, envName: string) {

        // load default 
        loadDotEnvFile(`${rootDirectory}/../config/default.config.env`);

        // overwrite with env specific
        loadDotEnvFile(`${rootDirectory}/../config/${envName}.config.env`);
    }

    static getEnvName() {

        return process.env.ENV_NAME ?? 'local';
    }
}