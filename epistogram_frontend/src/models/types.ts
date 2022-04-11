import { ReactNode } from 'react';

export type LoadingStateType = 'idle' | 'loading' | 'error' | 'success';

export type StillWatchingDialogMarker = {
    showUpTimeSeconds: number;
    answerOptionIndex: number;
}

export class EpistoRoute {

    private _absolutePath: string;
    private _relativePath: string;
    private _matchMore: boolean;

    constructor(root: string, relativePath: string, matchMore?: '*') {

        this._absolutePath = this.removeDuplicateBreak(root + '/' + relativePath);
        this._relativePath = relativePath;
        this._matchMore = !!matchMore;
    }

    getAbsolutePath() {

        return this._absolutePath;
    }

    getRelativePath() {

        return this.removeDuplicateBreak(this._relativePath + (this._matchMore ? '/*' : ''));
    }

    private removeDuplicateBreak(path: string) {

        return path.replaceAll('//', '/');
    }
}

export type ApplicationRoute = {
    title: string;
    route: EpistoRoute;
    icon?: JSX.Element;
    navAction?: () => void;
}

export type DialogOptions<TParams> = {
    title?: string;
    description?: string;
    buttons?: ButtonType[];
    defaultCloseButtonType?: 'none' | 'bottom' | 'top';
    params?: TParams;
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