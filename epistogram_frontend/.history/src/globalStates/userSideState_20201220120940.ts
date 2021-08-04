import {createState, State} from "@hookstate/core";
import {UserSideStateIF} from "./UserSideStateIF";

const userSideState: State<UserSideStateIF> = createState<UserSideStateIF>({

    // Ez a szerverről betöltött userData, amely a megjelenítendő adatokért felelős.
    
    userData: {
        allowedMachinesAtHome: [
            ""
        ],
        avatarUrl: "",
        badges: "",
        currentCourse: {

        },
        currentSeeSomethingNew: "",
        currentVideo: {
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
        }, //Ennek már teljes egészében betölthetőnek kell lennie
        doneCourses: [{
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
        }],  //Object, ami tartalmazza a kurzus szükséges! adatait
        /*doneExams: exam,*/
        email: "",
        epistoCoins: {

        },
        firstName: "",
        favoriteCourses: [{
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
        }], //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
        innerRole: "",
        lastName: "",
        linkedInUrl: "",
        phoneNumber: "",
        recommendedCourses: [{
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
        role: "",
        username: "",
        userDescription: ""
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