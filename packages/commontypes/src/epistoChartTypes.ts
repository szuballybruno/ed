export type EpistoLineChartDataType = number[] | number[][] | (number | null)[]

export type EpistoLineChartDatasetType = {
    name: string,
    data: EpistoLineChartDataType,
    lineStyle?: {
        color?: string,
        type?: string
    }
}[]

export type UserActivityDistributionChartData = {
    watchingVideosPercentage: number,
    completingExamsPercentage: number,
    answeringQuestionsPercentage: number,
    noActivityPercentage: number
};