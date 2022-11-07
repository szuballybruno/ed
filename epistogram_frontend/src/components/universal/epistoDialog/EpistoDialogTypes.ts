import { XDialogLogicType } from '../../lib/XDialog/XDialogLogic';

export type EpistoDialogLogicType<TParams = void> = {
    isOpen: boolean;
    xlogic: XDialogLogicType;
    params: TParams | null;
    closeDialog: () => void;
    openDialog: (params: TParams) => void;
};