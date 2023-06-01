import { EpistoChartLegendType, EpistoChartSeriesOptionsType, EpistoChartTooltipType, EpistoChartXAxisType, EpistoChartYAxisType } from '../EpistoChartCommonTypes';

export type EpistoBarChartDataType = number[][]

export type EpistoBarChartDatasetType = {
    name: string,
    color?: any,
    data: EpistoBarChartDataType
}[]

export interface EpistoBarChartOptionsType {
    backgroundColor: string,
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    xAxis?: EpistoChartXAxisType,
    yAxis?: EpistoChartYAxisType,
    seriesOptions: EpistoChartSeriesOptionsType
}
