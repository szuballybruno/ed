
import { Permission } from '../../models/entity/authorization/Permission';
import { Role } from '../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { Company } from '../../models/entity/Company';
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import seed_companies from '../../sql/seed/seed_companies';
import seed_course_access_bridge from '../../sql/seed/seed_course_access_bridge';
import { permissionList } from '../../sql/seed/seed_permissions';
import { roleList } from '../../sql/seed/seed_roles';
import { roleAssignmentBridgeSeedList } from '../../sql/seed/seed_role_assignment_bridges';
import { rolePermissionList } from '../../sql/seed/seed_role_permission_bridges';
import { NoComplexTypes } from '../../sql/seed/seed_test';
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { dbSchema } from '../misc/dbSchema';
import { log, logSecondary } from '../misc/logger';
import { SQLBootstrapperService } from './SQLBootstrapper';
import { SQLConnectionService } from './SQLConnectionService';

type NewSeedType = [{ new(): any }, Object];

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _execService: SQLConnectionService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, execService: SQLConnectionService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._execService = execService;
    }

    private _seedDBAsync = async () => {

        const overrides = [
            ['seed_permissions', Permission, permissionList],
            ['seed_roles', Role, roleList],
            ['seed_role_permission_bridges', RolePermissionBridge, rolePermissionList],
            ['seed_role_assignment_bridges', RoleAssignmentBridge, roleAssignmentBridgeSeedList],
            ['seed_course_access_bridge', CourseAccessBridge, seed_course_access_bridge],
            ['seed_companies', Company, seed_companies]
        ];

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
    public get seedDBAsync() {
        return this._seedDBAsync;
    }
    public set seedDBAsync(value) {
        this._seedDBAsync = value;
    }

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
