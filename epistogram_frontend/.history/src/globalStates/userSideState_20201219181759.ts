import {createState, State} from "@hookstate/core";
import {UserSideStateIF} from "./UserSideStateIF";

const userSideState: State<UserSideStateIF> = createState<UserSideStateIF>({

    // Ez a szerverről betöltött userData, amely a megjelenítendő adatokért felelős.
    user: {
        _id: "",
        userData: {
            timeOfAdd: 0,
            role: "",
            innerRole: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            supervisorId: "",
            currentVideoId: "",
            currentCourseId: "",
        }
    },

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