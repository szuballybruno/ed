type ToupleToStringLiteral<T extends Array<any>> = T[number];
type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]>; }

type gct<TObj> = {
    [K in keyof TObj]?: TObj[K] extends any[] ? ToupleToStringLiteral<TObj[K]> : gct<TObj[K]>;
}

// ---------------- GENERIC

const sizes = ['px5', 'px10', 'px15', 'px20'] as const;
const colors = ['fontDark', 'fontLight', 'fontGray', 'fontError', 'deepBlue'] as const;
const fontSizes = ['small', 'normal', 'large'] as const;
const fontWeights = ['light', 'normal', 'heavy'] as const;
const widths = ['stretch'] as const;
const heights = ['stretch'] as const;

const globalCssGeneric = {
    margin: {
        all: sizes,
        horizontal: sizes,
        vertical: sizes,
        left: sizes,
        right: sizes
    },
    roundBorders: 'normal',
    background: colors,
    width: widths,
    height: heights
} as const;

export type CSSOptionsType = gct<Mutable<typeof globalCssGeneric>>;

// --------------- FONT

const globalCssFont = {
    color: colors,
    fontSize2: fontSizes,
    fontWeight: fontWeights,
} as const;

export type CSSOptionsFont = CSSOptionsType & gct<Mutable<typeof globalCssFont>>;

// --------------- FLEX

const globalCssFlex = {
    direction: ['horizontal', 'vertical'],
    align: ['flex-start', 'center', 'flex-end'],
    justify: ['flex-start', 'center', 'flex-end'],
} as const;

export type CSSOptionsFlex = CSSOptionsType & gct<Mutable<typeof globalCssFlex>>;

// --------------- DATA 

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