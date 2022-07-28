import { PropConstraintType } from '../../utilities/misc';

export type XDBMConstraintType = {
    fileName: string;
    tableName?: string;
}

export type XDMBIndexType = {
    name: string;
    tableName: string;
}

export class XDBMSchemaType {
    seedScripts: [Function, PropConstraintType<any, any>][];
    functionScripts: string[];
    constraints: XDBMConstraintType[];
    views: ([string, string] | [string, string, Function])[];
    entities: Function[];
    indices: XDMBIndexType[];
    triggers: string[];

    constructor(opts: XDBMSchemaType) {

        this.seedScripts = opts.seedScripts;
        this.functionScripts = opts.functionScripts;
        this.constraints = opts.constraints;
        this.views = opts.views;
        this.entities = opts.entities;
        this.indices = opts.indices;
        this.triggers = opts.triggers;
    }
}