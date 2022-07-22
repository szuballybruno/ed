import { useCallback, useState } from 'react';
import { ButtonType } from '../../../models/types';
import { useXDialogLogic } from '../../lib/XDialog/XDialog';
import { DeclareDialogOptionsType, EpistoDialogLogicType, OpenDialogOptionsType } from './EpistoDialogTypes';

export const useEpistoDialogLogic = <TParams = void,>(
    dialogKey: string | Function,
    declareOptions?: DeclareDialogOptionsType): EpistoDialogLogicType<TParams> => {

    const [title, setTitle] = useState(declareOptions?.title ?? '');
    const [description, setDescription] = useState(declareOptions?.description ?? '');
    const [params, setParams] = useState<TParams>({} as TParams);
    const xlogic = useXDialogLogic(typeof dialogKey === 'function' ? dialogKey.name : dialogKey);

    const [buttons, setButtons] = useState<ButtonType<EpistoDialogLogicType<TParams>>[]>([]);

    const openDialog = useCallback((opt?: OpenDialogOptionsType<TParams>) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            if (opt.buttons)
                setButtons(opt.buttons ?? []);

            if (opt.params)
                setParams(opt.params);
        }

        xlogic.openDialog();
    }, [
        xlogic.openDialog,
        setButtons,
        setTitle,
        setDescription,
        setParams
    ]);

    return {
        openDialog,
        closeDialog: xlogic.closeDialog,
        isOpen: xlogic.isOpen,
        title,
        description,
        buttons,
        declareOptions,
        xlogic,
        params
    };
};