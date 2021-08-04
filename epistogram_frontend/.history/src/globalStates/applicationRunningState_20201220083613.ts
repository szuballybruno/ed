import {createState, State} from "@hookstate/core";
import {ApplicationRunningStateInterface} from "./ApplicationRunningStateInterface";

const applicationRunningState: State<ApplicationRunningStateInterface> = createState<ApplicationRunningStateInterface>({
    modalState: false,
    currentSearchData: "",
    loadingIndicator: "null",

    shouldViewOverlay: false,
    currentOverlayType: 0,

    currentSeekSliderValue: 0,
    shouldPlayVideo: false,
    showPlayerOrExam: false,
    currentDescriptionComponent: "",

    isLoggedIn: false,
    currentEmail: "",
    currentPassword: "",

    username: "",
    token: "",
    errorText: "",
    passwordOne: "",
    passwordTwo: "",

    showWarningPopup: false,
});

export default applicationRunningState