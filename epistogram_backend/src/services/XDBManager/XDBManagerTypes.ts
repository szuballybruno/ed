import { PropConstraintType } from '../../utilities/misc';

export type SQLConstraintType = {
    name: string;
    tableName: string;
}

export type SQLIndexType = {
    name: string;
    tableName: string;
}

export type SchemaDefinitionType = {
    seedScripts: ([Function, PropConstraintType<any, any>] | string)[];
    functionScripts: string[];
    constraints: SQLConstraintType[];
    views: ([string] | [string, Function])[];
    entities: Function[];
    indices: SQLIndexType[];
    triggers: string[];
}