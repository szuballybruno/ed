export type EpistoLineChartDataType = number[] | number[][]

export type EpistoLineChartDatasetType = {
    name?: string,
    data: EpistoLineChartDataType
}[]

export type UserActivityDistributionChartData = {
    watchingVideosPercentage: number,
    completingExamsPercentage: number,
    answeringQuestionsPercentage: number,
    noActivityPercentage: number
};