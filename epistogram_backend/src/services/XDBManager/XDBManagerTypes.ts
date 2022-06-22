import { PropConstraintType } from '../../utilities/misc';

export type XDBMConstraintType = {
    name: string;
    tableName: string;
}

export type XDMBIndexType = {
    name: string;
    tableName: string;
}

export type XDBMSchemaType = {
    seedScripts: ([Function, PropConstraintType<any, any>] | string)[];
    functionScripts: string[];
    constraints: XDBMConstraintType[];
    views: ([string, string] | [string, string, Function])[];
    entities: Function[];
    indices: XDMBIndexType[];
    triggers: string[];
}