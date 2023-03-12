
export type RemapToFunctions<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: (...args: any[]) => TTuple[TIndex];
    } & { length: TTuple['length'] });

export type RemapToConstructors<TTuple extends [...any[]]> = TTuple extends never[]
    ?
    ({
        [TIndex in keyof TTuple]: never
    })
    : ({
        [TIndex in keyof TTuple]: { new(...args: any[]): TTuple[TIndex] };
    } & { length: TTuple['length'] });