import { Equalizer, Quiz } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { useGridApiContext } from '@mui/x-data-grid';
import { ReactNode, useState } from 'react';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { VersionCode } from '../../../../shared/types/VersionCode1';
import { Id } from '../../../../shared/types/versionId';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { IXMutatorFunctions } from '../../../lib/XMutator/XMutatorCore';
import { ChipSmall } from '../ChipSmall';
import { RowSchema } from './AdminCourseContentSubpageLogic';
import classses from './css/AdminCourseContentSubpage.module.css';

const useSetAndCommitCellValue = <TRow, TKey, TField extends keyof TRow,>() => {

    const apiRef = useGridApiContext();

    return (rowKey: TKey, field: TField, value: TRow[TField]) => {

        const rowKeyAny = rowKey as any;
        const fieldStr = field as string;

        apiRef
            .current
            .setEditCellValue({ id: rowKeyAny, field: fieldStr, value: value });

        apiRef
            .current
            .commitCellChange({ id: rowKeyAny, field: fieldStr });

        apiRef
            .current
            .setCellMode(rowKeyAny, fieldStr, 'view');
    };
};

export const useGridColumns = (
    modules: ModuleEditDTO[],
    openDialog: (type: 'video' | 'exam', data?: RowSchema) => void,
    itemsMutatorFunctions: IXMutatorFunctions<CourseContentItemAdminDTO, 'versionCode', VersionCode>,
    onSelectVideoFile: (row: RowSchema) => void,
    currentDropModuleId: Id<'ModuleVersion'> | null) => {

    const TextCellRenderer = ({
        children,
        isMutated,
        isDropEnabled
    }: {
        children: ReactNode,
        isMutated: boolean,
        isDropEnabled?: boolean
    }) => {

        return (
            <div
                style={isDropEnabled === undefined ? undefined : { background: isDropEnabled ? 'green' : 'red' }}
                className={`${classses.textCell} ${isMutated ? classses.textCellMutated : ''}`}>

                <p>
                    {children}
                </p>
            </div>
        );
    };

    const SelectEditCellRenderer = (props: {
        rowKey: VersionCode,
        field: any,
        row: Partial<RowSchema>
    }) => {

        const { field, rowKey, row } = props;

        const setAndCommitCellValue = useSetAndCommitCellValue<RowSchema, VersionCode, 'module'>();

        const [id, setId] = useState<string>(row.module!.versionId + '');

        return <EpistoSelect
            items={modules.filter(x => !x.isPretestModule)}
            currentKey={id}
            onSelected={(value) => {

                const versionId = value.moduleVersionId;

                setId(versionId + '');

                setAndCommitCellValue(rowKey, 'module', {
                    versionId: versionId,
                    isPretestModule: false,
                    name: value.name,
                    orderIndex: value.orderIndex
                });
            }}
            getDisplayValue={x => '' + x?.name}
            getCompareKey={module => '' + module?.moduleVersionId} />;
    };

    const getIsDropEnabled = (row: RowSchema) => currentDropModuleId ? row.module.versionId === currentDropModuleId : undefined;

    const gridColumns = new EpistoDataGridColumnBuilder<RowSchema, VersionCode>()
        .add({
            field: 'itemTitle',
            headerName: 'Cím',
            width: 220,
            resizable: true,
            editHandler: ({ rowKey, value }) => itemsMutatorFunctions
                .mutate({
                    field: 'itemTitle',
                    key: rowKey,
                    newValue: value
                }),
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isDropEnabled={getIsDropEnabled(row)}
                    isMutated={row.changedProperties.itemTitle}>

                    {value}
                </TextCellRenderer>;
            }
        })
        .add({
            field: 'itemSubtitle',
            headerName: 'Alcím',
            width: 220,
            resizable: true,
            editHandler: ({ rowKey, value }) => itemsMutatorFunctions
                .mutate({
                    field: 'itemSubtitle',
                    key: rowKey,
                    newValue: value
                }),
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isDropEnabled={getIsDropEnabled(row)}
                    isMutated={row.changedProperties.itemSubtitle}>

                    {value}
                </TextCellRenderer>;
            }
        })
        .add({
            field: 'itemOrderIndex',
            headerName: 'Elhelyezkedés',
            width: 80,
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isMutated={row.changedProperties.itemOrderIndex}>

                    {value}
                </TextCellRenderer>;
            }
        })
        .add({
            field: 'module',
            headerName: 'Modul',
            width: 250,
            editHandler: ({ rowKey, value }) => {

                itemsMutatorFunctions
                    .mutate({
                        key: rowKey,
                        field: 'moduleVersionId',
                        newValue: value.versionId
                    });
            },
            renderCell: ({ key, field, row, value }) => {

                return <TextCellRenderer
                    isDropEnabled={getIsDropEnabled(row)}
                    isMutated={row.changedProperties.moduleId}>

                    {value
                        ? value.isPretestModule
                            ? ' - '
                            : value.name
                        : ''}
                </TextCellRenderer>;
            },
            renderEditCell: (props) => <SelectEditCellRenderer
                field={props.field}
                rowKey={props.key}
                row={props.row} />
        })
        .add({
            field: 'itemType',
            headerName: 'Típus',
            width: 120,
            renderCell: ({ value }) => {

                if (!value)
                    return '';

                return <ChipSmall
                    text={value.label}
                    color={value.color} />;
            }
        })
        .add({
            field: 'videoLength',
            headerName: 'Videó hossza',
            width: 80,
            renderCell: ({ value, row }) => {

                if (!value)
                    return '';

                return <ChipSmall
                    text={value.text}
                    color={value.color} />;
            }
        })
        .add({
            field: 'errors',
            headerName: 'Hibak',
            width: 100,
            renderCell: ({ value }) => {

                if (!value)
                    return '';

                return <ChipSmall
                    text={value.text}
                    tooltip={value.tooltip}
                    color={value.color} />;
            }
        })
        .add({
            field: 'videoFile',
            headerName: 'Videó fájl',
            width: 180,
            renderCell: ({ row }) => {

                if (row.itemType.type !== 'video')
                    return <></>;

                return <EpistoButton
                    variant="outlined"
                    onClick={() => onSelectVideoFile(row)}>

                    Fájl kiválasztása
                </EpistoButton >;
            }
        })
        .add({
            field: 'quickMenu',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: ({ key, row }) => {

                return (
                    <div className="h-flex">
                        <EpistoButton
                            onClick={() => openDialog(row.itemType?.type === 'video' ? 'video' : 'exam', row)}>

                            <Quiz />
                        </EpistoButton>

                        <EpistoButton
                            onClick={() => { throw new Error('Not implemented!'); }}>

                            <Equalizer />
                        </EpistoButton>

                        <EpistoButton
                            onClickNoPropagation={() => itemsMutatorFunctions
                                .remove(key)}>

                            <Delete />
                        </EpistoButton>
                    </div>
                );
            }
        })
        .getColumns();

    return gridColumns;
};