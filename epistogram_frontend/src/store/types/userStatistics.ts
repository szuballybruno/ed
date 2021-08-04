export type userStatistics = {
    pageName: string,
    pageViewStartDate: number,
    pageViewEndDate: number,
    pageViewLengthInMinutes: number,
    sessionStartDate: number,
    sessionEndDate: number,
    sessionLengthInMinutes: number,
    timeOfVideoWatchStart: number,
    watchedVideoId: string,
    watchTimeInMinutes: number,
    videoPauseTimes: number,
    overlayId?: string,
    isOverlayDone?: boolean,
    isOverlayAnswerTrue?: boolean,
    voteId: string,
    voteValue: string,
    timeOfVote: number
}
