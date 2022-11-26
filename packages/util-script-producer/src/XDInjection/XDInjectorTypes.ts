
export type RemapToFunctions<TTuple extends [...some[]]> = TTuple extends never[]
?
({
    [TIndex in keyof TTuple]: never
})
: ({
    [TIndex in keyof TTuple]: ParametrizedFunction<TTuple[TIndex]>;
} & { length: TTuple['length'] });

export type RemapToConstructors<TTuple extends [...some[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: ParametrizedConstructor<TTuple[TIndex]>;
    } & { length: TTuple['length'] });

export type ParametrizedConstructor<T = any> = { new(...args: any[]): T };
export type ParametrizedFunction<T = any> = (...args: any[]) => T;

