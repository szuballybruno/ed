import { ModuleEditDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { IXMutatorFunctions } from '../../../lib/XMutator/XMutatorCore';
import { EpistoImageSelector } from '../../../universal/EpistoImageSelector';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoIcons } from '../../../../static/EpistoIcons';

export type ModuleEditRowType = ModuleEditDTO;

export const useModuleEditColumns = ({
    mutatorFunctions,
    canDelete
}: {
    mutatorFunctions: IXMutatorFunctions<ModuleEditDTO, 'moduleVersionId', Id<'ModuleVersion'>>,
    canDelete: (moduleVersionId: Id<'ModuleVersion'>) => boolean
}) => {

    const getImageSrc = (value: string | null): string => {

        if (!value)
            return '';

        if (value.startsWith('http'))
            return value;

        const file = mutatorFunctions
            .getFile(value);

        return URL.createObjectURL(file);
    };

    return new EpistoDataGridColumnBuilder<ModuleEditRowType, Id<'ModuleVersion'>>()
        .add({
            field: 'imageFilePath',
            headerName: 'Cover',
            renderCell: ({ value, key, field }) => (
                <EpistoImageSelector
                    className="whall"
                    src={getImageSrc(value)}
                    setData={(file) => {

                        const fileKey = encodeURIComponent(file.name);

                        mutatorFunctions
                            .mutate({
                                field,
                                key,
                                newValue: fileKey
                            });

                        mutatorFunctions
                            .storeFile(fileKey, file);
                    }} />
            )
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
        .add({
            field: 'moduleVersionId',
            headerName: '',
            renderCell: ({ value }) => (
                <EpistoButton
                    isDisabled={!canDelete(value)}
                    onClick={() => mutatorFunctions
                        .remove(value)}>
                    <EpistoIcons.Delete />
                </EpistoButton>
            )
        })
        .getColumns();
};