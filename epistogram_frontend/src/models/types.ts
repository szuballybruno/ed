import { ReactNode } from "react";

export type LoadingStateType = "idle" | "loading" | "error" | "success";

export type StillWatchingDialogMarker = {
    showUpTimeSeconds: number;
    answerOptionIndex: number;
}

export type ApplicationRoute = {
    title: string;
    route: string;
    icon?: any;
    exact?: boolean;
}

export type DialogOptions = {
    title?: string,
    description?: string,
    buttons?: ButtonType[]
}

export type ButtonType = {
    title: string,
    icon?: ReactNode,
    action: () => void
}