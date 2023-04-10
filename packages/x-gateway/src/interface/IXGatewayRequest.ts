import { UploadedFile } from 'express-fileupload';

export interface IXGatewayRequest {
    path: string;
    body: any;
    query: any;
    origin: string;
    files: { [K: string]: UploadedFile };
    getCookie(key: string): string | null;
    hasFiles(): boolean;
    getSingleFile(): UploadedFile;
}