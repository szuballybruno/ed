import {course} from "./course";
import {item} from "./item";


export type userData = {
    allowedMachinesAtHome: string[],
    avatarUrl: string,
    badges: string,
    courses: course[],
    currentCourse: course,
    currentSeeSomethingNew: string,
    currentItem: item, //Ennek már teljes egészében betölthetőnek kell lennie
    doneCourses: course[],
    //doneCoursesCount: number,  //Object, ami tartalmazza a kurzus szükséges! adatait
    /*doneExams: exam,*/
    //doneExamsCount: number,
    // doneTestsCount: number,
    email: string,
    epistoCoins: number,
    firstName: string,
    favoriteCourses: course[], //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
    _id: string,
    innerRole: string,
    lastName: string,
    linkedInUrl: string,
    notes: {
        title: string,
        data: string
    }[],
    phoneNumber: string,
    recommendedCourses: course[],
    role: string,
    settings: {
        theme: string,
        accessabilityMode: boolean,
        lessDataTraffic: boolean,
        twoFactorAuth: boolean,
        allowedMachines: string[]
        newRecommendedCourses: boolean
        newCourses: boolean
        examResult: boolean
        news: boolean
        newExamDone: boolean
        newReportAvailable: boolean
        helpRequest: boolean
    },
    tasks: {
        name: string,
        addedBy: string,
        status: string,
        due: string
    }[],
    username: string,
    userDescription: string,
    watchedVideosCount: number
}
