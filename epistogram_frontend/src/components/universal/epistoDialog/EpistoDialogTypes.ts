import { ButtonType } from '../../../models/types';
import { XDialogLogicType } from '../../lib/XDialog/XDialog';

export type OpenDialogOptionsType<TParams> = {
    title?: string;
    description?: string;
    buttons?: ButtonType<EpistoDialogLogicType<TParams>>[];
    defaultCloseButtonType?: 'none' | 'bottom' | 'top';
    params?: TParams;
}

export type DeclareDialogOptionsType = {
    title?: string;
    description?: string;
    defaultCloseButtonType?: 'none' | 'bottom' | 'top';
}

export type EpistoDialogLogicType<TParams = undefined> = {
    isOpen: boolean;
    title: string;
    description: string;
    buttons: any;
    dialogOptions: any;
    openDialog: (opt?: OpenDialogOptionsType<TParams>) => void;
    closeDialog: any;
    xlogic: XDialogLogicType;
    params: TParams;
};