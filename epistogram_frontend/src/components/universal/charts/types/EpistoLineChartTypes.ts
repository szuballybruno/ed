import { EpistoChartLegendType, EpistoChartTooltipType, EpistoChartXAxisType, EpistoChartYAxisType, EpistoChartSeriesOptionsType } from './EpistoChartCommonTypes';

export type EpistoLineChartDataType = number[][]

export type EpistoLineChartDatasetType = {
    name?: string,
    data: EpistoLineChartDataType
}[]

export interface EpistoLineChartSeriesOptionsType extends EpistoChartSeriesOptionsType {
    showSymbol?: boolean
}

export interface EpistoLineChartOptionsType {
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    xAxis?: EpistoChartXAxisType,
    yAxis?: EpistoChartYAxisType,
    seriesOptions: EpistoLineChartSeriesOptionsType
}