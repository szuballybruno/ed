import { Add } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { ModuleApiService } from '../../../../services/api/moduleApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { usePaging } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { useXMutator } from '../../../lib/XMutator/XMutatorReact';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { ModuleEditDialogPage } from './ModuleEditDialogPage';
import { ModuleListEditDialogPage } from './ModuleListEditDialogPage';

export const ModuleEditDialog = ({
    logic,
    onModulesChanged,
    canDelete,
    courseName
}: {
    logic: EpistoDialogLogicType,
    onModulesChanged: (modules: ModuleEditDTO[]) => void,
    canDelete: (moduleVersionId: number) => boolean,
    courseName: string
}) => {

    // misc
    const courseId = useIntParam('courseId')!;

    // state
    const [editedModuleId, setEditedModuleId] = useState<number | null>(null);

    // http
    const { moduleListEditData: modules } = ModuleApiService
        .useModuleListEditData(courseId, logic.isOpen);

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

    // set on changed callback
    useEffect(() => {

        mutatorRef
            .current
            .setOnPostMutationChanged(() => {
             
                console.log('asd');
                onModulesChanged(mutatorRef.current.mutatedItems);
            });
    }, [onModulesChanged]);

    // paging
    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => (
                <ModuleListEditDialogPage
                    editModule={handleEditModule}
                    canDelete={canDelete}
                    mutator={mutatorRef} />
            ),
            title: 'Modulok szerkesztése'

        },
        {
            content: () => (
                <>
                    {currentModule && <ModuleEditDialogPage
                        dto={currentModule}
                        mutator={mutatorRef} />}
                </>
            ),
            title: currentModule?.name ?? '',
            isFocused: true
        }
    ]);

    // Go to edit page
    const handleEditModule = useCallback((moduleId: number) => {

        setEditedModuleId(moduleId);
        paging.next();
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
                    .length - 1
            });
    }, []);

    // handle save
    const handleSave = useCallback(() => {

        return 1;
    }, []);

    return (
        <EditDialogBase
            hideTabs
            paging={paging}
            logic={logic}
            headerButtons={<>
                <EpistoButton
                    onClick={createModule}
                    icon={<Add />}>

                    Hozzáadás
                </EpistoButton>
            </>}
            chipText='Module'
            chipColor='var(--deepBlue)'
            title={'Edit modules'}
            subTitle={courseName}
            footer={(
                <EpistoFlex
                    justify="flex-end"
                    margin={{ all: 'px5' }}>

                    <EpistoButton
                        variant='colored'
                        onClick={handleSave}>

                        {translatableTexts.misc.ok}
                    </EpistoButton>
                </EpistoFlex>
            )} />
    );
};