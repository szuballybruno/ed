import { Flex } from '@chakra-ui/react';
import { Add, Delete, Edit, Equalizer } from '@mui/icons-material';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseContentAdminData, useSaveCourseContentData } from '../../../services/api/courseApiService';
import { getVirtualId } from '../../../services/core/idService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CourseContentItemAdminDTO } from '../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseContentItemIssueDTO } from '../../../shared/dtos/admin/CourseContentItemIssueDTO';
import { CourseModuleShortDTO } from '../../../shared/dtos/admin/CourseModuleShortDTO';
import { OmitProperty } from '../../../shared/types/advancedTypes';
import { CourseItemType } from '../../../shared/types/sharedTypes';
import { formatTime } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType, UseCommitNewValueType } from '../../controls/EpistoDataGrid';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AddNewItemPopper } from './AddNewItemPopper';
import { ChipSmall } from './ChipSmall';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';
import classses from './css/AdminCourseContentSubpage.module.css';
import { ExamEditDialog } from './ExamEditDialog';
import { VideoEditDialog } from './VideoEditDialog';
import { OnMutationHandlerType, useXListMutator } from './XMutator';

type RowSchema = {
    rowKey: string;
    rowNumber: number;
    itemOrderIndex: number;
    itemTitle: string;
    itemSubtitle: string;
    module: {
        id: number;
        hidden: boolean;
        name: string;
        orderIndex: number;
    };
    itemType: {
        type: CourseItemType;
        label: string;
        color: any;
    };
    videoLength: {
        text: string;
        color: any;
    };
    errors: {
        text: string;
        tooltip: string;
        color: any;
    };
    videoFile: string;
    quickMenu: number;
};

type EditRowFnType = <TField extends keyof RowSchema, >(key: string, field: TField, value: RowSchema[TField]) => void;

