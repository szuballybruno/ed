import * as fs from 'fs';

export const writeFileSync = (filePath: string, data: string) => fs.writeFileSync(filePath, data);

export const getRootRelativePath = (path: string) => `../../../epistogram_backend${path}`;

export const logScoped = (scope: string, text: string) => console.log(`[${scope}] ${text}`);

export const getAllFilePaths = (directoryPath: string) => {

    return fs.readdirSync(directoryPath);
}

export const regexMatchAll = (text: string, regex: RegExp): string[] => {

    const matches = text.match(regex) ?? [] as string[];

    return matches.map(x => '' + x);
};

export const readFileSync = (path: string) => fs.readFileSync(path, 'utf-8');

export const existsSync = (path: string) => fs.existsSync(path);

export const readFileAsText = (path: string) => fs.readFileSync(path, 'utf-8');

const parseIntOrFail = (text: string, name?: string) => {

    const parsed = parseInt(text);

    if (Number.isNaN(parsed))
        throw new Error(`Parsing int param "${name ?? '-'}" failed.`);

    return parsed;
};

const getFileName = (path: string): string => {

    var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop();
    }

    return splitTest(path);
};

export const Polyfills = {
    readFileAsText,
    getAllFilePaths,
    parseIntOrFail,
    getFileName
};