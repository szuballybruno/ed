import { useCallback, useEffect, useState } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { useXMutator } from '../../../lib/XMutator/XMutatorReact';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';

export const useModuleEditDialogLogic = ({
    modules,
    canDelete
}: {
    modules: ModuleEditDTO[],
    canDelete: (moduleVersionId: number) => boolean,
}) => {

    const dialogLogic = useEpistoDialogLogic('module_edit_dialog');

    // state
    const [editedModuleId, setEditedModuleId] = useState<number | null>(null);

    // mut
    const mutatorRef = useXMutator(ModuleEditDTO, 'versionId');

    // calc 
    const currentModule = mutatorRef
        .current
        .mutatedItems
        .firstOrNull(x => x.versionId === editedModuleId);

    // set default items
    useEffect(() => {

        if (!modules)
            return;

        mutatorRef
            .current
            .setOriginalItems(modules);
    }, [modules]);

    // Go to edit page
    const handleEditModule = useCallback((moduleId: number) => {

        setEditedModuleId(moduleId);
    }, []);

    // back to list
    const handleBackToList = useCallback(() => {

        setEditedModuleId(null);
    }, []);

    // Create new module
    const createModule = useCallback(() => {

        const moduleVersionId = getVirtualId();

        mutatorRef
            .current
            .create(moduleVersionId, {
                name: '',
                description: '',
                imageFilePath: '',
                versionId: moduleVersionId,
                orderIndex: mutatorRef
                    .current
                    .mutatedItems
                    .length 
            });
    }, []);

    // handle save
    const handleOk = useCallback(() => {

        dialogLogic.closeDialog();
        // onModulesChanged(mutatorRef.current.mutatedItems, mutatorRef.current.mutations);
    }, [dialogLogic.closeDialog]);

    return {
        mutatorRef,
        handleOk,
        handleEditModule,
        handleBackToList,
        createModule,
        currentModule,
        dialogLogic,
        canDelete
    };
};

export type ModuleEditDialogLogicType = ReturnType<typeof useModuleEditDialogLogic>;