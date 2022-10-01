import { Environment } from '../../static/Environemnt';
import { Logger } from '../../static/Logger';
import { postMultipartAsync } from './httpClient';

export type FileUploadCallbackParams = { currentChunkIndex: number, chunkCount: number };

const mbToByte = 1000000;
const maxChunkSizeBytes = 10 * mbToByte; // 10 mb

export const uploadeFileChunksAsync = async ({
    file,
    urlEnding,
    data,
    callback
}: {
    urlEnding: string,
    file: File,
    data?: any,
    callback?: (params: FileUploadCallbackParams) => void,
}) => {

    let uploadedBytesCount = 0;
    let currentChunkIndex = 0;
    const trimmedUrlEnding = urlEnding.substring(0, 1) === '/'
        ? urlEnding.substring(1)
        : urlEnding;
    const url = Environment.serverUrl + trimmedUrlEnding;
    const bytesToBeUploaded = file.size;
    const chunksCount = Math.ceil(bytesToBeUploaded / maxChunkSizeBytes);

    Logger.logScoped('FILE UPLOAD', `Starting upload, chunks count: ${chunksCount}...`);

    while (uploadedBytesCount < bytesToBeUploaded) {

        if (callback)
            callback({ currentChunkIndex, chunkCount: chunksCount });

        const currentChunkArrayBuffer = await getFileChunkAsync(uploadedBytesCount, file);

        Logger.logScoped('FILE UPLOAD', `Uploading chunk: #${currentChunkIndex} - ${currentChunkArrayBuffer.byteLength * 0.000001}mb`);

        await postMultipartAsync(url, { file: new File([currentChunkArrayBuffer], 'chunk') }, {
            chunkIndex: currentChunkIndex,
            chunksCount,
            ...data
        });

        uploadedBytesCount += currentChunkArrayBuffer.byteLength;
        currentChunkIndex++;
    }

    Logger.logScoped('FILE UPLOAD', 'Upload finished!');
};

const getFileChunkAsync = (uploadedBytesCount: number, file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {

        try {
            const fromBytes = uploadedBytesCount;
            const toBytes = uploadedBytesCount + maxChunkSizeBytes;
            const fileChunk = file.slice(fromBytes, toBytes);
            const reader = new FileReader();

            // start reading as array buffer
            reader.readAsArrayBuffer(fileChunk);

            reader.onload = () => {

                if (!reader.result) {

                    reject(new Error('Reader returend null or undefined!'));
                }
                else {

                    resolve(reader.result as ArrayBuffer);
                }
            };

            reader.onerror = (e) => {

                reject(e);
            };
        }
        catch (e) {

            reject(e);
        }
    });
};
