import { SQLObjectType } from "./models/SQLObjectType";
import { parseOrmSchema } from "./static/schemaParser";
import { LiveSchemaProvider } from "./LiveSchemaProvider";
import { IXORMSchemaProviderService, XDBMSchemaType } from "./XORMTypes";

export class SchemaValidator {

    constructor(
        private _schemaProviderService: IXORMSchemaProviderService,
        private _connection: LiveSchemaProvider) {
    }

    async validateSchemaAsync() {

        const ormSchema = this
            ._schemaProviderService
            .getSchema();

        const liveSchema = await this
            ._connection
            .getLiveSchamaAsync();

        this._validateSchemaObjects({
            liveSchema,
            ormSchema
        });
    }

    private _validateSchemaObjects({
        liveSchema,
        ormSchema
    }: {
        liveSchema: SQLObjectType[],
        ormSchema: XDBMSchemaType
    }) {

        const parsedOrmSchema = parseOrmSchema({ ormSchema });

        const objectsMissingFromLiveSchema = parsedOrmSchema
            .filter(ormObject => !liveSchema
                .some(liveObject => liveObject.name === ormObject.name));

        const columnsMissingFromLiveSchema = parsedOrmSchema
            .filter(ormObject => !objectsMissingFromLiveSchema
                .some(x => x.name === ormObject.name))
            .map(ormObject => {

                const liveObject = liveSchema
                    .single(x => x.name === ormObject.name);

                const missingColumns = ormObject
                    .columns
                    .filter(ormColumn => !liveObject
                        .columns
                        .some(liveColumn => liveColumn.name === ormColumn.name));

                return {
                    ormObject,
                    missingColumns
                };
            })
            .filter(x => x.missingColumns.length > 0);

        const objectsMissingError = objectsMissingFromLiveSchema.length > 0
            ? `Objects are missing from live schema: \n${objectsMissingFromLiveSchema
                .map(x => `- ${x.name} (${x.type})`)
                .join(',\n')}`
            : '';

        const columnsMissingError = columnsMissingFromLiveSchema.length > 0
            ? `Columns are missing from live schema: \n${columnsMissingFromLiveSchema
                .map(x => `- ${x.ormObject.name}: ${x.missingColumns.map(x => x.name).join(', ')}`)
                .join(',\n')}`
            : '';

        if (objectsMissingError !== '' || columnsMissingError !== '')
            throw new Error(`SQL Schema validation error: \n${objectsMissingError}\n${columnsMissingError}`);
    }
}