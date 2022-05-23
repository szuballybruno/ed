import { ButtonType } from '../../../models/types';
import { XDialogLogicType } from '../../lib/XDialog/XDialog';

export type OpenDialogOptionsType<TParams> = {
    title?: string;
    description?: string;
    buttons?: ButtonType<EpistoDialogLogicType<TParams>>[];
    params?: TParams;
}

export type DeclareDialogOptionsType = {
    title?: string;
    description?: string;
}

export type EpistoDialogLogicType<TParams = undefined> = {
    isOpen: boolean;
    title: string;
    description: string;
    buttons: ButtonType<EpistoDialogLogicType<TParams>>[];
    declareOptions: DeclareDialogOptionsType;
    openDialog: (opt?: OpenDialogOptionsType<TParams>) => void;
    closeDialog: any;
    xlogic: XDialogLogicType;
    params: TParams;
};