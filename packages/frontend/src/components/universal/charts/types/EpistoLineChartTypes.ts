import { EpistoChartLegendType, EpistoChartTooltipType, EpistoChartXAxisType, EpistoChartYAxisType, EpistoChartSeriesOptionsType } from './EpistoChartCommonTypes';

export interface EpistoLineChartSeriesOptionsType extends EpistoChartSeriesOptionsType {
    showSymbol?: boolean,
    symbol?: string,
    type?: string;
    symbolSize?: number,
    lineStyle?: {
        color?: string,
        type?: string,
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