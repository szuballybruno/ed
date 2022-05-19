
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { constraintFn, NoComplexTypes, NoIdType, PropConstraintType } from '../../utilities/misc';
import { logSecondary } from '../misc/logger';
import { XDBMSchemaType as XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { SQLBootstrapperService } from './SQLBootstrapper';
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

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _execService: SQLConnectionService;
    private _dbSchema: XDBMSchemaType;

    constructor(dbSchema: XDBMSchemaType, sqlBootstrapperService: SQLBootstrapperService, execService: SQLConnectionService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._execService = execService;
        this._dbSchema = dbSchema;
    }

    seedDBAsync = async () => {

        for (let index = 0; index < this._dbSchema.seedScripts.length; index++) {

            const seedScriptName = this._dbSchema.seedScripts[index];

            if (typeof seedScriptName === 'string') {

                logSecondary(`Seeding ${seedScriptName}...`);

                await this._sqlBootstrapperService
                    .executeSeedScriptAsync(seedScriptName);
            }
            else {

                const [classType, seedObj] = seedScriptName as NewSeedType;

                logSecondary(`Seeding ${classType.name}...`);

                if (Object.values(seedObj).length === 0) {

                    logSecondary('Skipping, has no values.');
                    continue;
                }

                const { script, values } = this.parseSeedList(classType, seedObj as any);
                await this._execService.executeSQLAsync(script, values);
            }
        }

        // recalc seqs
        await this._sqlBootstrapperService.recalcSequencesAsync();
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
