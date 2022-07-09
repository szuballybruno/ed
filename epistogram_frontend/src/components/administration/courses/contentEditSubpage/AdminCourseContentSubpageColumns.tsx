import { Equalizer, Quiz } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { useGridApiContext } from '@mui/x-data-grid';
import { MutableRefObject, ReactNode, useState } from 'react';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { OmitProperty } from '../../../../shared/types/advancedTypes';
import { VersionCode } from '../../../../shared/types/versionCode';
import { EpistoButton } from '../../../controls/EpistoButton';
import { GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { XMutatorCore } from '../../../lib/XMutator/XMutatorCore';
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

export const useGridColumnDefinitions = (
    modules: ModuleEditDTO[],
    openDialog: (type: 'video' | 'exam', data?: RowSchema) => void,
    itemsMutatorRef: MutableRefObject<XMutatorCore<CourseContentItemAdminDTO, 'versionCode', VersionCode>>) => {

    const TextCellRenderer = (props: {
        children: ReactNode,
        isMutated: boolean
    }) => {

        const { children, isMutated } = props;

        return <div
            className={`${classses.textCell} ${isMutated ? classses.textCellMutated : ''}`}>

            <p>
                {children}
            </p>
        </div>;
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
            items={modules}
            currentKey={id}
            onSelected={(value) => {

                const versionId = value.versionId;

                setId(versionId + '');

                console.log('asdasdw');

                setAndCommitCellValue(rowKey, 'module', {
                    versionId: versionId,
                    isPretestModule: false,
                    name: value.name,
                    orderIndex: value.orderIndex
                });
            }}
            getDisplayValue={x => '' + x?.name}
            getCompareKey={module => '' + module?.versionId} />;
    };

    const columnDefGen = <TField extends keyof RowSchema,>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<RowSchema, VersionCode, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const gridColumns: GridColumnType<RowSchema, VersionCode, any>[] = [
        columnDefGen('rowNumber', {
            headerName: 'Sorszam',
            width: 80
        }),
        columnDefGen('itemOrderIndex', {
            headerName: 'Elhelyezkedés',
            width: 80,
            editHandler: ({ rowKey, value }) => itemsMutatorRef
                .current
                .mutate({
                    field: 'itemOrderIndex',
                    key: rowKey,
                    newValue: value as any
                }),
            type: 'int',
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isMutated={row.changedProperties.itemOrderIndex}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('itemTitle', {
            headerName: 'Cím',
            width: 220,
            resizable: true,
            editHandler: ({ rowKey, value }) => itemsMutatorRef
                .current
                .mutate({
                    field: 'itemTitle',
                    key: rowKey,
                    newValue: value
                }),
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isMutated={row.changedProperties.itemTitle}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('itemSubtitle', {
            headerName: 'Alcím',
            width: 220,
            resizable: true,
            editHandler: ({ rowKey, value }) => itemsMutatorRef
                .current
                .mutate({
                    field: 'itemSubtitle',
                    key: rowKey,
                    newValue: value
                }),
            renderCell: ({ value, row }) => {

                return <TextCellRenderer
                    isMutated={row.changedProperties.itemSubtitle}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('module', {
            headerName: 'Modul',
            width: 250,
            editHandler: ({ rowKey, value }) => {

                itemsMutatorRef
                    .current
                    .mutate({
                        key: rowKey,
                        field: 'moduleVersionId',
                        newValue: value.versionId
                    });
            },
            renderCell: ({ key, field, row, value }) => {

                return <TextCellRenderer
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
        }),
        columnDefGen('itemType', {
            headerName: 'Típus',
            width: 120,
            renderCell: ({ value }) => {

                if (!value)
                    return '';

                return <ChipSmall
                    text={value.label}
                    color={value.color} />;
            }
        }),
        columnDefGen('videoLength', {
            headerName: 'Videó hossza',
            width: 80,
            renderCell: ({ value, row }) => {

                if (!value)
                    return '';

                return <ChipSmall
                    text={value.text}
                    color={value.color} />;
            }
        }),
        columnDefGen('errors', {
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
        }),
        columnDefGen('videoFile', {
            headerName: 'Videó fájl',
            width: 180,
            renderCell: ({ row }) => {

                return <EpistoButton
                    variant="outlined"
                    onClick={() => { throw new Error('Not implemented!'); }}>

                    Fájl kiválasztása
                </EpistoButton >;
            }
        }),
        columnDefGen('quickMenu', {
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
                            onClickNoPropagation={() => itemsMutatorRef
                                .current
                                .remove(key)}>

                            <Delete />
                        </EpistoButton>
                    </div>
                );
            }
        })
    ];

    return gridColumns;
};