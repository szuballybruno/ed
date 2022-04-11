import { EpistoChartLegendType, EpistoChartTooltipType, EpistoChartXAxisType, EpistoChartYAxisType, EpistoChartSeriesOptionsType } from './EpistoChartCommonTypes';

export type EpistoLineChartDataType = number[] | number[][]

export type EpistoLineChartDatasetType = {
    name?: string,
    data: EpistoLineChartDataType
}[]

export interface EpistoLineChartSeriesOptionsType extends EpistoChartSeriesOptionsType {
    showSymbol?: boolean,
    symbol?: string,
    symbolSize?: number,
    lineStyle?: {
        width?: number,
        shadowColor?: string,
        shadowOffsetX?: number,
        shadowOffsetY?: number,
        shadowBlur?: number
    }
}

export interface EpistoLineChartOptionsType {
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    xAxis?: EpistoChartXAxisType,
    yAxis?: EpistoChartYAxisType,
    seriesOptions: EpistoLineChartSeriesOptionsType
}