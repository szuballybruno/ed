import { Storage } from '@google-cloud/storage';
import { UploadedFile } from 'express-fileupload';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { logError } from './misc/logger';

export class StorageService {

    private _config: GlobalConfiguration;

    constructor(config: GlobalConfiguration) {

        this._config = config;
    }

    uploadFileToStorageAsync = (file: UploadedFile, path: string) => {

        const { data: buffer } = file;

        return this.uploadBufferToStorageAsync(buffer, path);
    };

    uploadBufferToStorageAsync = (buffer: Buffer, path: string) => new Promise<void>((resolve, reject) => {

        const bucket = this.getBucket();
        const blob = bucket.file(path.replace(/ /g, '_'));

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

    deleteStorageFileAsync = async (filePath: string) => {

        try {

            const bucket = this.getBucket();
            await bucket
                .file(filePath)
                .delete();
        }
        catch (e) {

            logError(e);
        }
    };

    getBucket = () => {

        const credentials = this._config
            .security
            .gcpStorageAuthCredentials;

        const storage = new Storage({
            credentials: credentials,
            projectId: credentials.project_id
        });

        return storage
            .bucket(this._config.fileStorage.bucketName);
    };
}