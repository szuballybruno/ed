import { Storage } from "@google-cloud/storage";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { staticProvider } from "../staticProvider";
import { logError } from "./misc/logger";

export const uploadFileToStorageAsync = (file: UploadedFile, path: string) => {

    const { data: buffer } = file;

    return uploadBufferToStorageAsync(buffer, path);
}

export const uploadBufferToStorageAsync = (buffer: Buffer, path: string) => new Promise<void>((resolve, reject) => {

    const bucket = getBucket();
    const blob = bucket.file(path.replace(/ /g, "_"));

    const blobStream = blob
        .createWriteStream({
            resumable: false
        });

    blobStream
        .on('finish', () => {

            resolve();
        })
        .on('error', (e) => {

            reject(e);
        })
        .end(buffer);
});

export const deleteStorageFileAsync = async (filePath: string) => {

    try {

        const bucket = getBucket();
        await bucket.file(filePath).delete();
    }
    catch (e) {

        logError(e);
    }
}

const getBucket = () => {

    const storage = new Storage({
        keyFilename: path.join(__dirname, "../epistogram_service_user_key.json")
    });

    return storage.bucket(staticProvider.globalConfig.fileStorage.bucketName);
}