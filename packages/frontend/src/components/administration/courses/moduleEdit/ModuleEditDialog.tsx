import { moveItemInArray } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useModuleEditColumns } from './ModuleEditColumns';
import { ModuleEditDialogLogicType } from './ModuleEditDialogLogic';

export const ModuleEditDialog = ({
    logic,
}: {
    logic: ModuleEditDialogLogicType,
}) => {

    const {
        canDelete,
        handleCreateModule,
        handleOk,
        mutatorFunctions,
        dialogLogic,
        mutatedItems
    } = logic;

    const rows = mutatedItems
        .filter(x => !x.isPretestModule)
        .orderBy(x => x.orderIndex);

    const columns = useModuleEditColumns({ mutatorFunctions, canDelete });

    return (
        <EpistoDialog
            logic={dialogLogic}>

            <EpistoFlex2
                bg="white"
                padding="15px"
                direction="column"
                width="90vw"
                height="90vh">

                {/* header */}
                <EpistoFlex2
                    mb="15px"
                    align="center"
                    justify="space-between"
                    margin={{ all: 'px5' }}>

                    <EpistoFont
                        fontSize="fontLarge">
                        Modul szerkesztése
                    </EpistoFont>

                    <EpistoButton
                        variant='action'
                        onClick={handleCreateModule}>

                        {translatableTexts.misc.add}
                    </EpistoButton>
                </EpistoFlex2>

                {/* grid */}
                <EpistoDataGrid
                    onRowOrderChange={(opts) => {

                        const moved = moveItemInArray(rows, opts.sourceIndex, opts.targetIndex);

                        moved
                            .forEach((x, i) => x.orderIndex = i);

                        moved
                            .forEach(({ moduleVersionId, orderIndex }) => mutatorFunctions
                                .mutate({
                                    key: moduleVersionId,
                                    field: 'orderIndex',
                                    newValue: orderIndex
                                }));
                    }}
                    showFooter
                    dragEnabled
                    columns={columns}
                    rows={rows}
                    getKey={x => x.moduleVersionId} />

                {/* footer */}
                <EpistoFlex2
                    justify="flex-end"
                    mt="5px"
                    margin={{ all: 'px5' }}>
                    <EpistoButton
                        variant='action'
                        onClick={handleOk}>

                        {translatableTexts.misc.ok}
                    </EpistoButton>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoDialog>
    );
};