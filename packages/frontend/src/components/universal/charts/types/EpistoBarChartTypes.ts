import { EpistoChartLegendType, EpistoChartSeriesOptionsType, EpistoChartTooltipType, EpistoChartXAxisType, EpistoChartYAxisType } from './EpistoChartCommonTypes';

export type EpistoBarChartDataType = number[][]

export type EpistoBarChartDatasetType = {
    name: string,
    data: EpistoBarChartDataType
}[]

export interface EpistoBarChartOptionsType {
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    xAxis?: EpistoChartXAxisType,
    yAxis?: EpistoChartYAxisType,
    seriesOptions: EpistoChartSeriesOptionsType
}
