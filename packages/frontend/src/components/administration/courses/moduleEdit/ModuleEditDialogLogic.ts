import { useCallback, useEffect } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { ModuleEditDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';

export const useModuleEditDialogLogic = ({
    modules,
    canDelete
}: {
    modules: ModuleEditDTO[],
    canDelete: (moduleVersionId: Id<'ModuleVersion'>) => boolean,
}) => {

    const dialogLogic = useEpistoDialogLogic(useModuleEditDialogLogic.name, true);

    // mut
    const [{ mutatedItems, mutations, isAnyItemsMutated }, mutatorFunctions] = useXMutatorNew(ModuleEditDTO, 'moduleVersionId', useModuleEditDialogLogic.name);

    /**
     * Set default items on modules change
     */
    useEffect(() => {

        if (!modules)
            return;

        mutatorFunctions
            .setOriginalItems(modules);
    }, [modules, mutatorFunctions]);

    /**
     * Handle create new module 
     */
    const handleCreateModule = useCallback(() => {

        const moduleVersionId = Id
            .create<'ModuleVersion'>(getVirtualId());

        const moduleId = Id
            .create<'Module'>(getVirtualId());

        mutatorFunctions
            .create(moduleVersionId, {
                name: '',
                description: '',
                imageFilePath: '',
                moduleVersionId,
                moduleId,
                isPretestModule: false,
                orderIndex: mutatorFunctions
                    .getMutatedItems()
                    .length
            });
    }, [mutatorFunctions]);

    // handle ok
    const handleOk = useCallback(() => {

        dialogLogic.closeDialog();
    }, [dialogLogic]);

    return {
        handleOk,
        handleCreateModule,
        canDelete,
        mutatorFunctions,
        dialogLogic,
        mutatedItems,
        mutations,
        isAnyItemsMutated
    };
};

export type ModuleEditDialogLogicType = ReturnType<typeof useModuleEditDialogLogic>;