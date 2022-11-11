import * as fs from 'fs';
import * as path from 'path';

/**
 * Replace all 
 */
export const replaceAll = (str: string, find: string, replace: string) => {

    // return str.replace(new RegExp(find, 'g'), replace);
    const pieces = str.split(find);
    return pieces.join(replace);
}

/**
 * Removes all files in a specific folder 
 */
export const removeAllFilesInFolder = (directoryPath: string) => {

    const files = fs.readdirSync(directoryPath);

    for (const file of files) {

        fs.unlinkSync(path.join(directoryPath, file));
    }
}

/**
 * Write file 
 */
export const writeFile = (path: string, cont: string) => {

    fs.writeFileSync(path, cont, 'utf-8');
}