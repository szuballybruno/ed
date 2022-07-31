import { ParametrizedConstructor } from './ParametrizedConstructor';

export type RemapToConstructors<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: ParametrizedConstructor<TTuple[TIndex]>;
    } & { length: TTuple['length'] });