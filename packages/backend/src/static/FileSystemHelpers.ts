import * as fs from 'fs';

const checkFileExists = (path: string) => {

    try {
        if (fs.existsSync(path)) {

            return true;
        }
    } catch (err) {

        return false;
    }
};

export const FileSystemHelpers = {
    checkFileExists
};