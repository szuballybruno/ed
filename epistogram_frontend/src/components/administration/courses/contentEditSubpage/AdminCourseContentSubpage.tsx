import { Flex } from '@chakra-ui/react';
import { Add, Edit } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { EMPTY_ARRAY } from '../../../../helpers/emptyArray';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { useNavigation } from '../../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../../services/core/notifications';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { VersionCode } from '../../../../shared/types/versionCode';
import { useIntParam } from '../../../../static/locationHelpers';
import { Logger } from '../../../../static/Logger';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { useXMutator } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ItemEditDialog } from '../itemEditDialog/ItemEditDialog';
import { ItemEditDialogParams } from '../itemEditDialog/ItemEditDialogTypes';
import { ModuleEditDialog } from '../moduleEdit/ModuleEditDialog';
import { useModuleEditDialogLogic } from '../moduleEdit/ModuleEditDialogLogic';
import { AddNewItemPopper } from './AddNewItemPopper';
import { useGridColumnDefinitions } from './AdminCourseContentSubpageColumns';
import { mapToRowSchema, RowSchema } from './AdminCourseContentSubpageLogic';

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = useIntParam('courseId')!;
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const itemEditDialogLogic = useEpistoDialogLogic<ItemEditDialogParams>('item_edit_dialog');
    const isAnySelected = !!courseId && (courseId != -1);

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);

    // http
    const {
        courseContentAdminData,
        courseContentAdminDataState,
        refetchCourseContentAdminData
    } = CourseApiService.useCourseContentAdminData(courseId, isAnySelected, true);
    const {
        saveCourseDataAsync,
        saveCourseDataState
    } = CourseApiService.useSaveCourseContentData();

    // misc
    const getItemKey = useCallback((item: CourseContentItemAdminDTO) => item.versionCode, []);
    const getRowKey = useCallback((row: RowSchema) => row.rowKey, []);
    const itemsMutatorRef = useXMutator(CourseContentItemAdminDTO, 'versionCode');

    // busy state
    useSetBusy(CourseApiService.useSaveCourseContentData, saveCourseDataState);
    useSetBusy(CourseApiService.useCourseContentAdminData, courseContentAdminDataState);

    // module edit dialog logic
    const canDelete = useCallback((moduleVersionId: number) => !itemsMutatorRef
        .current
        .mutatedItems
        .any(x => x.moduleVersionId === moduleVersionId), []);

    const moduleEditDialogLogic = useModuleEditDialogLogic({
        canDelete,
        modules: courseContentAdminData?.modules ?? EMPTY_ARRAY
    });

    const isSaveEnabled = itemsMutatorRef.current.isAnyItemsMutated
        || moduleEditDialogLogic.mutatorRef.current.isAnyItemsMutated;

    const modules = moduleEditDialogLogic
        .mutatorRef
        .current
        .mutatedItems;

    // preprocess items 
    const gridRowItems = useMemo(() => {

        if (modules.length === 0)
            return [];

        const items = itemsMutatorRef
            .current
            .mutatedItems;

        const preproItems = items
            .map((item, index) => mapToRowSchema(item, index, modules, getItemKey, itemsMutatorRef.current.isMutated))
            .orderBy(x => x.module.orderIndex)
            .groupBy(x => x.module.versionId)
            .flatMap(x => x
                .items
                .orderBy(i => i.itemOrderIndex));

        return preproItems;
    }, [itemsMutatorRef.current.mutatedItems, modules]);

    // recalc  
    const recalcOrderIndices = useCallback(() => {

        itemsMutatorRef
            .current
            .mutatedItems
            .groupBy(x => x.moduleVersionId)
            .forEach(x => x
                .items
                .forEach((x, i) => {

                    itemsMutatorRef
                        .current
                        .mutate({
                            key: x.versionCode,
                            field: 'itemOrderIndex',
                            newValue: i
                        });
                }));
    }, []);

    // set - on post mutations changed 
    useEffect(() => {

        itemsMutatorRef
            .current
            .setOnPostMutationChanged(recalcOrderIndices);
    }, []);

    // set - original items if loaded
    useEffect(() => {

        if (!courseContentAdminData)
            return;

        itemsMutatorRef
            .current
            .setOriginalItems(courseContentAdminData.items ?? []);
    }, [courseContentAdminData]);

    // 
    // FUNCS
    // 

    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    const openDialog = (type: 'video' | 'exam' | 'module', row?: RowSchema) => {

        const data = row?.data!;
        const isVideo = !!data?.videoVersionId;

        if (type === 'exam' || type === 'video')
            itemEditDialogLogic
                .openDialog({
                    params: {
                        isVideo,
                        itemVersionId: isVideo ? data.videoVersionId! : data.examVersionId!,
                        itemTitle: data.itemTitle,
                        courseTitle: 'Course name',
                        versionCode: data.versionCode,
                        questionMutations: data.questionMutations,
                        answerMutations: data.answerMutations
                    }
                });

        if (type === 'module')
            moduleEditDialogLogic
                .dialogLogic
                .openDialog();

    };

    const handleAddRow = (type: 'video' | 'exam') => {

        const moduleVersionId = modules[0].versionId;

        const foundModule = itemsMutatorRef
            .current
            .mutatedItems
            .firstOrNull(x => x.moduleVersionId === moduleVersionId);

        const moduleInfo = foundModule
            ? {
                name: foundModule.moduleName,
                id: foundModule.moduleVersionId,
                orderIndex: foundModule.moduleOrderIndex
            }
            : {
                name: 'no module',
                id: -1,
                orderIndex: -1
            };

        const itemOrderIndex = itemsMutatorRef
            .current
            .mutatedItems
            .filter(x => x.moduleVersionId === moduleVersionId && x.itemType !== 'pretest')
            .length;

        const itemVersionId = getVirtualId();

        const newVersionCode = VersionCode
            .create(type === 'video' ? 'video_version' : 'exam_version', itemVersionId);

        const dto: CourseContentItemAdminDTO = {
            itemType: type === 'exam' ? 'exam' : 'video',
            itemSubtitle: '',
            itemTitle: '',
            itemOrderIndex,
            courseId,
            warnings: [],
            errors: [],
            versionCode: newVersionCode,
            examVersionId: type === 'exam' ? itemVersionId : null,
            videoVersionId: type === 'video' ? itemVersionId : null,
            moduleVersionId: moduleInfo.id,
            moduleOrderIndex: moduleInfo.orderIndex,
            moduleName: moduleInfo.name,
            videoLength: 0,
            questionMutations: [],
            answerMutations: []
        };

        itemsMutatorRef
            .current
            .create(newVersionCode, dto);
        closeAddPopper();
    };

    const handleSaveAsync = useCallback(async () => {

        try {

            await saveCourseDataAsync({
                courseId,
                itemMutations: itemsMutatorRef
                    .current
                    .mutations,
                moduleMutations: moduleEditDialogLogic
                    .mutatorRef
                    .current
                    .mutations
            });

            itemsMutatorRef
                .current
                .resetMutations('NO CALLBACK');

            await refetchCourseContentAdminData();

            showNotification('Mentve', { autoCloseMs: 1000 });
        }
        catch (e) {

            showError(e);
        }
    }, []);

    const gridColumns = useGridColumnDefinitions(modules, openDialog, itemsMutatorRef);

    //
    // EFFECTS
    //

    Logger.logScoped('RENDER', 'Rendering AdminCourseContentSubpage');

    return (
        <CourseAdministartionFrame
            noHeightOverflow
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
                        disabled: !isSaveEnabled
                    }
                ]}>

                {/* dialogs */}
                <EpistoDialog logic={deleteWarningDialogLogic} />

                <ItemEditDialog
                    callback={(questionMutations, answerMutations) => {

                        itemsMutatorRef
                            .current
                            .mutate({
                                key: itemEditDialogLogic.params.versionCode,
                                field: 'questionMutations',
                                newValue: questionMutations
                            });

                        itemsMutatorRef
                            .current
                            .mutate({
                                key: itemEditDialogLogic.params.versionCode,
                                field: 'answerMutations',
                                newValue: answerMutations
                            });
                    }}
                    dialogLogic={itemEditDialogLogic} />

                <ModuleEditDialog
                    logic={moduleEditDialogLogic}
                    courseName={'Course name'} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    targetElement={ref?.current}
                    onAddItem={handleAddRow}
                    onClose={closeAddPopper} />

                {/* data grid */}
                <Flex
                    flex="1"
                    overflow="hidden">

                    <EpistoDataGrid
                        columns={gridColumns}
                        rows={gridRowItems}
                        getKey={getRowKey}
                        hideFooter
                        initialState={{
                            pinnedColumns: {
                                left: ['rowNumber', 'itemTitle'],
                                right: ['quickMenu']
                            }
                        }} />
                </Flex>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    );
};
