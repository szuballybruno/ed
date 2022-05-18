import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { logSecondary } from '../services/misc/logger';
import { VerboseError } from '../shared/types/VerboseError';
import { withValueOrBadRequest, SafeObjectWrapper } from './helpers';

export class PrincipalId {

    private _id: number;

    constructor(id: number) {

        this._id = id;
    }

    toSQLValue() {

        return this._id;
    }
}

export class ActionParams {
    req: Request;
    res: Response;
    // currentUserId: number;
    isMultipart: boolean;
    principalId: PrincipalId;

    constructor(
        req: Request,
        res: Response,
        userId: number,
        isMultipart: boolean) {

        this.isMultipart = isMultipart;
        this.req = req;
        this.res = res;
        // this.currentUserId = userId;
        this.principalId = new PrincipalId(userId);
    }

    getBody<T = any>(notNullOrUndefined: (keyof T)[] = []) {

        if (this.isMultipart) {

            const bodyJson = withValueOrBadRequest<string>(this.req.body.document);
            const body = JSON.parse(bodyJson);
            return new SafeObjectWrapper<T>(body);
        }
        else {

            if (this.req.body.document)
                logSecondary('--- WARNING: body has a document property, this might mean it\'s not a JSON payload, but a multipart form data!');

            const body = withValueOrBadRequest<T>(this.req.body);

            const nullOrUndefProps = notNullOrUndefined
                .filter(x => body[x] === undefined || body[x] === null);

            if (nullOrUndefProps.length > 0)
                throw new Error(`Null or undefined properties found on object: [${nullOrUndefProps.join(', ')}]!`);

            return new SafeObjectWrapper<T>(body);
        }
    }

    getQuery<T = any>() {

        const query = withValueOrBadRequest<T>(this.req.query);
        return new SafeObjectWrapper<T>(query);
    }

    getFiles() {

        return this.req.files;
    }

    getSingleFile() {

        const file = this.req.files?.file;
        return (file ? file : undefined) as UploadedFile | undefined;
    }

    getSingleFileOrFail() {

        const file = this.req.files?.file;
        if (!file)
            throw new VerboseError('File not sent!', 'bad request');

        return file as UploadedFile;
    }
}
