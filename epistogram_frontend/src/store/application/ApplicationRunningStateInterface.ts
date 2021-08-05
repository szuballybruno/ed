import {config} from "../../configuration/config";

export interface ApplicationRunningStateInterface {
    //GLOBAL
    modalState: boolean,
    currentSearchData: string,
    loadingIndicator: "null" | "loading" | "failed" | "succeeded",
    hamburgerButtonState?: boolean,
    selectedPage: number
    selectedCourseCategory: string
    snack: {
        showSnack: boolean,
        snackTitle: string,
        showSnackButton: boolean,
        snackButtonTitle: string,
        snackButtonFunctionName: string,
        snackCloseFunctionName: string
    },
    alert: {
        showAlert: boolean,
        targetLocation: string,
        alertTitle: string,
        alertDescription: string,
        showFirstButton: boolean,
        firstButtonTitle: string,
        showSecondButton: boolean,
        secondButtonTitle: string
    },

    //NMI
    shouldViewOverlay: boolean
    currentOverlayType: number

    //VIDEO PLAYER
    activeVideoListItem: string
    currentSeekSliderValue: number,
    shouldPlayVideo: boolean,
    showPlayerOrExam: boolean
    currentDescriptionComponent: string,

    //LOGIN
    isLoggedIn: boolean,
    currentEmail: string,
    currentPassword: string,

    //REGISTER
    signup: {
        questions: {
            title: string,
            questionAnswers: [{
                answerTitle: string,
                answerValue: string
            }],
            variant: string,
            imageUrl: string,
        }

        errorText: string,
        token: string,
        phoneNumber: string,
        passwordOne: string,
        passwordTwo: string
    }


    //ADMIN
    showWarningPopup: boolean
    selectedAdminPage: string

    //ARTICLES
    articles: [{
        articleCoverImage: string,
        articleDescription: string,
        articleTitle: string,
        articleUrl: string,
        paid: boolean
    }]

    currentNote: {
        title: string,
        data: string
    }
}
