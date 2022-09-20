import { getRandomInteger } from '../../static/frontendHelpers';

/**
 * @param centerColor The main color of each grid item
 * @param backgroundColor The secondary color of each grid item
 * @param radius Size of the grid items gradient circle
 * @param offsetX Horizontal offset of the grid items gradient circle
 * @param offsetY Vertical offset of the grid items gradient circle
 * @param minOpacity Minimum value of generated opacity range for center color
 * @param maxOpacity Maximum value of generated opacity range for center color
 */

export type GradientType = {
    centerColor?: string,
    backgroundColor?: string,
    radius?: number,
    offsetX?: string,
    offsetY?: string,
    minOpacity?: number,
    maxOpacity?: number
}

export type GridGradientOptions = {
    topLeft?: GradientType,
    topCenter?: GradientType,
    topRight?: GradientType,

    centerLeft?: GradientType,
    centerCenter?: GradientType,
    centerRight?: GradientType,

    bottomLeft?: GradientType,
    bottomCenter?: GradientType,
    bottomRight?: GradientType,
}

/**
 * Generates a 3x3 full screen background gradient 
 * from the given colors. Alpha values generated 
 * automatically for the main color.
 * 
 * Without options, the default blue windows 
 * 11-like background is generated.
 * 
 * @param options See: {@link GridGradientOptions}
 * @returns an array of gradients as string[]
 * @example 
 * gradientBackGroundGenerator({
    * topLeft: {
        * backgroundColor: "rgba(0,0,0,0.1)"
    * }
 * })
 */

export const gradientBackgroundGenerator = (color?: string, options?: GridGradientOptions) => {

    const defaultRadius = 1000;

    const regex = /\(([^()]*)(,[^()]*)\)/gm;
    const plainColorValue = color ? regex.exec(color) : undefined;

    const defaultCenterColor = color && plainColorValue ? plainColorValue[1] : '0,100,255';
    const defaultBackgroundColor = color && plainColorValue ? `rgba(${plainColorValue[1]}, 0.1)` : 'rgba(0, 100, 255, 0.1)';

    console.log('DefaultCenterColor: ' + defaultCenterColor);
    console.log('DefaultBackgroundColor: ' + defaultBackgroundColor);


    const getGradientOptionsOrDefault = (
        optionKey: keyof GridGradientOptions,
        offsetX: string,
        offsetY: string,
        minOpacity: number,
        maxOpacity: number
    ) => ({

        radius: options?.[optionKey]?.radius ?? defaultRadius,
        backgroundColor: options?.[optionKey]?.backgroundColor ?? defaultBackgroundColor,
        centerColor: options?.[optionKey]?.centerColor ?? defaultCenterColor,
        offsetX: options?.topLeft?.offsetX ?? offsetX,
        offsetY: options?.topLeft?.offsetY ?? offsetY,
        minOpacity: options?.topLeft?.minOpacity ?? minOpacity,
        maxOpacity: options?.topLeft?.maxOpacity ?? maxOpacity
    });

    {/* Default gradient options */ }
    const gradientOptions: GradientType[] = [
        getGradientOptionsOrDefault('topLeft', '70%', '400%', 0.4, 0.7),
        getGradientOptionsOrDefault('topCenter', '', '320%', 0.5, 0.6),
        getGradientOptionsOrDefault('topRight', '30%', '400%', 0.4, 0.7),
        getGradientOptionsOrDefault('centerLeft', '70%', '50%', 0.3, 0.4),
        getGradientOptionsOrDefault('centerCenter', '', '', 0.5, 0.6),
        getGradientOptionsOrDefault('centerRight', '30%', '50%', 0.4, 0.5),
        getGradientOptionsOrDefault('bottomLeft', '70%', 'calc(33vh - 320%)', 0.6, 0.7),
        getGradientOptionsOrDefault('bottomCenter', '', 'calc(33vh - 300%)', 0.6, 0.7),
        getGradientOptionsOrDefault('bottomRight', '30%', 'calc(33vh - 400%)', 0.4, 0.5)
    ];

    const createRadialGradient = (gradient: GradientType) => {

        const {
            radius,
            offsetX,
            offsetY,
            centerColor,
            minOpacity,
            maxOpacity,
            backgroundColor
        } = gradient;

        return `radial-gradient(${radius}px circle at ${offsetX || 'center'} ${offsetY || ''}, rgba(${centerColor},${getRandomInteger(minOpacity || 0.3, maxOpacity || 0.3)}), ${backgroundColor})`;
    };

    return gradientOptions.map(option => createRadialGradient(option));
};
