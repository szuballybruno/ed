
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
        rotate?: number,
        margin?: number,
        formatter?: (params: any) => string | string
    },
    axisLine?: {
        show: boolean
    }
}

export type EpistoChartYAxisType = {
    nameLocation?: string,
    nameGap?: number,
    nameTextStyle?: {
        fontWeight: number
    },
    type?: string
}

export interface EpistoChartSeriesOptionsType {
    name?: string,
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
        position?: string
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
    textStyle?: {
        fontWeight: number,
        color: string
    }
}