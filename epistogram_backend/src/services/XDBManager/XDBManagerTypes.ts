import { PropConstraintType } from '../../utilities/misc';
import { ParametrizedFunction } from '../misc/advancedTypes/ParametrizedFunction';

export type XDBMConstraintType = {
    fileName: string;
    tableName?: string;
}

export type XDMBIndexType = {
    name: string;
    tableName: string;
}

export type SeedDataContainerType = {
    data: [Function, PropConstraintType<any, any>][],
    getSeedData: <T extends ParametrizedFunction>(fn: T) => ReturnType<T>
};

export class XDBMSchemaService {
    seed: SeedDataContainerType | null;
    functionScripts: string[];
    constraints: XDBMConstraintType[];
    views: Function[];
    entities: Function[];
    indices: XDMBIndexType[];
    triggers: string[];

    constructor(opts: XDBMSchemaService) {

        this.seed = opts.seed;
        this.functionScripts = opts.functionScripts;
        this.constraints = opts.constraints;
        this.views = opts.views;
        this.entities = opts.entities;
        this.indices = opts.indices;
        this.triggers = opts.triggers;
    }
}