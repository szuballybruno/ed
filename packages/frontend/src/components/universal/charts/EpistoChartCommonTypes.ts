
export type EpistoChartXAxisDataType = string[]

export type EpistoChartTooltipType = {
    trigger?: string,
    formatter?: (params: any) => string | string
}

export type EpistoChartXAxisType = {
    nameLocation?: string,
    nameGap?: number,
    nameTextStyle?: {
        fontWeight?: number
    },
    boundaryGap?: boolean,
    type?: string,
    axisLabel?: {
        show?: boolean,
        interval?: any;
        rotate?: number,
        showMaxLabel?: boolean;
        margin?: number,
        formatter?: (params: any) => string | string
    },
    axisLine?: {
        show: boolean
    },
    axisTick?: {
        alignWithLabel?: boolean
    }
}

export type EpistoChartYAxisType = {
    name?: string;
    nameLocation?: string,
    nameGap?: number,
    nameTextStyle?: {
        fontWeight: number
    },
    type?: string,
    max?: number
}

export interface EpistoChartSeriesOptionsType {
    name?: string,
    type?: string,
    symbolSize?: number,
    lineStyle?: {
        width?: number,
        shadowOffsetY?: number,
        shadowOffsetX?: number
    },
    areaStyle?: {
        opacity?: number,
        shadowBlur?: number,
        shadowOffsetY?: number,
        shadowOffsetX?: number,
        shadowColor?: string
    },
    top?: number,
    avoidLabelOverlap?: boolean,
    itemStyle?: {
        shadowColor?: string,
        shadowOffsetX?: number,
        shadowOffsetY?: number,
        shadowBlur?: number,
        borderRadius?: number,
        borderColor?: string,
        borderWidth?: number
    },
    label?: {
        color?: string,
        show?: boolean,
        formatter?: string;
        position?: string,
        emphasis?: {
            show?: true
        }
    },
    labelLine?: {
        show?: boolean,
        smooth?: number
    },
    color?: string[]
}

export interface EpistoChartLegendType {
    orient?: string,
    icon?: string,
    itemHeight?: number,
    top?: number | string,
    left?: number | string,
    show?: any;
    textStyle?: {
        fontWeight: number,
        color: string
    }
}