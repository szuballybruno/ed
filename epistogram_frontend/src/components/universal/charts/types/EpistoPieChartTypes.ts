import { EpistoChartSeriesOptionsType, EpistoChartLegendType, EpistoChartTooltipType } from "./EpistoChartCommonTypes";

export type EpistoPieChartDataType = { value: number, name: string }[]

export interface EpistoPieChartSeriesOptionsType extends EpistoChartSeriesOptionsType {
    radius?: string | string[],
    emphasis?: {
        label?: {
            show?: boolean,
            fontSize?: string,
            fontWeight?: string
        }
    },
    roseType?: "radius"


}

export interface EpistoPieChartOptionsType {

    visualMap?: {
        show?: boolean,
        min?: number,
        max?: number,
        inRange?: {
            colorLightness?: number[]
        }
    },
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    seriesOptions: EpistoPieChartSeriesOptionsType
}