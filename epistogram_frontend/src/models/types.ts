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