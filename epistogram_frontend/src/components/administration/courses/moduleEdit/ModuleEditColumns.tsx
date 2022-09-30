import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { Id } from '../../../../shared/types/versionId';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { EpistoImage } from '../../../controls/EpistoImage';
import { IXMutatorFunctions } from '../../../lib/XMutator/XMutatorCore';

export type ModuleEditRowType = ModuleEditDTO;

export const useModuleEditColumns = ({
    mutatorFunctions
}: {
    mutatorFunctions: IXMutatorFunctions<ModuleEditDTO, 'moduleVersionId', Id<'ModuleVersion'>>
}) => {

    return new EpistoDataGridColumnBuilder<ModuleEditRowType, Id<'ModuleVersion'>>()
        .add({
            field: 'imageFilePath',
            headerName: 'Cover',
            renderCell: ({ value }) => value
                ? <EpistoImage
                    src={value}
                    objectFit="contain" />
                : <></>
        })
        .add({
            field: 'name',
            headerName: 'Name',
            width: 250,
            editHandler: ({ rowKey, value, field }) => mutatorFunctions
                .mutate({
                    key: rowKey,
                    field,
                    newValue: value
                })
        })
        .add({
            field: 'description',
            headerName: 'Descriotion',
            width: 300,
            editHandler: ({ rowKey, value, field }) => mutatorFunctions
                .mutate({
                    key: rowKey,
                    field,
                    newValue: value
                })
        })
        .getColumns();
};