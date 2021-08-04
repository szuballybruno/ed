import {createState, State} from "@hookstate/core";
import {ApplicationRunningStateInterface} from "./ApplicationRunningStateInterface";

const applicationRunningState: State<ApplicationRunningStateInterface> = createState<ApplicationRunningStateInterface>({
    modalState: false,
    currentSearchData: "",
    loadingIndicator: "null",
    selectedPage: 0,
    selectedCourseCategory: "",
    snack: {
        showSnack: false,
        snackTitle: "",
        showSnackButton: false,
        snackButtonTitle: "",
        snackButtonFunctionName: "",
        snackCloseFunctionName: ""
    },
    alert: {
        showAlert: false,
        targetLocation: "",
        alertTitle: "",
        alertDescription: "",
        showFirstButton: false,
        firstButtonTitle: "",
        showSecondButton: false,
        secondButtonTitle: ""
    },

    shouldViewOverlay: false,
    currentOverlayType: 0,

    activeVideoListItem: "",

    currentSeekSliderValue: 0,
    shouldPlayVideo: false,
    showPlayerOrExam: false,
    currentDescriptionComponent: "",

    isLoggedIn: false,
    currentEmail: "",
    currentPassword: "",

    signup: {
        questions: {
            title: "",
            questionAnswers: [{
                answerTitle: "",
                answerValue: ""
            }],
            variant: "",
            imageUrl: "",
        },

        errorText: "",
        token: "",
        phoneNumber: "",
        passwordOne: "",
        passwordTwo: ""
    },

    showWarningPopup: false,
    selectedAdminPage: "",

    articles: [{
        articleCoverImage: "",
        articleDescription: "",
        articleTitle: "",
        articleUrl: "",
        paid: false
    }],

    currentNote: {
        title: "",
        data: ""
    }
});

export default applicationRunningState
