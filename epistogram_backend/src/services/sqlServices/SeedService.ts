
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { NoComplexTypes, PropConstraintType, constraintFn, NoIdType } from '../../utilities/misc';
import { dbSchema } from '../misc/dbSchema';
import { log, logSecondary } from '../misc/logger';
import { SQLBootstrapperService } from './SQLBootstrapper';
import { SQLConnectionService } from './SQLConnectionService';

type NewSeedType = [{ new(): any }, Object];

export const getSeedList = <TEntity>() => {

    type SeedType = NoIdType<NoComplexTypes<TEntity>>;

    return <TData extends PropConstraintType<TData, SeedType>>(data: TData) => {

        const ret = constraintFn<SeedType>()(data);

        Object.values(ret)
            .forEach((val, index) => (val as any)['id'] = index + 1);

        return ret as any as PropConstraintType<TData, NoComplexTypes<TEntity>>;
    };
};

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _execService: SQLConnectionService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, execService: SQLConnectionService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._execService = execService;
    }

    seedDBAsync = async () => {

        for (let index = 0; index < dbSchema.seedScripts.length; index++) {

            const seedScriptName = dbSchema.seedScripts[index];

            if (typeof seedScriptName === 'string') {

                log(`Seeding ${seedScriptName}...`);

                await this._sqlBootstrapperService
                    .executeSeedScriptAsync(seedScriptName);
            }
            else {

                const [classType, seedObj] = seedScriptName as NewSeedType;

                log(`Seeding ${classType.name}...`);

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

    private parseSeedList<TEntity>(t: { new(): TEntity }, obj: { [K in string]: NoComplexTypes<TEntity> }) {

        const { text, values } = this.getValues(t, obj);

        const firstObjectKeys = Object.keys(Object.values(obj)[0]);

        const script = `
INSERT INTO public.${toSQLSnakeCasing(t.name)}
(${firstObjectKeys
                .map(x => toSQLSnakeCasing(x))
                .join(', ')})
VALUES 
${text}`;

        return {
            script,
            values
        };
    }

    private getValues<TEntity>(t: { new(): TEntity }, obj: { [K in string]: NoComplexTypes<TEntity> }) {

        const entities = Object
            .values(obj);

        const values: any[] = [];

        const lines = entities
            .map((entity, entityIndex) => {

                const entityValues = Object.values(entity);

                const tokens = entityValues
                    .map(val => {

                        values.push(val);
                        return `$${values.length}`;
                    });

                return `(${tokens.join(', ')})${entityIndex < entities.length - 1 ? ',' : ';'} -- ${entityValues.join(', ')}`;
            });

        return {
            text: lines.join('\n'),
            values
        };
    }

    // private serializeValue(val: any) {

    //     if (typeof val === 'string')
    //         return `'${val}'`;

    //     return val;
    // }
}
