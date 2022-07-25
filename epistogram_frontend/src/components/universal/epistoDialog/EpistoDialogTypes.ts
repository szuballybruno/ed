import { ButtonType } from '../../../models/types';
import { XDialogLogicType } from '../../lib/XDialog/XDialogLogic';

export type OpenDialogOptionsType<TParams = void> = {
    title?: string;
    description?: string;
    buttons?: ButtonType<EpistoDialogLogicType<TParams>>[];
    params?: TParams;
}

export type DeclareDialogOptionsType = {
    title?: string;
    description?: string;
}

export type EpistoDialogLogicType<TParams = void> = {
    isOpen: boolean;
    title: string;
    description: string;
    buttons: ButtonType<EpistoDialogLogicType<TParams>>[];
    closeDialog: () => void;
    xlogic: XDialogLogicType;
    params: TParams;
    declareOptions?: DeclareDialogOptionsType;
    openDialog: (opt?: OpenDialogOptionsType<TParams>) => void;
};