const useGridColumnDefinitions = (
    modules: CourseModuleShortDTO[],
    openDialog: (type: 'video' | 'exam') => void,
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

                return 'butt';
                // return <EpistoButton
                //     variant="outlined"
                //     onClick={() => { throw new Error('Not implemented!'); }}>

                //     Fájl kiválasztása
                // </EpistoButton >;
            }
        }),
        columnDefGen('quickMenu', {
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: ({ key, row }) => {

                return 'butt';
                // return (
                //     <div className="h-flex">
                //         <EpistoButton
                //             onClick={() => openDialog(row.itemType?.type === 'video' ? 'video' : 'exam')}>

                //             <Edit />
                //         </EpistoButton>

                //         <EpistoButton
                //             onClick={() => { throw new Error('Not implemented!'); }}>

                //             <Equalizer />
                //         </EpistoButton>

                //         <EpistoButton
                //             onClickNoPropagation={() => removeRow(key)}>

                //             <Delete />
                //         </EpistoButton>
                //     </div>
                // );
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

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = useIntParam('courseId')!;
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const videoEditDialogLogic = useEpistoDialogLogic('video_edit_dialog', { defaultCloseButtonType: 'top' });
    const examEditDialogLogic = useEpistoDialogLogic('exam_edit_dialog', { defaultCloseButtonType: 'top' });
    const isAnySelected = courseId != -1;

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);
    const [preprocessedItems, setPreprocessedItems] = useState<RowSchema[]>([]);

    // http
    const { courseContentAdminData, courseContentAdminDataError, courseContentAdminDataState, refreshCourseContentAdminData } = useCourseContentAdminData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();

    // computed
    const modules = courseContentAdminData?.modules ?? [];

    const getRowKey = (row: RowSchema) => row.rowKey;

    const mutHandlersRef = useRef<OnMutationHandlerType<RowSchema, string, keyof RowSchema>[]>([]);

    const {
        mutatedData,
        add: addRow,
        mutate: mutateRow,
        remove: removeRow,
        isMutated: isRowModified,
        isAnyMutated: isAnyRowsMutated,
        // addOnMutationHandler,
        mutations,
        resetMutations
    } = useXListMutator(preprocessedItems, getRowKey, 'rowKey', mutHandlersRef);

    // whe
    useEffect(() => {

        const items = courseContentAdminData?.items ?? [];

        const preproItems = items
            .map((item, index): RowSchema => {

                const { color, label } = getItemTypeValues(item.itemType);

                const isLengthWarning = item
                    .warnings
                    .any(x => x.code === 'video_too_long');

                const hasErrors = item
                    .errors
                    .length > 0;

                return ({
                    rowKey: item.itemCode,
                    rowNumber: index,
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
                    quickMenu: index,
                    videoFile: 'vf'
                });
            });

        setPreprocessedItems(preproItems);
    }, [courseContentAdminData]);

    // post mutation 
    const gridRows: RowSchema[] = mutatedData
        .map((item, index) => {

            const { ...rest } = item;

            return {
                ...rest,
                quickMenu: index,
                rowNumber: index,
                videoFile: 'file_',
                errorsWrapper: index
            };
        })
        .orderBy(x => x.module.orderIndex)
        .groupBy(x => x.module.id)
        .flatMap(x => x
            .items
            .orderBy(i => i.itemOrderIndex));

    // mutation handlers 
    mutHandlersRef
        .current = [
            {
                field: 'itemOrderIndex',
                action: ({ key, field, newValue, item }) => {

                    const moduleItems = gridRows
                        .groupBy(x => x.module.id)
                        .filter(x => x.key === item.module.id)
                        .flatMap(x => [...x.items])
                        .filter(x => x.itemType.type !== 'pretest')
                        .map(x => getRowKey(x) === key ? { ...x, itemOrderIndex: newValue as number + 1 } : x)
                        .orderBy(x => x.itemOrderIndex);

                    // console.log(moduleItems
                    //     .map(x => `${x.itemTitle} ${x.itemOrderIndex}`));

                    const indices = moduleItems
                        .map((item, index) => { item.itemOrderIndex = index; return item; });

                    // console.log(indices
                    //     .map(x => `${x.itemTitle} ${x.itemOrderIndex}`));

                    indices
                        .forEach(x => mutateRow({
                            key: getRowKey(x),
                            field: 'itemOrderIndex',
                            newValue: x.itemOrderIndex,
                            noOnMutationCallback: true
                        }));
                }
            }
        ];

    // console.log(gridRows.map(x => `${x.itemTitle} ${x.itemOrderIndex}`));

    // 
    // FUNCS
    // 

    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    const openDialog = (type: 'video' | 'exam') => {

        if (type === 'video') {

            videoEditDialogLogic.openDialog();
        }
        else {

            examEditDialogLogic.openDialog();
        }
    };

    const handleMutateRow: EditRowFnType = (key, field, value) => {

        mutateRow({ key, field: field as any, newValue: value });
    };

    const handleAddRow = (type: 'video' | 'exam') => {

        // const moduleId = modules[0].id;

        // const moduleOrderIndex = gridRows
        //     .firstOrNull(x => x.moduleId === moduleId)?.moduleOrderIndex ?? 0;

        // const itemOrderIndex = gridRows
        //     .filter(x => x.moduleId === moduleId && x.itemType !== 'pretest')
        //     .length;

        // if (type === 'exam') {

        //     addRow('newcode_' + getVirtualId(), {
        //         itemType: 'exam',
        //         moduleId,
        //         itemSubtitle: '',
        //         itemTitle: '',
        //         itemOrderIndex,
        //         moduleOrderIndex,
        //         courseId
        //     });
        // }
        // else {

        //     addRow('newcode_' + getVirtualId(), {
        //         itemType: 'video',
        //         moduleId,
        //         itemSubtitle: '',
        //         itemTitle: '',
        //         itemOrderIndex,
        //         moduleOrderIndex,
        //         courseId
        //     });
        // }

        // closeAddPopper();
    };

    const handleRemoveRow = (key: string) => {

        removeRow(key);
    };

    const handleSaveAsync = async () => {

        try {

            await saveCourseDataAsync(mutations as any);
            resetMutations();
            refreshCourseContentAdminData();
        }
        catch (e) {

            showError(e);
        }
    };

    const gridColumns = useGridColumnDefinitions(
        modules,
        openDialog,
        handleRemoveRow,
        handleMutateRow,
        isRowModified);

    //
    // EFFECTS
    //

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseContentAdminDataState]}
        error={courseContentAdminDataError}
        className="whall">

        {/* frame */}
        <CourseAdministartionFrame
            isAnySelected={isAnySelected}>

            {/* Right side content */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
                ]}
                direction="column"
                headerButtons={[
                    {
                        action: () => setIsAddButtonsPopperOpen(true),
                        icon: <Add ref={ref} />,
                        title: translatableTexts.misc.add
                    },
                    {
                        action: handleSaveAsync,
                        title: 'Mentes',
                        disabled: !isAnyRowsMutated
                    }
                ]}>

                {/* dialogs */}
                <EpistoDialog logic={deleteWarningDialogLogic} />
                <VideoEditDialog logic={videoEditDialogLogic} />
                <ExamEditDialog logic={examEditDialogLogic} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    targetElement={ref?.current}
                    onAddItem={handleAddRow}
                    onClose={closeAddPopper} />

                {/* data grid */}
                <EpistoDataGrid
                    columns={gridColumns}
                    rows={gridRows}
                    handleEdit={(key, field, value) => mutateRow({ key, field, newValue: value })}
                    getKey={getRowKey}
                    initialState={{
                        pinnedColumns: {
                            left: ['rowNumber', 'itemTitle'],
                            right: ['quickMenu']
                        }
                    }} />
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >;
};
