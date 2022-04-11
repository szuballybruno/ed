import { EpistoChartSeriesOptionsType, EpistoChartLegendType, EpistoChartTooltipType } from './EpistoChartCommonTypes';

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
    roseType?: 'radius',
    color: string[]


}

export type EpistoRadarChartRadarOptionsType = {
    scale: boolean,
    radius: string,
    splitNumber: number,
    splitLine: {
        lineStyle: {
            color: string
        }
    },
    splitArea: boolean,
    axisLabel: {
        overflow: string
    },
    axisLine: {
        lineStyle: {
            color: string
        }
    }
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
    radar: EpistoRadarChartRadarOptionsType,
    legend?: EpistoChartLegendType,
    tooltip?: EpistoChartTooltipType,
    seriesOptions: EpistoRadarChartSeriesOptionsType
}