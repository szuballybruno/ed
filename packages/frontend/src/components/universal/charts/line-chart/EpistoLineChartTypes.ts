import { EChartsOption } from 'echarts-for-react';

export type EpistoLineChartOptionsType = EChartsOption;

export type EpistoLineChartDataType = number[] | number[][] | (number | null)[]

export type EpistoLineChartDatasetType = {
    name: string,
    data: EpistoLineChartDataType,
    lineStyle?: {
        color?: string,
        type?: string
    }
}[]

export type SeriesProps = {
    data: number;
    axisValue: string;
}