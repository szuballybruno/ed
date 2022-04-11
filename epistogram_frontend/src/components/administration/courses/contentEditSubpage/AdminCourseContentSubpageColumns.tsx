import { Equalizer } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useGridApiContext } from '@mui/x-data-grid';
import { ReactNode, useState } from 'react';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseContentItemIssueDTO } from '../../../../shared/dtos/admin/CourseContentItemIssueDTO';
import { CourseModuleShortDTO } from '../../../../shared/dtos/admin/CourseModuleShortDTO';
import { OmitProperty } from '../../../../shared/types/advancedTypes';
import { CourseItemType } from '../../../../shared/types/sharedTypes';
import { formatTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { GridColumnType, UseCommitNewValueType } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { ChipSmall } from '../ChipSmall';
import { EditRowFnType, RowSchema } from './AdminCourseContentSubpageLogic';
import classses from './css/AdminCourseContentSubpage.module.css';

export const useGridColumnDefinitions = (
    modules: CourseModuleShortDTO[],
    openDialog: (type: 'video' | 'exam', itemId?: number) => void,
    removeRow: (key: string) => void,
    editRow: EditRowFnType,
    isModified: (key: string) => (field: keyof RowSchema) => boolean) => {

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
        row: Partial<RowSchema>,
        useCommitNewValue: UseCommitNewValueType<string, RowSchema>
    }) => {

        const { field, rowKey, row, useCommitNewValue } = props;
        const apiRef = useGridApiContext();

        const [id, setId] = useState<string>(row.module!.id + '');

        return <EpistoSelect
            items={modules}
            currentKey={id}
            onSelected={(value) => {

                setId(value.id + '');

                apiRef
                    .current
                    .setEditCellValue({ id: rowKey, field, value: value.id });

                apiRef
                    .current
                    .commitCellChange({ id: rowKey, field: field });
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
            editable: true,
            type: 'int',
            renderCell: ({ key, field, value }) => {

                return <TextCellRenderer
                    isMutated={isModified(key)(field)}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('itemTitle', {
            headerName: 'Cím',
            width: 220,
            resizable: true,
            editable: true,
            renderCell: ({ key, field, value }) => {

                return <TextCellRenderer
                    isMutated={isModified(key)(field)}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('itemSubtitle', {
            headerName: 'Alcím',
            width: 220,
            resizable: true,
            editable: true,
            renderCell: ({ key, field, value }) => {

                return <TextCellRenderer
                    isMutated={isModified(key)(field)}>

                    {value}
                </TextCellRenderer>;
            }
        }),
        columnDefGen('module', {
            headerName: 'Modul',
            width: 250,
            editable: true,
            renderCell: ({ key, field, row, value }) => {

                return <TextCellRenderer
                    isMutated={isModified(key)(field)}>

                    {value
                        ? value.hidden
                            ? ' - '
                            : value.name
                        : ''}
                </TextCellRenderer>;
            },
            renderEditCell: (props) => <SelectEditCellRenderer
                field={props.field}
                rowKey={props.key}
                row={props.row}
                useCommitNewValue={props.useCommitNewValue} />
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

                            <Edit />
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

const getItemTypeValues = (itemType: CourseItemType): { label: string, color: any } => {

    if (itemType === 'exam')
        return {
            color: 'var(--deepOrange)',
            label: 'Vizsga'
        };

    if (itemType === 'video')
        return {
            color: 'var(--deepBlue)',
            label: 'Videó'
        };

    if (itemType === 'pretest')
        return {
            color: 'purple',
            label: 'Szintfelmérő'
        };

    if (itemType === 'final')
        return {
            color: 'orange',
            label: 'Záróvizsga'
        };

    throw new Error('Unexpected type: ' + itemType);
};

const getIssueText = (dto: CourseContentItemIssueDTO) => {

    if (dto.code === 'ans_miss')
        return `Valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'corr_ans_miss')
        return `Helyesnek megjelolt valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'questions_missing')
        return 'Kerdesek hianyoznak';

    if (dto.code === 'video_too_long')
        return 'Video tul hosszu';

    return null;
};

const mapToRowSchema = (item: CourseContentItemAdminDTO, rowNumber: number): RowSchema => {

    const { color, label } = getItemTypeValues(item.itemType);

    const isLengthWarning = item
        .warnings
        .any(x => x.code === 'video_too_long');

    const hasErrors = item
        .errors
        .length > 0;

    return ({
        rowKey: item.itemCode,
        rowNumber: rowNumber,
        itemOrderIndex: item.itemOrderIndex,
        itemTitle: item.itemTitle,
        itemSubtitle: item.itemSubtitle,
        module: {
            hidden: item.itemType === 'pretest',
            id: item.moduleId,
            name: item.moduleName,
            orderIndex: item.moduleOrderIndex
        },
        itemType: {
            label,
            color,
            type: item.itemType
        },
        videoLength: {
            text: item.itemType === 'exam'
                ? ' - '
                : !item.warnings || !item.videoLength
                    ? ''
                    : formatTime(Math.round(item.videoLength)),
            color: isLengthWarning
                ? 'var(--intenseOrange)'
                : 'gray'
        },
        errors: {
            text: hasErrors
                ? `${item.errors.length} hiba`
                : 'Nincs hiba',
            tooltip: item
                .errors
                .map(x => getIssueText(x))
                .join('\n'),
            color: hasErrors
                ? 'var(--intenseRed)'
                : 'var(--intenseGreen)'
        },
        quickMenu: rowNumber,
        videoFile: 'vf'
    });
};