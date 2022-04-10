import { Add, Edit } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { useCourseContentAdminData, useSaveCourseContentData } from '../../../../services/api/courseApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { useNavigation } from '../../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../../services/core/notifications';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { loggingSettings } from '../../../../static/Environemnt';
import { useIntParam } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoDialog, useEpistoDialogLogic } from '../../../EpistoDialog';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { AddNewItemPopper } from '../AddNewItemPopper';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ExamEditDialog } from '../ExamEditDialog';
import { ModuleEditDialog } from '../ModuleEditDialog';
import { VideoEditDialog } from '../VideoEditDialog';
import { useXListMutator } from '../XMutator';
import { useGridColumnDefinitions } from './AdminCourseContentSubpageColumns';
import { EditRowFnType, mapToRowSchema, RowSchema } from './AdminCourseContentSubpageLogic';

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = useIntParam('courseId')!;
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const videoEditDialogLogic = useEpistoDialogLogic('video_edit_dialog', { defaultCloseButtonType: 'top' });
    const examEditDialogLogic = useEpistoDialogLogic('exam_edit_dialog', { defaultCloseButtonType: 'top' });
    const moduleEditDialogLogic = useEpistoDialogLogic('module_edit_dialog', { defaultCloseButtonType: 'top' });
    const isAnySelected = courseId != -1;

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);
    const [preprocessedItems, setPreprocessedItems] = useState<RowSchema[]>([]);

    // http
    const {
        courseContentAdminData,
        courseContentAdminDataError,
        courseContentAdminDataState,
        refreshCourseContentAdminData
    } = useCourseContentAdminData(courseId, true);

    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();

    // computed
    const modules = courseContentAdminData?.modules ?? [];

    const getRowKey = useCallback((row: RowSchema) => row.rowKey, []);

    const {
        mutatedData,
        add: addRow,
        mutate: mutateRow,
        remove: removeRow,
        isMutated: isRowModified,
        isAnyMutated: isAnyRowsMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<RowSchema, string>(preprocessedItems, getRowKey, 'rowKey');

    // whe
    useEffect(() => {

        const items = courseContentAdminData?.items ?? [];

        const preproItems = items
            .map((item, index) => mapToRowSchema(item, index));

        setPreprocessedItems(preproItems);
    }, [courseContentAdminData]);

    // post mutation 
    const gridRows: RowSchema[] = mutatedData
        .map((x, index) => { x.rowNumber = index; return x; })
        .orderBy(x => x.module.orderIndex)
        .groupBy(x => x.module.id)
        .flatMap(x => x
            .items
            .orderBy(i => i.itemOrderIndex));

    // mutation handlers 
    addOnMutationHandlers([
        {
            field: 'itemOrderIndex',
            action: 'update',
            callback: ({ key, newValue, item }) => {

                const moduleItems = gridRows
                    .groupBy(x => x.module.id)
                    .filter(x => x.key === item.module.id)
                    .flatMap(x => [...x.items])
                    .filter(x => x.itemType.type !== 'pretest')
                    .map(x => getRowKey(x) === key ? { ...x, itemOrderIndex: newValue as number + 1 } : x)
                    .orderBy(x => x.itemOrderIndex);

                const indices = moduleItems
                    .map((item, index) => { item.itemOrderIndex = index; return item; });

                indices
                    .forEach(x => mutateRow({
                        key: getRowKey(x),
                        field: 'itemOrderIndex',
                        newValue: x.itemOrderIndex,
                        noOnMutationCallback: true
                    }));
            }
        },
        {
            action: 'delete',
            callback: ({ item }) => {

                const moduleItems = gridRows
                    .groupBy(x => x.module.id)
                    .filter(x => x.key === item.module.id)
                    .flatMap(x => x.items)
                    .filter(x => getRowKey(x) !== getRowKey(item));

                moduleItems
                    .forEach((x, index) => mutateRow({
                        key: getRowKey(x),
                        field: 'itemOrderIndex',
                        newValue: index,
                        noOnMutationCallback: true
                    }));
            }
        }
    ]);

    // 
    // FUNCS
    // 

    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    const openDialog = (type: 'video' | 'exam' | 'module', itemId?: number) => {

        if (type === 'video')
            videoEditDialogLogic.openDialog({ dialogItemId: itemId });

        if (type === 'exam')
            examEditDialogLogic.openDialog();

        if (type === 'module')
            moduleEditDialogLogic.openDialog();

    };

    const handleMutateRow: EditRowFnType = (key, field, value) => {

        mutateRow({ key, field: field as any, newValue: value });
    };

    const handleAddRow = (type: 'video' | 'exam') => {

        const moduleId = modules[0].id;

        const module = gridRows
            .firstOrNull(x => x.module.id === moduleId)?.module ?? {
            hidden: false,
            id: -1,
            name: 'No module',
            orderIndex: 0
        };

        const itemOrderIndex = gridRows
            .filter(x => x.module.id === moduleId && x.itemType.type !== 'pretest')
            .length;

        const newId = getVirtualId();
        const newItemCode = `new_${type}_${newId}`;

        const dto: CourseContentItemAdminDTO = {
            itemType: type === 'exam' ? 'exam' : 'video',
            itemSubtitle: '',
            itemTitle: '',
            itemOrderIndex,
            courseId,
            warnings: [],
            errors: [],
            itemCode: newItemCode,
            itemId: newId,
            examId: type === 'exam' ? newId : -1,
            videoId: type === 'exam' ? -1 : newId,
            moduleId: module.id,
            moduleOrderIndex: module.orderIndex,
            moduleCode: '',
            moduleName: module.name,
            videoLength: 0
        };

        const row = mapToRowSchema(dto, 0);

        addRow(newItemCode, row);

        closeAddPopper();
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

    if (loggingSettings.render)
        console.log('Rendering AdminCourseContentSubpage');

    const handleEdit = useCallback((key: string, field: any, value: any) => {

        mutateRow({ key, field, newValue: value });
    }, [mutateRow]);

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
                        action: () => openDialog('module'),
                        icon: <Edit ref={ref} />,
                        title: translatableTexts.administration.courseContentSubpage.editModules
                    },
                    {
                        action: handleSaveAsync,
                        title: 'Mentés',
                        disabled: !isAnyRowsMutated
                    }
                ]}>

                {/* dialogs */}
                <EpistoDialog logic={deleteWarningDialogLogic} />
                <VideoEditDialog logic={videoEditDialogLogic} />
                <ExamEditDialog logic={examEditDialogLogic} />
                <ModuleEditDialog logic={moduleEditDialogLogic} />

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
                    handleEdit={handleEdit}
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
