import { EpistoChartSeriesOptionsType, EpistoChartLegendType, EpistoChartTooltipType } from "./EpistoChartCommonTypes";

export type EpistoRadarChartDataType = { value: number[], name: string }[]

export interface EpistoRadarChartSeriesOptionsType extends EpistoChartSeriesOptionsType {
    radius?: string | string[],
    emphasis?: {
        label?: {
            show?: boolean,
            fontSize?: string,
            fontWeight?: string
        }
    },
    roseType?: "radius",
    color: string[]


}

export interface EpistoRadarChartOptionsType {

    visualMap?: {
        show?: boolean,
        min?: number,
        max?: number,
        inRange?: {
            colorLightness?: number[]
        }
    },
    radar: any,
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    seriesOptions: EpistoRadarChartSeriesOptionsType
}