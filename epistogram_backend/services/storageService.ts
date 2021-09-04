import { Storage } from "@google-cloud/storage";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { staticProvider } from "../staticProvider";

const bucketName = "epistogram_bucket_dev";

export const uploadToStorageAsync = (file: UploadedFile, path: string) => new Promise<void>((resolve, reject) => {

    const bucket = getBucket();
    const { data: buffer } = file;
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
})

export const deleteStorageFileAsync = async (filePath: string) => {

    const bucket = getBucket();
    await bucket.file(filePath).delete();
}

const getBucket = () => {

    const storage = new Storage({
        keyFilename: path.join(__dirname, "../epistogram_service_user_key.json")
    });

    return storage.bucket(bucketName);
}