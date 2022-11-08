import { UploadedFile } from 'express-fileupload';
import { logSecondary } from '../../services/misc/logger';
import { XSafeObjectWrapper } from '@episto/commonlogic';
import { ParametrizedRouteType, RouteParameterType } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { withValueOrBadRequest } from '../helpers';
import { ITurboRequest, ITurboResponse } from './XTurboExpressTypes';

export class PrincipalId {

    private _id: number;

    constructor(id: number) {

        this._id = id;
    }

    getId(): Id<'User'> {

        return Id.create<'User'>(this._id);
    }

    toSQLValue(): number {

        return this._id;
    }
}

export type ParamsData<T extends RouteParameterType> = {
    body: XSafeObjectWrapper<T['body']>,
    query: XSafeObjectWrapper<T['query']>
}

export class ActionParams<
    TRequest extends ITurboRequest = ITurboRequest,
    TResponse extends ITurboResponse = ITurboResponse> {

    private _principalId: PrincipalId;
    isMultipart: boolean;
    companyId: Id<'Company'>;
    files: XSafeObjectWrapper<{ [K: string]: UploadedFile; }>;

    get principalId() {

        if (this._principalId.getId() === -1 as any)
            throw new Error(`Using principal's id on a route that's marked as 'public' is prohibited. Route: ${this.req.path}`);

        return this._principalId;
    }

    constructor(
        public req: TRequest,
        public res: TResponse,
        userId: Id<'User'>,
        companyId: Id<'Company'>) {

        this._principalId = new PrincipalId(Id.read(userId));
        this.isMultipart = !!this.req.body.document;
        this.companyId = companyId;
        this.files = this.getFiles();
    }

    /**
     * @deprecated use: getFromParameterized
     */
    getBody<T = any>(notNullOrUndefined: (keyof T)[] = []) {

        if (this.isMultipart) {

            const bodyJson = withValueOrBadRequest<string>(this.req.body.document);
            const body = JSON.parse(bodyJson);
            return new XSafeObjectWrapper<T>(body);
        }
        else {

            if (this.req.body.document)
                logSecondary('--- WARNING: body has a document property, this might mean it\'s not a JSON payload, but a multipart form data!');

            const body = withValueOrBadRequest<T>(this.req.body);

            const nullOrUndefProps = notNullOrUndefined
                .filter(x => body[x] === undefined || body[x] === null);

            if (nullOrUndefProps.length > 0)
                throw new Error(`Null or undefined properties found on object: [${nullOrUndefProps.join(', ')}]!`);

            return new XSafeObjectWrapper<T>(body);
        }
    }

    /**
     * @deprecated use: getFromParameterized
     */
    getQuery<T = any>() {

        const query = withValueOrBadRequest<T>(this.req.query);
        return new XSafeObjectWrapper<T>(query);
    }

    getFiles() {

        return new XSafeObjectWrapper<{ [K: string]: UploadedFile }>(this.req.files ?? {});
    }

    getSingleFile() {

        const file = this.req.files?.file;
        return (file ? file : undefined) as UploadedFile | undefined;
    }

    getSingleFileOrFail() {

        const file = this.req.files?.file;
        if (!file)
            throw new ErrorWithCode('File not sent!', 'bad request');

        return file as UploadedFile;
    }

    getFromParameterized<T extends RouteParameterType>(route: ParametrizedRouteType<T>): ParamsData<T> {

        return {
            body: this.getBody<T['body']>(),
            query: this.getQuery<T['query']>()
        };
    }
}
