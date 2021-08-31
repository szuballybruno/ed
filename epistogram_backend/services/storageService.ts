import { appendFile } from "async-fs-wrapper";

export const appendToFileAsync = (url: string, buffer: Buffer) => {

    return appendFile(url, buffer);
}