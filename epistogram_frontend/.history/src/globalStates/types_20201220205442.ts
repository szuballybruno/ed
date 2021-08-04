//FELHASZNÁLÓ

export type userData = {
    allowedMachinesAtHome: string[],
    avatarUrl: string,
    badges: string,
    currentCourse: course,
    currentSeeSomethingNew: string,
    currentVideo: video, //Ennek már teljes egészében betölthetőnek kell lennie
    doneCourses: course[],
    doneCoursesCount: number,  //Object, ami tartalmazza a kurzus szükséges! adatait
    /*doneExams: exam,*/
    doneExamsCount: number,
    email: string,
    epistoCoins: number,
    firstName: string,
    favoriteCourses: course[], //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
    innerRole: string,
    lastName: string,
    linkedInUrl: string,
    phoneNumber: string,
    recommendedCourses: course[],
    role: string,
    username: string,
    userDescription: string
}

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

//VIDEÓ

export type overlayData = {
    overlayType: number,
    overlayQuestion: string,
    overlayTimecode: number,
    overlayAnswers: overlayDataAnswer[]
}

export type overlayDataAnswer = {
    answer: string,
    isTheAnswerTrue: boolean
}

export type video = {
    _id: string,
    videoMainTitle: string,
    videoSubTitle: string,
    videoUrl: string,
    videoLength: number,
    videoDescription: string,
    videoThumbnailUrl: string,
    overlayData: overlayData,
}

//KURZUS

export type course = {
    _id: string,
    name: string,
    category: string,
    group: string,
    creatorId: string,
    teacherId: string,
    supervisorId: string,
    organizationId: string
    teacherName: string,
    courseLength: number
    colorOne: string
    colorTwo: string
}






//SZAVAZÁS
export type vote = {
    responseText: string,
    _id: string,
    voteQuestion: string,
    voteFirstAnswerName: string,
    voteFirstAnswerPath: string,
    voteSecondAnswerName: string,
    voteSecondAnswerPath: string,
    voteAnswersCount: number,
    voteFirstAnswerCount: number,
    voteSecondAnswerCount: number
}