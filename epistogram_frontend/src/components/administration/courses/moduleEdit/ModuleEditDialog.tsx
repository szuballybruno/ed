import { Add } from '@mui/icons-material';
import { useEffect } from 'react';
import { usePaging } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { ModuleEditDialogLogicType } from './ModuleEditDialogLogic';
import { ModuleEditDialogPage } from './ModuleEditDialogPage';
import { ModuleListEditDialogPage } from './ModuleListEditDialogPage';

export const ModuleEditDialog = ({
    logic,
    courseName
}: {
    courseName: string,
    logic: ModuleEditDialogLogicType
}) => {

    const {
        createModule,
        currentModule,
        handleEditModule,
        handleOk,
        mutatorRef,
        dialogLogic,
        currentPageIndex,
        canDelete
    } = logic;

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

    useEffect(() => {

        paging.setItem(currentPageIndex);
    }, [currentPageIndex]);

    return (
        <EditDialogBase
            hideTabs
            paging={paging}
            logic={dialogLogic}
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
                        onClick={handleOk}>

                        {translatableTexts.misc.ok}
                    </EpistoButton>
                </EpistoFlex>
            )} />
    );
};