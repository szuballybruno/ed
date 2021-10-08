export type LoadingStateType = "idle" | "loading" | "error" | "success";

export type StillWatchingDialogMarker = {
    showUpTimeSeconds: number;
    answerOptionIndex: number;
}

export type RouteItemType = {
    title: string;
    route: string;
    icon?: any;
    isExact?: boolean;
}

export type DialogOptions = {
    title: string,
    description?: string,
    firstButtonTitle?: string,
    firstButtonAction?: () => void,
    secondButtonTitle?: string,
    secondButtonAction?: () => void
}