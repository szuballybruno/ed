// --------------- util START

type StringLiteralToObjectType<T extends string> = {
    [K in T as K]: string;
}

type ToupleToStringLiteral<T extends Array<any>> = T[number];


/**
 * Makes a mutable type out of a readonly one
 */
export type Mutable<T> = {
    -readonly [K in keyof T]: Mutable<T[K]>;
}

// ---------------- util END

const sizes = ['px5', 'px10'] as const;
const colors = ['fontDark', 'fontLight'] as const;
const fontSizes = ['small', 'normal', 'large'] as const;
const fontWeights = ['light', 'normal', 'heavy'] as const;

const globalCSSDeclaraition = {
    margin: {
        left: sizes,
        right: sizes
    },
    color: colors,
    fontSize2: fontSizes,
    fontWeight: fontWeights
} as const;

type MutableGlobalCSS = Mutable<typeof globalCSSDeclaraition>;

export type gct<TObj> = {
    [K in keyof TObj]?: TObj[K] extends any[] ? ToupleToStringLiteral<TObj[K]> : gct<TObj[K]>;
}

export type CSSOptionsType = gct<MutableGlobalCSS>;

// ------------ data 

const _getCSSClassKeyFromOptions = (obj: any, parentKey: string): string[] => {

    if (!obj)
        return [];

    const classKeys = Object
        .keys(obj)
        .flatMap(currentKey => {

            const currentValue = obj[currentKey];

            if (typeof currentValue === 'string') {

                const classKey = `${parentKey === '' ? '' : parentKey + '-'}${currentKey}-${currentValue}`;

                return [classKey];
            }
            else {

                return _getCSSClassKeyFromOptions(currentValue, currentKey);
            }
        });

    return classKeys;
};

export const getCSSClassKeyFromOptions = (options: CSSOptionsType) => _getCSSClassKeyFromOptions(options, '');