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
    navAction?: () => void;
}

export type DialogOptions = {
    title?: string;
    description?: string;
    buttons?: ButtonType[];
    defaultCloseButtonType?: "none" | "bottom" | "top";
}

export type ButtonType = {
    title: string,
    icon?: ReactNode,
    action: () => void,
    disabled?: boolean
}

export type VolumeSettingsType = {
    volume: number;
    isMuted: boolean;
}