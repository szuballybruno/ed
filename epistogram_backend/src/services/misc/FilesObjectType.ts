import { UploadedFile } from "express-fileupload"

export type FilesObjectType = {
    [K: string]: UploadedFile;
}