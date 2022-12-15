import { writeFileSync } from "fs";
import { SQLObjectType } from "./models/SQLObjectType";
import { getOrmObjectFileTemplate } from "./templates/ormObjectFileTemplate";
import { XOrmConnectionService } from "./XORMConnectionService";
import { XORMUtils } from "./XORMUtils";

export class Scaffolder {

    constructor(private _connService: XOrmConnectionService) {
    }

    async scaffoldAsync(sqlFolderPath: string) {

        const liveSchema = await this
            ._connService
            .getLiveSchamaAsync();

        const tables = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'table'));

        tables
            .forEach(x => writeFileSync(`${sqlFolderPath}/tables2/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));
    }

    _mapToOrmObjectTexts(liveSchema: SQLObjectType[]) {

        const TAB = '    ';

        return liveSchema
            .map(sqlObject => {

                const capitalizedName = XORMUtils.toJSCapitalizedName(sqlObject.name);

                const props = sqlObject
                    .columns
                    .map(x => `${TAB}@XViewColumn()\n${TAB}${XORMUtils.toJSCamelCase(x.name)}: string;`)
                    .join('\n\n');

                return {
                    fileText: getOrmObjectFileTemplate(capitalizedName, props),
                    sqlObject,
                    capitalizedName
                }
            });
    };
}