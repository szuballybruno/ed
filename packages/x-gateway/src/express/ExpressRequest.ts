import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IXGatewayRequest } from '../interface/IXGatewayRequest';

export class ExpressRequest implements IXGatewayRequest {

    path: string;
    body: any;
    query: any;
    files: any;
    origin: string;

    constructor(private _req: Request) {

        this.body = this._req.body;
        this.query = this._req.query;
        this.path = this._req.path;
        this.files = this._req.files;
        this.origin = this._req.headers.origin ?? '';
    }

    getCookies() {

        const cookieString = (this._req.headers.cookie as string);
        if (!cookieString)
            return [];

        return cookieString
            .split('; ')
            .map(x => ({
                key: x.split('=')[0],
                value: x.split('=')[1]
            }));
    }

    getCookie(key: string) {

        return this.getCookies()
            .filter(x => x.key === key)[0]?.value as string | null;
    }

    hasFiles() {

        return !!this._req.files;
    }

    getSingleFile() {

        if (!this._req.files)
            throw new Error('Request contains no files.');

        // TODO multiple file error check

        return this._req.files.file as UploadedFile;
    }
}