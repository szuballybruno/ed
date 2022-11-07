import { ParametrizedConstructor } from '../../services/misc/advancedTypes/ParametrizedConstructor';
import { ParametrizedFunction } from '../../services/misc/advancedTypes/ParametrizedFunction';

export type RemapToFunctions<TTuple extends [...any[]]> = TTuple extends never[]
?
({
    [TIndex in keyof TTuple]: never
})
: ({
    [TIndex in keyof TTuple]: ParametrizedFunction<TTuple[TIndex]>;
} & { length: TTuple['length'] });

export type RemapToConstructors<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: ParametrizedConstructor<TTuple[TIndex]>;
    } & { length: TTuple['length'] });