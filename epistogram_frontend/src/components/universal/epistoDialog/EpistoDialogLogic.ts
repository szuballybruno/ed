import { useCallback, useMemo, useState } from 'react';
import { ButtonType } from '../../../models/types';
import { useXDialogLogic } from '../../lib/XDialog/XDialog';
import { DialogOptions, EpistoDialogLogicType } from './EpistoDialogTypes';

export const useEpistoDialogLogic = <TParams = undefined,>(
    dialogKey: string | Function,
    dialogOptions?: DialogOptions<TParams>,
    deps?: any[]): EpistoDialogLogicType<TParams> => {

    const [title, setTitle] = useState(dialogOptions?.title ?? '');
    const [description, setDescription] = useState(dialogOptions?.description ?? '');
    const [params, setParams] = useState<TParams>(dialogOptions?.params ?? {} as any);
    const defaultCloseButtonType = dialogOptions?.defaultCloseButtonType ?? 'bottom';
    const xlogic = useXDialogLogic(typeof dialogKey === 'function' ? dialogKey.name : dialogKey);

    const closeDialog = useCallback(() => {

        xlogic.setIsOpen(false);
    }, [xlogic]);

    const defaultButtons: ButtonType<EpistoDialogLogicType<TParams>>[] = defaultCloseButtonType === 'bottom'
        ? [
            {
                title: 'Bezárás',
                action: (x: EpistoDialogLogicType<TParams>) => closeDialog()
            }
        ]
        : [];

    const [buttons, setButtons] = useState<ButtonType<EpistoDialogLogicType<TParams>>[]>(defaultButtons
        .concat(dialogOptions?.buttons ?? []));

    const openDialog = useCallback((opt?: DialogOptions<TParams>) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            if (opt.buttons)
                setButtons(defaultButtons.concat(opt.buttons ?? []));

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
            dialogOptions,
            xlogic,
            params
        } as EpistoDialogLogicType<TParams>);
    }, [
        closeDialog,
        openDialog,
        ...(deps ?? []),
        xlogic
    ]);
};