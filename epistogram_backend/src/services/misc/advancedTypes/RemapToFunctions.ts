import { ParametrizedFunction } from './ParametrizedFunction';

export type RemapToFunctions<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: ParametrizedFunction<TTuple[TIndex]>;
    } & { length: TTuple['length'] });