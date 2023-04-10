import { Id, VersionCode } from '@episto/commontypes';
import { CourseContentItemAdminDTO, ModuleEditDTO } from '@episto/communication';
import { Quiz } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { useGridApiContext } from '@mui/x-data-grid';
import { ReactNode, useCallback, useState } from 'react';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
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
    openDialog: (type: 'video' | 'exam', data: RowSchema) => void,
    itemsMutatorFunctions: IXMutatorFunctions<CourseContentItemAdminDTO, 'versionCode', VersionCode>,
    onSelectVideoFile: (row: RowSchema) => void,
    currentDropModuleId: Id<'ModuleVersion'> | null,
    isSimpleView: boolean,
    currentVersionCode: VersionCode | null) => {

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

    const canMarkAsFinal = (row: RowSchema) => {

        if (row.itemType.type === 'pretest')
            return false;

        if (row.itemType.type === 'video')
            return false;

        return true;
    };

    const isMarkAsFinalDisabled = useCallback((row: RowSchema) => {

        return itemsMutatorFunctions
            .getMutatedItems()
            .some(x => x.itemType === 'final') && row.itemType.type !== 'final';
    }, [itemsMutatorFunctions]);

    const handleViewDetails = useCallback((row: RowSchema) => {

        openDialog(row.itemType?.type === 'video' ? 'video' : 'exam', row);
    }, [openDialog]);

    const gridColumns = new EpistoDataGridColumnBuilder<RowSchema, VersionCode>()
        .addIf(!isSimpleView, {
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
        .addIf(isSimpleView, {
            field: 'itemTitle',
            headerName: 'Cím',
            width: 500,
            resizable: true,
            renderCell: ({ value, row }) => (
                <EpistoFlex2
                    background="deepBlue"
                    className="whall"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleViewDetails(row)}
                    align="center">
                    <EpistoFont
                        fontWeight={currentVersionCode === row.data.versionCode ? 'heavy' : undefined}>
                        {value}
                    </EpistoFont>
                </EpistoFlex2>
            )
        })
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
            field: 'isFinal',
            headerName: 'Záróvizsga',
            width: 80,
            renderCell: ({ value, key, row }) => canMarkAsFinal(row)
                ? (
                    <EpistoCheckbox
                        value={value}
                        disabled={isMarkAsFinalDisabled(row)}
                        setValue={(isFinalChecked) => itemsMutatorFunctions
                            .mutate({
                                key,
                                field: 'itemType',
                                newValue: isFinalChecked
                                    ? 'final'
                                    : 'exam'
                            })} />
                )
                : <></>
        })
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
            field: 'errors',
            headerName: 'Hibák',
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
        .addIf(!isSimpleView, {
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
        .addIf(!isSimpleView, {
            field: 'quickMenu',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: ({ key, row }) => {

                return (
                    <div className="h-flex">
                        <EpistoButton
                            onClick={() => handleViewDetails(row)}>

                            <Quiz />
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