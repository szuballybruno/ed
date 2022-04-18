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
import { useXListMutator } from '../../../lib/XMutator/XMutator';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ExamEditDialog } from '../ExamEditDialog';
import { ModuleEditDialog } from '../moduleEdit/ModuleEditDialog';
import { VideoEditDialog } from '../VideoEditDialog';
import { AddNewItemPopper } from './AddNewItemPopper';
import { useGridColumnDefinitions } from './AdminCourseContentSubpageColumns';
import { mapToRowSchema, RowSchema } from './AdminCourseContentSubpageLogic';

type ItemType = CourseContentItemAdminDTO;

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = useIntParam('courseId')!;
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const videoEditDialogLogic = useEpistoDialogLogic<number>('video_edit_dialog', { defaultCloseButtonType: 'top' });
    const examEditDialogLogic = useEpistoDialogLogic('exam_edit_dialog', { defaultCloseButtonType: 'top' });
    const moduleEditDialogLogic = useEpistoDialogLogic('module_edit_dialog', { defaultCloseButtonType: 'top' });
    const isAnySelected = !!courseId && (courseId != -1);

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);
    const [preprocessedItems, setPreprocessedItems] = useState<RowSchema[]>([]);
    const [mutatedItems, setMutatedItems] = useState<ItemType[]>([]);

    // http
    const {
        courseContentAdminData,
        courseContentAdminDataError,
        courseContentAdminDataState,
        refetchCourseContentAdminData
    } = useCourseContentAdminData(courseId, isAnySelected, true);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();

    // computed
    const modules = courseContentAdminData?.modules ?? [];
    const items = courseContentAdminData?.items ?? [];

    const getItemKey = useCallback((row: ItemType) => row.itemCode, []);
    const getRowKey = useCallback((row: RowSchema) => row.rowKey, []);

    const preprocessItems = useCallback((items: ItemType[]) => {

        console.log('Preprocessing items...');

        const preproItems = items
            .map((item, index) => mapToRowSchema(item, index, modules, getItemKey, isRowModified))
            .orderBy(x => x.module.orderIndex)
            .groupBy(x => x.module.id)
            .flatMap(x => x
                .items
                .orderBy(i => i.itemOrderIndex));

        setPreprocessedItems(preproItems);
    }, [setPreprocessedItems, modules]);

    const mutationEndCallback = useCallback(({ newMutatedItems }) => {

        preprocessItems(newMutatedItems);
        setMutatedItems(newMutatedItems);
    }, [preprocessItems, setMutatedItems]);

    const {
        add: addRow,
        mutate: mutateRow,
        remove: removeRow,
        isMutated: isRowModified,
        isAnyMutated: isAnyRowsMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<ItemType, 'itemCode', string>(items, 'itemCode', mutationEndCallback);

    // set preprocessed items, 
    // this works as a sort of caching
    useEffect(() => {

        if (!courseContentAdminData)
            return;

        preprocessItems(courseContentAdminData.items);
        setMutatedItems(courseContentAdminData.items);
    }, [courseContentAdminData]);

    const setNewOrderIndices = (items: ItemType[], mutatedRowKey: string, mutateSelf?: boolean) => {

        const mapped = items
            .map((item, index) => ({
                key: getItemKey(item),
                newOrderIndex: index
            }));

        const filtered = mutateSelf
            ? mapped
            : mapped
                .filter(x => x.key !== mutatedRowKey);

        filtered
            .forEach(x => mutateRow({
                key: x.key,
                field: 'itemOrderIndex',
                newValue: x.newOrderIndex
            }));
    };

    // mutation handlers 
    addOnMutationHandlers([
        {
            field: 'itemOrderIndex',
            action: 'update',
            callback: ({ key, newValue, item }) => {

                const newItemOrderIndex = newValue as number;
                const isNewSmaller = newItemOrderIndex < item.itemOrderIndex;

                const orderedItems = mutatedItems
                    .filter(row => row.moduleId === item.moduleId)
                    .orderBy(row => {

                        if (getItemKey(row) === key)
                            return isNewSmaller
                                ? newItemOrderIndex - 0.5
                                : newItemOrderIndex + 0.5;

                        return row.itemOrderIndex;
                    });

                setNewOrderIndices(orderedItems, key);
            }
        },
        {
            action: 'update',
            field: 'moduleId',
            callback: ({ key, item, newValue }) => {

                const oldModuleId = item.moduleId;
                const newModuleId = newValue as number;

                const oldModuleItems = mutatedItems
                    .filter(x => x.moduleId === oldModuleId && getItemKey(x) !== key)
                    .orderBy(x => x.itemOrderIndex);

                const newModuleItems = mutatedItems
                    .filter(x => x.moduleId === newModuleId || getItemKey(x) === key)
                    .orderBy(x => getItemKey(x) === key ? -1 : x.itemOrderIndex);

                setNewOrderIndices(oldModuleItems, key);
                setNewOrderIndices(newModuleItems, key, true);
            }
        },
        {
            action: 'delete',
            callback: ({ item, key }) => {

                const moduleItems = mutatedItems
                    .filter(x => x.moduleId === item.moduleId)
                    .filter(x => getItemKey(x) !== key)
                    .orderBy(x => x.itemOrderIndex);

                setNewOrderIndices(moduleItems, key);
            }
        }
    ]);

    // 
    // FUNCS
    // 

    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    const openDialog = (type: 'video' | 'exam' | 'module', itemId?: number) => {

        if (type === 'video')
            videoEditDialogLogic.openDialog({ params: itemId });

        if (type === 'exam')
            examEditDialogLogic.openDialog({ params: itemId });

        if (type === 'module')
            moduleEditDialogLogic.openDialog();

    };

    const handleAddRow = (type: 'video' | 'exam') => {

        const moduleId = modules[0].id;

        const foundModule = items
            .firstOrNull(x => x.moduleId === moduleId);

        const moduleInfo = foundModule
            ? {
                name: foundModule.moduleName,
                id: foundModule.moduleId,
                orderIndex: foundModule.moduleOrderIndex
            }
            : {
                name: 'no module',
                id: -1,
                orderIndex: -1
            };

        const itemOrderIndex = items
            .filter(x => x.moduleId === moduleId && x.itemType !== 'pretest')
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
            moduleId: moduleInfo.id,
            moduleOrderIndex: moduleInfo.orderIndex,
            moduleName: moduleInfo.name,
            moduleCode: '',
            videoLength: 0
        };

        addRow(newItemCode, dto);
        closeAddPopper();
    };

    const handleSaveAsync = async () => {

        try {

            await saveCourseDataAsync(mutations);
            resetMutations();
            refetchCourseContentAdminData();
        }
        catch (e) {

            showError(e);
        }
    };

    const gridColumns = useGridColumnDefinitions(
        modules,
        openDialog,
        removeRow,
        mutateRow);

    //
    // EFFECTS
    //

    if (loggingSettings.render)
        console.log('Rendering AdminCourseContentSubpage');

    const handleEdit = useCallback((key: any, field: any, value: any) => {

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

                <ModuleEditDialog
                    logic={moduleEditDialogLogic}
                    afterChangeCallback={refetchCourseContentAdminData} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    targetElement={ref?.current}
                    onAddItem={handleAddRow}
                    onClose={closeAddPopper} />

                {/* data grid */}
                <EpistoDataGrid
                    columns={gridColumns}
                    rows={preprocessedItems}
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
