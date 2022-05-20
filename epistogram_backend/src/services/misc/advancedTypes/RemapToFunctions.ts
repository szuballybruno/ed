import { ParametrizedFunction } from './ParametrizedFunction';

export type RemapToFunctions<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: ParametrizedFunction<TTuple[TIndex]>;
    } & { length: TTuple['length'] });


// export type RemapToFunctions<TTuple extends [...any[]]> = {
//     [TIndex in keyof TTuple]: ParametrizedFunction<TTuple[TIndex]>;
// } & { length: TTuple['length'] };


// type asd = RemapToFunctions<[string, number]>;
// type asd2 = RemapToFunctions<[]>;

// type asd3 = RemapToFunctions2<[string, number]>;
// type asd4 = RemapToFunctions2<[]>;