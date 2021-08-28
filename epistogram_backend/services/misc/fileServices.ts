import fs from "fs"
import { UploadedFile } from "express-fileupload";
import { log } from "./logger";
import { Config, NodeSSH } from "node-ssh";
import { staticProvider } from "../../staticProvider";

export const getFileExtension = (fileName: string) => {

    log("FileName: " + fileName)
    return (fileName.substr(fileName.lastIndexOf('.') + 1))
}

const makeDirAsync = async (folderPath: string) => {
    return new Promise<void>((resolve, reject) => {

        fs.mkdir(folderPath, { recursive: true }, (error) => {

            if (!error) {

                resolve();
            }
            else {

                reject(error);
            }
        });
    })
}

const deleteDirOrFileAsync = async (filePath: string) => {
    return new Promise((resolve, reject) => {

        fs.rm(filePath, resolve);
    });
}

export const createFile = async (file: UploadedFile, localpath: string, fileName: string) => {

    const lowercaseFileName = file.name.toLowerCase();
    const tempFolderPath = "./temp/";
    const tempFilePath = tempFolderPath + lowercaseFileName;
    const fileNameWithExtension = fileName + "." + getFileExtension(lowercaseFileName);

    // create folder if does not exist
    if (!fs.existsSync(tempFolderPath))
        await makeDirAsync(tempFolderPath);

    // move to temp
    await file.mv(tempFilePath);

    // setup scp
    const sshClient = new NodeSSH();

    await sshClient.connect({
        host: staticProvider.globalConfig.vps.host,
        port: parseInt(staticProvider.globalConfig.vps.scpPort),
        username: staticProvider.globalConfig.vps.username,
        passphrase: staticProvider.globalConfig.vps.passphrase,
        privateKey: staticProvider.globalConfig.vps.privateKey
    });

    // PUT FILE 
    log(`Uploading file from: '${tempFilePath}'...`)
    const uploadFilePath = localpath + "/" + fileNameWithExtension;
    await sshClient.putFile(tempFilePath, uploadFilePath);

    // DELETE TEMP FILE
    await deleteDirOrFileAsync(tempFilePath);

    console.log("File feltöltve")
}

export const searchImages = async (path: string) => {
    return fs.readdirSync(path);
}


