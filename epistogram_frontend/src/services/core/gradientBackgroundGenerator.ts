import { getRandomInteger } from "../../static/frontendHelpers";

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
 * Generates a 3x3 full screen background gradient from the given colors. Alpha values generated automatically for the main color.
 * Without options, the default blue windows 11-like background is generated.
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

export const gradientBackgroundGenerator = (options?: GridGradientOptions) => {

    const defaultRadius = 1000;
    const defaultCenterColor = "0,100,255";
    const defaultBackgroundColor = "rgba(0, 100, 255, 0.1)";

    {/* Default gradient options */ }
    const gradientOptions: GradientType[] = [

        {
            radius: options?.topLeft?.radius ?? defaultRadius,
            backgroundColor: options?.topLeft?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.topLeft?.centerColor ?? defaultCenterColor,
            offsetX: options?.topLeft?.offsetX ?? "70%",
            offsetY: options?.topLeft?.offsetY ?? "400%",
            minOpacity: options?.topLeft?.minOpacity ?? 0.4,
            maxOpacity: options?.topLeft?.maxOpacity ?? 0.7
        }, {
            radius: options?.topCenter?.radius ?? defaultRadius,
            backgroundColor: options?.topCenter?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.topCenter?.centerColor ?? defaultCenterColor,
            offsetX: options?.topCenter?.offsetX ?? undefined,
            offsetY: options?.topCenter?.offsetY ?? "320%",
            minOpacity: options?.topCenter?.minOpacity ?? 0.5,
            maxOpacity: options?.topCenter?.maxOpacity ?? 0.6
        }, {
            radius: options?.topRight?.radius ?? defaultRadius,
            backgroundColor: options?.topRight?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.topRight?.centerColor ?? defaultCenterColor,
            offsetX: options?.topRight?.offsetX ?? "30%",
            offsetY: options?.topRight?.offsetY ?? "400%",
            minOpacity: options?.topRight?.minOpacity ?? 0.4,
            maxOpacity: options?.topRight?.maxOpacity ?? 0.7
        },


        {
            radius: options?.centerLeft?.radius ?? defaultRadius,
            backgroundColor: options?.centerLeft?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.centerLeft?.centerColor ?? defaultCenterColor,
            offsetX: options?.centerLeft?.offsetX ?? "70%",
            offsetY: options?.centerLeft?.offsetY ?? "50%",
            minOpacity: options?.centerLeft?.minOpacity ?? 0.3,
            maxOpacity: options?.centerLeft?.maxOpacity ?? 0.4
        }, {
            radius: options?.centerCenter?.radius ?? defaultRadius,
            backgroundColor: options?.centerCenter?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.centerCenter?.centerColor ?? defaultCenterColor,
            offsetX: options?.centerCenter?.offsetX ?? undefined,
            offsetY: options?.centerCenter?.offsetY ?? undefined,
            minOpacity: options?.centerCenter?.minOpacity ?? 0.5,
            maxOpacity: options?.centerCenter?.maxOpacity ?? 0.6
        }, {
            radius: options?.centerRight?.radius ?? defaultRadius,
            backgroundColor: options?.centerRight?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.centerRight?.centerColor ?? defaultCenterColor,
            offsetX: options?.centerRight?.offsetX ?? "30%",
            offsetY: options?.centerRight?.offsetY ?? "50%",
            minOpacity: options?.centerRight?.minOpacity ?? 0.4,
            maxOpacity: options?.centerRight?.maxOpacity ?? 0.5
        },


        {
            radius: options?.bottomLeft?.radius ?? defaultRadius,
            backgroundColor: options?.bottomLeft?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.bottomLeft?.centerColor ?? defaultCenterColor,
            offsetX: options?.bottomLeft?.offsetX ?? "70%",
            offsetY: options?.bottomLeft?.offsetY ?? "calc(33vh - 320%)",
            minOpacity: options?.bottomLeft?.minOpacity ?? 0.6,
            maxOpacity: options?.bottomLeft?.maxOpacity ?? 0.7
        }, {
            radius: options?.bottomCenter?.radius ?? defaultRadius,
            backgroundColor: options?.bottomCenter?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.bottomCenter?.centerColor ?? defaultCenterColor,
            offsetX: options?.bottomCenter?.offsetX ?? undefined,
            offsetY: options?.bottomCenter?.offsetY ?? "calc(33vh - 300%)",
            minOpacity: options?.bottomCenter?.minOpacity ?? 0.6,
            maxOpacity: options?.bottomCenter?.maxOpacity ?? 0.7
        }, {
            radius: options?.bottomRight?.radius ?? defaultRadius,
            backgroundColor: options?.bottomRight?.backgroundColor ?? defaultBackgroundColor,
            centerColor: options?.bottomRight?.centerColor ?? defaultCenterColor,
            offsetX: options?.bottomRight?.offsetX ?? "30%",
            offsetY: options?.bottomRight?.offsetY ?? "calc(33vh - 400%)",
            minOpacity: options?.bottomRight?.minOpacity ?? 0.4,
            maxOpacity: options?.bottomRight?.maxOpacity ?? 0.5
        }
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

        return `radial-gradient(${radius}px circle at ${offsetX || "center"} ${offsetY || ""}, rgba(${centerColor},${getRandomInteger(minOpacity || 0.3, maxOpacity || 0.3)}), ${backgroundColor})`;
    };

    return gradientOptions.map(option => createRadialGradient(option));
};
