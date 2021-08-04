import {
    course,
    vote, 
    video,
    userData,
    userStatistics
} from "./types";


export interface UserSideStateIF {
    // Minden userrel kapcsolatos adat, amire a UI-ban szükség lehet
    userData: userData
    userStatistics: userStatistics

    //A jelenlegi, illetve a betöltött videók
    video: video
    videos: video[]

    // A tanfolyamkeresőbe betöltött kurzusok, illetve az aktuálisan kiválasztott kurzus videói
    course: course
    courses: course[]

    // A jelenlegi szavazás adatai
    vote: vote
}