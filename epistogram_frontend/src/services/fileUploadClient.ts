import { backendUrl } from "../Environemnt";
import { httpPostAsync } from "./httpClient";

const maxChunkSizeBytes = 100;

export const uploadeFileAsync = async (urlEnding: string, file: File) => {

    let uploadedBytesCount = 0;
    const url = backendUrl + urlEnding;
    const bytesToBeUploaded = file.size;

    while (uploadedBytesCount < bytesToBeUploaded) {

        console.log("Uploaded bytes: ");
        console.log(uploadedBytesCount);

        const currentChunkArrayBuffer = await getFileChunkAsync(uploadedBytesCount, file);

        console.log("Uploading chunk: ");
        console.log(currentChunkArrayBuffer);
        await uploadChunkAsync(url, currentChunkArrayBuffer);

        uploadedBytesCount += currentChunkArrayBuffer.byteLength;
    }
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

const uploadChunkAsync = async (url: string, fileChunk: ArrayBuffer) => {

    var formData = new FormData();
    formData.append('filedata', new File([fileChunk], 'filechunk'));

    await httpPostAsync(
        url,
        formData,
        x => x.headers = { ...x.headers, "Content-Type": 'multipart/form-data' });
}
