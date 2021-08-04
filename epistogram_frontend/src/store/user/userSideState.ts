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
        courses: [{
            _id: "",
            name: "",
            category: "",
            group: "",
            teacherName: "",
            colorOne: "",
            colorTwo: "",
            items: [
                {
                    _id: "",
                    type: "",
                    title: "",
                    subTitle: "",
                    url: "",
                    length: 0,
                    description: "",
                    thumbnailUrl: "",
                    teacherName: "",
                    showAutomaticOverlay: false,
                    overlays: [{
                        _id: "",
                        type: 0,
                        question: "",
                        timecode: 0,
                        answers: [{
                            _id: "",
                            answer: ""
                        }],
                        validAnswer: ""
                    }],
                }
            ],
            thumbnailUrl: ""
        }],
        currentCourse: {
            _id: "",
            name: "",
            category: "",
            group: "",
            teacherName: "",
            colorOne: "",
            colorTwo: "",
            items: [
                {
                    _id: "",
                    type: "",
                    title: "",
                    subTitle: "",
                    url: "",
                    length: 0,
                    description: "",
                    thumbnailUrl: "",
                    teacherName: "",
                    showAutomaticOverlay: false,
                    overlays: [{
                        _id: "",
                        type: 0,
                        question: "",
                        timecode: 0,
                        answers: [{
                            _id: "",
                            answer: ""
                        }],
                        validAnswer: ""
                    }],
                }
            ],
            thumbnailUrl: ""
        },
        currentSeeSomethingNew: "",
        currentItem: {
            _id: "",
            type: "",
            title: "",
            subTitle: "",
            url: "",
            length: 0,
            description: "",
            thumbnailUrl: "",
            teacherName: "",
            showAutomaticOverlay: false,
            overlays: [{
                _id: "",
                type: 0,
                question: "",
                timecode: 0,
                answers: [{
                    _id: "",
                    answer: ""
                }],
                validAnswer: ""
            }],
        }, //Ennek már teljes egészében betölthetőnek kell lennie
        doneCourses: [{
            _id: "",
            name: "",
            category: "",
            group: "",
            teacherName: "",
            colorOne: "",
            colorTwo: "",
            items: [
                {
                    _id: "",
                    type: "",
                    title: "",
                    subTitle: "",
                    url: "",
                    length: 0,
                    description: "",
                    thumbnailUrl: "",
                    teacherName: "",
                    showAutomaticOverlay: false,
                    overlays: [{
                        _id: "",
                        type: 0,
                        question: "",
                        timecode: 0,
                        answers: [{
                            _id: "",
                            answer: ""
                        }],
                        validAnswer: ""
                    }],
                }
            ],
            thumbnailUrl: ""
        }],  //Object, ami tartalmazza a kurzus szükséges! adatait
        /*doneExams: exam,*/
        email: "",
        epistoCoins: 0,
        firstName: "",
        favoriteCourses: [{
            _id: "",
            name: "",
            category: "",
            group: "",
            teacherName: "",
            colorOne: "",
            colorTwo: "",
            items: [
                {
                    _id: "",
                    type: "",
                    title: "",
                    subTitle: "",
                    url: "",
                    length: 0,
                    description: "",
                    thumbnailUrl: "",
                    teacherName: "",
                    showAutomaticOverlay: false,
                    overlays: [{
                        _id: "",
                        type: 0,
                        question: "",
                        timecode: 0,
                        answers: [{
                            _id: "",
                            answer: ""
                        }],
                        validAnswer: ""
                    }],
                }
            ],
            thumbnailUrl: ""
        }], //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
        _id: "",
        innerRole: "",
        lastName: "",
        linkedInUrl: "",
        notes: [{
            title: "",
            data: ""
        }],
        phoneNumber: "",
        recommendedCourses: [{
            _id: "",
            name: "",
            category: "",
            group: "",
            teacherName: "",
            colorOne: "",
            colorTwo: "",
            items: [
                {
                    _id: "",
                    type: "",
                    title: "",
                    subTitle: "",
                    url: "",
                    length: 0,
                    description: "",
                    thumbnailUrl: "",
                    teacherName: "",
                    showAutomaticOverlay: false,
                    overlays: [{
                        _id: "",
                        type: 0,
                        question: "",
                        timecode: 0,
                        answers: [{
                            _id: "",
                            answer: ""
                        }],
                        validAnswer: ""
                    }],
                }
            ],
            thumbnailUrl: ""
        }],
        role: "",
        settings: {
            theme: "",
            accessabilityMode: false,
            lessDataTraffic: false,
            twoFactorAuth: false,
            allowedMachines: [],
            newRecommendedCourses: false,
            newCourses: false,
            examResult: false,
            news: false,
            newExamDone: false,
            newReportAvailable: false,
            helpRequest: false
        },
        tasks: [{
            name: "",
            addedBy: "",
            status: "",
            due: ""
        }],
        username: "",
        userDescription: "",
        watchedVideosCount: 0
    },

    vote: {
        active: false,
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
