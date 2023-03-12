import { IXORMSchemaProviderService, XDBMSchemaType } from '@episto/x-orm';
import { databaseSchema } from '../models/DatabaseSchema';

export class DBSchemaProviderService implements IXORMSchemaProviderService {

    constructor() {

    }

    getSchema(): XDBMSchemaType {

        return databaseSchema;
    }
}
