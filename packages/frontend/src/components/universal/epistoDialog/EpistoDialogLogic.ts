import { useCallback, useState } from 'react';
import { useXDialogLogic } from '../../lib/XDialog/XDialogLogic';
import { EpistoDialogLogicType } from './EpistoDialogTypes';

export const useEpistoDialogLogic = <TParams = void,>(dialogKey: string | Function, onlyRenderIfOpen?: boolean): EpistoDialogLogicType<TParams> => {

    const [params, setParams] = useState<TParams | null>(null);
    const key = typeof dialogKey === 'function' ? dialogKey.name : dialogKey;
    const xlogic = useXDialogLogic(key, !!onlyRenderIfOpen);

    const openDialog = useCallback((params: TParams) => {

        setParams(params);
        xlogic.openDialog();
    }, [
        xlogic,
        setParams
    ]);

    return {
        openDialog,
        closeDialog: xlogic.closeDialog,
        isOpen: xlogic.isOpen,
        xlogic,
        params
    };
};