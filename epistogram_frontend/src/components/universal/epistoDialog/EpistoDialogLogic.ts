import { useCallback, useMemo, useState } from 'react';
import { ButtonType } from '../../../models/types';
import { useXDialogLogic } from '../../lib/XDialog/XDialog';
import { OpenDialogOptionsType, EpistoDialogLogicType, DeclareDialogOptionsType } from './EpistoDialogTypes';

export const useEpistoDialogLogic = <TParams = undefined,>(
    dialogKey: string | Function,
    declareOptions?: DeclareDialogOptionsType): EpistoDialogLogicType<TParams> => {

    const [title, setTitle] = useState(declareOptions?.title ?? '');
    const [description, setDescription] = useState(declareOptions?.description ?? '');
    const [params, setParams] = useState<TParams>({} as TParams);
    const xlogic = useXDialogLogic(typeof dialogKey === 'function' ? dialogKey.name : dialogKey);

    const closeDialog = useCallback(() => {

        xlogic.setIsOpen(false);
    }, [xlogic]);

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

        xlogic.setIsOpen(true);
    }, [
        xlogic.setIsOpen,
        setButtons,
        setTitle,
        setDescription,
        setParams
    ]);

    return useMemo(() => {
        return ({
            openDialog,
            closeDialog,
            isOpen: xlogic.isOpen,
            title,
            description,
            buttons,
            declareOptions,
            xlogic,
            params
        } as EpistoDialogLogicType<TParams>);
    }, [
        closeDialog,
        openDialog,
        xlogic
    ]);
};