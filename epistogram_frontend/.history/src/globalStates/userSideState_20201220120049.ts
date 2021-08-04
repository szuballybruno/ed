import {createState, State} from "@hookstate/core";
import {UserSideStateIF} from "./UserSideStateIF";

const userSideState: State<UserSideStateIF> = createState<UserSideStateIF>({

    // Ez a szerverről betöltött userData, amely a megjelenítendő adatokért felelős.
    
    userData: {
        allowedMachinesAtHome: string[],
        avatarUrl: string,
        badges: string,
        currentCourse: course,
        currentSeeSomethingNew: string,
        currentVideo: video, //Ennek már teljes egészében betölthetőnek kell lennie
        doneCourses: course,  //Object, ami tartalmazza a kurzus szükséges! adatait
        /*doneExams: exam,*/
        email: string,
        epistoCoins: number,
        firstName: string,
        favoriteCourses: course, //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
        innerRole: string,
        lastName: string,
        linkedInUrl: string,
        phoneNumber: string,
        recommendedCourses: course,
        role: string,
        username: string,
        userDescription: string
    }

    video: {
        _id: "",
        videoMainTitle: "",
        videoSubTitle: "",
        videoUrl: "",
        videoLength: 0,
        videoDescription: "",
        videoThumbnailUrl: "",
        overlayData: {
            overlayType: 0,
            overlayQuestion: "",
            overlayTimecode: 0,
            overlayAnswers: [{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            }]
        }
    },

    videos: [{
        _id: "",
        videoMainTitle: "",
        videoSubTitle: "",
        videoUrl: "",
        videoLength: 0,
        videoDescription: "",
        videoThumbnailUrl: "",
        overlayData: {
            overlayType: 0,
            overlayQuestion: "",
            overlayTimecode: 0,
            overlayAnswers: [{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            },{
                answer: "",
                isTheAnswerTrue: false
            }]
        }
    }],

    //Ez felelős a tanfolyamkeresőben megjelenő kurzusokért

    course: {
        _id: "",
        name: "",
        category: "",
        group: "",
        creatorId: "",
        teacherId: "",
        supervisorId: "",
        organizationId: "",
        teacherName: "",
        courseLength: 0,
        colorOne: "",
        colorTwo: "",
    },

    courses: [{
        _id: "",
        name: "",
        category: "",
        group: "",
        creatorId: "",
        teacherId: "",
        supervisorId: "",
        organizationId: "",
        teacherName: "",
        courseLength: 0,
        colorOne: "",
        colorTwo: "",
    }],

    vote: {
        responseText: "",
        _id: "",
        voteQuestion: "",
        voteFirstAnswerName: "",
        voteFirstAnswerPath: "",
        voteSecondAnswerName: "",
        voteSecondAnswerPath: "",
        voteAnswersCount: 0,
        voteFirstAnswerCount: 0,
        voteSecondAnswerCount: 0
    }
})

export default userSideState