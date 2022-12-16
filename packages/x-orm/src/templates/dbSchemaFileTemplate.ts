export const getDbSchemaFileTemplate = (imports: string, views: string, tables: string) => 
`import { XDBMSchemaService } from "@episto/x-orm";
${imports}

export const databaseSchema: XDBMSchemaService = {

    views: [
${views}
    ],

    entities: [
${tables}
    ]
}`;