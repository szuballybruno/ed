import { useCallback, useEffect, useState } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { Id } from '../../../../shared/types/versionId';
import { usePaging } from '../../../../static/frontendHelpers';
import { useXMutator } from '../../../lib/XMutator/XMutatorReact';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';

export const useModuleEditDialogLogic = ({
    modules,
    canDelete
}: {
    modules: ModuleEditDTO[],
    canDelete: (moduleVersionId: Id<'ModuleVersion'>) => boolean,
}) => {

    const dialogLogic = useEpistoDialogLogic('module_edit_dialog');

    // state
    const [editedModuleId, setEditedModuleId] = useState<Id<'ModuleVersion'> | null>(null);

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

    // paging
    const paging = usePaging<number>([1, 2]);

    // Go to edit page
    const handleEditModule = useCallback((moduleId: Id<'ModuleVersion'>) => {

        setEditedModuleId(moduleId);
        paging.next();
    }, []);

    // Create new module
    const createModule = useCallback(() => {

        const moduleVersionId = Id
            .create<'ModuleVersion'>(getVirtualId());

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
        createModule,
        currentModule,
        dialogLogic,
        currentPageIndex: paging.currentIndex,
        canDelete
    };
};

export type ModuleEditDialogLogicType = ReturnType<typeof useModuleEditDialogLogic>;