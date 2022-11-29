import { existsSync, readFileSync } from "fs";

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

export const AdvancedDotEnv = {
    loadDotEnvFile
}