
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { constraintFn, NoComplexTypes, NoIdType, PropConstraintType } from '../../utilities/misc';
import { LoggerService } from '../LoggerService';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { SQLConnectionService } from './SQLConnectionService';

type NewSeedType = [{ new(): any }, Object];

export const getSeedList = <TEntity, TConstraint extends PropConstraintType<TConstraint, NoIdType<NoComplexTypes<TEntity>>> = {}>() => {

    type SeedType = NoIdType<NoComplexTypes<TEntity>>;

    return <TData extends PropConstraintType<TData, SeedType> & TConstraint>(data: TData) => {

        const ret = constraintFn<SeedType>()(data);

        // automatically set id props 
        Object
            .values(ret)
            .forEach((val, index) => (val as any)['id'] = index + 1);

        return ret as any as PropConstraintType<TData, NoComplexTypes<TEntity>>;
    };
};

export class SeedService {

    constructor(
        private _dbSchema: XDBMSchemaType,
        private _config: GlobalConfiguration,
        private _sqlConnectionService: SQLConnectionService,
        private _loggerService: LoggerService) {
    }

    seedDBAsync = async () => {

        this._loggerService.logScoped('BOOTSTRAP', 'Seeding DB...');

        for (let index = 0; index < this._dbSchema.seedScripts.length; index++) {

            const scriptObject = this._dbSchema.seedScripts[index];

            const [classType, seedObj] = scriptObject as NewSeedType;

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Seeding ${classType.name}...`);

            if (Object.values(seedObj).length === 0) {

                this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', 'Skipping, has no values.');
                continue;
            }

            const { script, values } = this.parseSeedList(classType, seedObj as any);
            await this._sqlConnectionService.executeSQLAsync(script, values);
        }

        // recalc seqs
        await this
            ._recalcSequencesAsync();

        this._loggerService.logScoped('BOOTSTRAP', 'Seeding DB done!');
    };

    private _recalcSequencesAsync = async () => {

        this._loggerService.logScoped('BOOTSTRAP', 'Recalculating sequance max values...');

        const dbName = this._config.database.name;

        const script = `
            DO $$
                DECLARE
                i TEXT;
                BEGIN
                FOR i IN (SELECT tbls.table_name 
                    FROM information_schema.tables AS tbls 
                    INNER JOIN information_schema.columns AS cols 
                    ON tbls.table_name = cols.table_name 
                    WHERE tbls.table_catalog='${dbName}' 
                        AND tbls.table_schema='public' 
                        AND cols.column_name='id'
                        AND tbls.table_type = 'BASE TABLE') 
                    LOOP
                    
                    EXECUTE 'SELECT setval(''"' || i || '_id_seq"'', (SELECT MAX(id) FROM ' || quote_ident(i) || '));';
                END LOOP;
            END $$;
        `;

        await this._sqlConnectionService.executeSQLAsync(script);

        this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', 'Recalculating sequance max values done.');
    };

    private parseSeedList<TEntity>(entitySignature: { new(): TEntity }, seedObject: { [K in string]: NoComplexTypes<TEntity> }) {

        const { valuesScript, values } = this.getValues(seedObject);

        const firstEntity = Object
            .values(seedObject)
            .first();

        // get first entity keys 
        // ---> NOTE: entity keys are orderd by their names
        const firstEntityKeysOrdered = Object
            .keys(firstEntity)
            .orderBy(entityKey => entityKey);

        const insertColumnNames = firstEntityKeysOrdered
            .map(x => toSQLSnakeCasing(x))
            .join(', ');

        const insertTableName = toSQLSnakeCasing(entitySignature.name);

        const script = `
INSERT INTO public.${insertTableName}
(${insertColumnNames})
VALUES 
${valuesScript}`;

        return {
            script,
            values
        };
    }

    private getValues<TEntity>(seedObject: { [K in string]: NoComplexTypes<TEntity> }) {

        const entities = Object
            .values(seedObject);

        const values: any[] = [];

        const getEntityInsertScript = (entity: any, index: number) => {

            // get entity property values 
            // these will be inserted to the rows 
            // of the entity's SQL table
            // ---- NOTE: values are orderd by their name
            const entityValuesOrdered = Object
                .keys(entity)
                .orderBy(entityKey => entityKey)
                .map(entitKey => (entity as any)[entitKey]);

            // get sql token placeholders for each value 
            const valueIndices = entityValuesOrdered
                .map(entityValue => {

                    // push to global flat values array
                    values.push(entityValue);

                    // return value index
                    return `$${values.length}`;
                });

            // trailing comma or semicolon
            const comma = index < entities.length - 1
                ? ','
                : ';';

            return `(${valueIndices.join(', ')})${comma} -- ${entityValuesOrdered.join(', ')}`;
        };

        const insertScripts = entities
            .map(getEntityInsertScript);

        return {
            valuesScript: insertScripts.join('\n'),
            values
        };
    }

    // private serializeValue(val: any) {

    //     if (typeof val === 'string')
    //         return `'${val}'`;

    //     return val;
    // }
}
