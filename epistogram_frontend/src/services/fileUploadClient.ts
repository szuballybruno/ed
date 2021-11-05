import { serverUrl } from "../Environemnt";
import { postFileAsync } from "./httpClient";

const mbToByte = 1000000;
const maxChunkSizeBytes = 10 * mbToByte; // 10 mb

export const uploadeFileChunksAsync = async (urlEnding: string, file: File, data?: any) => {

    let uploadedBytesCount = 0;
    let chunkIndex = 0;
    const trimmedUrlEnding = urlEnding.substring(0, 1) === "/"
        ? urlEnding.substring(1)
        : urlEnding;
    const url = serverUrl + trimmedUrlEnding;
    const bytesToBeUploaded = file.size;
    const chunksCount = Math.ceil(bytesToBeUploaded / maxChunkSizeBytes);

    console.log(`Starting upload, chunks count: ${chunksCount}...`)

    while (uploadedBytesCount < bytesToBeUploaded) {

        const currentChunkArrayBuffer = await getFileChunkAsync(uploadedBytesCount, file);

        console.log(`Uploading chunk: #${chunkIndex} - ${currentChunkArrayBuffer.byteLength * 0.000001}mb`);

        await postFileAsync(url, new File([currentChunkArrayBuffer], "chunk"), {
            chunkIndex,
            chunksCount,
            ...data
        });

        uploadedBytesCount += currentChunkArrayBuffer.byteLength;
        chunkIndex++;
    }

    console.log("Upload finished!");
}

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

                    reject(new Error("Reader returend null or undefined!"));
                }
                else {

                    resolve(reader.result as ArrayBuffer);
                }
            }

            reader.onerror = (e) => {

                reject(e);
            }
        }
        catch (e) {

            reject(e);
        }
    })
}
