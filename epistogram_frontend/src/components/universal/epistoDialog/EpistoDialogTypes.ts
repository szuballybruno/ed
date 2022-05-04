import { ButtonType } from '../../../models/types';
import { XDialogLogicType } from '../../lib/XDialog/XDialog';

export type DialogOptions<TParams> = {
    title?: string;
    description?: string;
    buttons?: ButtonType<EpistoDialogLogicType<TParams>>[];
    defaultCloseButtonType?: 'none' | 'bottom' | 'top';
    params?: TParams;
}

export type EpistoDialogLogicType<TParams = undefined> = {
    isOpen: boolean;
    title: string;
    description: string;
    buttons: any;
    dialogOptions: any;
    openDialog: (opt?: DialogOptions<TParams>) => void;
    closeDialog: any;
    xlogic: XDialogLogicType;
    params: TParams;
};