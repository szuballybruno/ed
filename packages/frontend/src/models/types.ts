import { Id } from '@episto/commontypes';
import { CompanyDTO } from '@episto/communication';
import { ReactNode } from 'react';
import { EpistoButtonPropsType } from '../components/controls/EpistoButton';
import { HasPermissionFnType } from '../components/system/AuthorizationContext';
import { Logger } from '../static/Logger';
import { trimEndChar } from '@episto/commonlogic';

export type LoadingStateType = 'idle' | 'loading' | 'error' | 'success';

export type StillWatchingDialogMarker = {
    showUpTimeSeconds: number;
    answerOptionIndex: number;
}

export class EpistoRoute {

    private _absolutePath: string;
    private _relativePath: string;
    private _matchMore: boolean;
    private _root: string;

    constructor(root: string, relativePath: string, matchMore?: '*') {

        this._absolutePath = trimEndChar(this.removeDuplicateBreak(root + '/' + relativePath), '/');
        this._root = root;
        this._relativePath = relativePath;
        this._matchMore = !!matchMore;
    }

    getAbsolutePath() {

        return this._absolutePath;
    }

    getRelativePath() {

        Logger.logScoped('ROUTING', 'REL_absolutePath: ' + this._absolutePath);
        Logger.logScoped('ROUTING', 'getRelativePath: ' + this.removeDuplicateBreak(this._relativePath + (this._matchMore ? '/*' : '')));
        return this.removeDuplicateBreak(this._relativePath + (this._matchMore ? '/*' : ''));
    }

    isExact() {

        return !this._matchMore;
    }

    private removeDuplicateBreak(path: string) {

        return path.replaceAll('//', '/');
    }
}

export type AdminActiveCompanyType = CompanyDTO | null;
export type AdminActiveCompanyIdType = Id<'Company'> | null;
export type AdminActiveCompanyRouteParamType = { activeCompanyId: AdminActiveCompanyIdType };

export type ApplicationRoute<TParams = void, TQuery = void> = {
    name?: string;
    title: string;
    route: EpistoRoute;
    featureCode?: string;
    fallbackRoute?: EpistoRoute;
    icon?: JSX.Element;
    navAction?: () => void;
    paramsType?: TParams;
    queryType?: TQuery;
    isUnauthorized?: boolean;
    isSurvey?: boolean;
    isAuthoirziedToVisit?: (hasPermission: HasPermissionFnType) => boolean
}

export type ButtonType<T = undefined> = {
    title: string,
    icon?: ReactNode,
    disabled?: boolean,
    action?: T extends undefined ? () => void : (params: T) => void,
    variant?: EpistoButtonPropsType['variant']
};

export type VolumeSettingsType = {
    volume: number;
    isMuted: boolean;
}