import fs from 'fs';

export class FileSystemService {

    constructor() {

    }

    /**
     * Returns the file paths of the files in a specified folder 
     */
    getAllFilePaths(directoryPath: string) {

        return fs.readdirSync(directoryPath);
    }

    /**
     * Read file as utf-8 text
     */
    readFileAsText(filePath: string) {

        return fs.readFileSync(filePath, 'utf-8');
    }

    /**
     * Returns if a file exists or not 
     * @param filePath Full file path with extension 
     */
    exists(filePath: string) {

        return fs.existsSync(filePath);
    }

    /**
     * Creates a new folder in the file system
     * @param folderPath Full folder path
     */
    createFolder(folderPath: string) {

        fs.mkdirSync(folderPath);
    }

    /**
     * Writes buffer data to a file
     * @param filePath Full file path with extension
     * @param data data buffer
     */
    writeFile(filePath: string, data: Buffer) {

        fs.writeFileSync(filePath, data);
    }

    /**
     * Appends buffer data to a file 
     * @param filePath Full file path with extension
     * @param data data buffer
     */
    appendFile(filePath: string, data: Buffer) {

        fs.appendFileSync(filePath, data);
    }

    /**
     * Reads buffer data from file
     * @param filePath Full file path with extension
     */
    readFileAsBuffer(filePath: string) {

        return fs.readFileSync(filePath);
    }

    /**
     * Delete a file
     * @param filePath Full file path with extension
     */
    deleteFile(filePath: string) {

        if (!this.exists(filePath))
            throw new Error(`File "${filePath}" doesn't exist!`);

        fs.rmSync(filePath);
    }

    /**
     * Delete a file if file exists
     * @param filePath Full file path with extension
     */
    deleteFileIfExists(filePath: string) {

        if (!this.exists(filePath))
            return;

        this.deleteFile(filePath);
    }
}