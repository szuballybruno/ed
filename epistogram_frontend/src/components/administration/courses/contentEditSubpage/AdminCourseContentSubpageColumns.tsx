import { Equalizer, Quiz } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { useGridApiContext } from '@mui/x-data-grid';
import { ReactNode, useState } from 'react';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseModuleShortDTO } from '../../../../shared/dtos/admin/CourseModuleShortDTO';
import { OmitProperty } from '../../../../shared/types/advancedTypes';
import { EpistoButton } from '../../../controls/EpistoButton';
import { GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { MutateFnType } from '../../../lib/XMutator/XMutator';
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
    modules: CourseModuleShortDTO[],
    openDialog: (type: 'video' | 'exam', itemId?: number) => void,
    removeRow: (key: string) => void,
    mutateRow: MutateFnType<CourseContentItemAdminDTO, string>) => {

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
        rowKey: string,
        field: any,
        row: Partial<RowSchema>
    }) => {

        const { field, rowKey, row } = props;

        const setAndCommitCellValue = useSetAndCommitCellValue<RowSchema, string, 'module'>();

        const [id, setId] = useState<string>(row.module!.id + '');

        return <EpistoSelect
            items={modules}
            currentKey={id}
            onSelected={(value) => {

                const selectedModuleId = value.id;

                setId(selectedModuleId + '');

                setAndCommitCellValue(rowKey, 'module', {
                    id: selectedModuleId,
                    isPretestModule: false,
                    name: value.name,
                    orderIndex: value.orderIndex
                });
            }}
            getDisplayValue={x => '' + x?.name}
            getCompareKey={module => '' + module?.id} />;
    };

    const columnDefGen = <TField extends keyof RowSchema,>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<RowSchema, string, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const gridColumns: GridColumnType<RowSchema, string, any>[] = [
        columnDefGen('rowNumber', {
            headerName: 'Sorszam',
            width: 80
        }),
        columnDefGen('itemOrderIndex', {
            headerName: 'Elhelyezkedés',
            width: 80,
            editHandler: ({ rowKey, value }) => mutateRow({
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
            editHandler: ({ rowKey, value }) => mutateRow({
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
            editHandler: ({ rowKey, value }) => mutateRow({
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

                mutateRow({
                    key: rowKey,
                    field: 'moduleId',
                    newValue: value.id
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
                            onClick={() => openDialog(row.itemType?.type === 'video' ? 'video' : 'exam', row.quickMenu)}>

                            <Quiz />
                        </EpistoButton>

                        <EpistoButton
                            onClick={() => { throw new Error('Not implemented!'); }}>

                            <Equalizer />
                        </EpistoButton>

                        <EpistoButton
                            onClickNoPropagation={() => removeRow(key)}>

                            <Delete />
                        </EpistoButton>
                    </div>
                );
            }
        })
    ];

    return gridColumns;
};