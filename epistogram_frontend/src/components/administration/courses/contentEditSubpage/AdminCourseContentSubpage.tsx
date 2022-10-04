import { Add, Edit } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { EMPTY_ARRAY } from '../../../../helpers/emptyArray';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { useUploadVideoFileAsync, VideoFileUploadCallbackParams } from '../../../../services/api/videoApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { useNavigation } from '../../../../services/core/navigatior';
import { killNotification, showNotification, showNotificationAdvanced, useShowErrorDialog2 } from '../../../../services/core/notifications';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { VersionCode } from '../../../../shared/types/VersionCode1';
import { Id } from '../../../../shared/types/versionId';
import { moveItemInArray } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { XEventManager } from '../../../../static/XEventManager';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { FileSelector } from '../../../universal/fileSelector/FileSelector';
import { SelectedFileDataType, useFileSelectorLogic } from '../../../universal/fileSelector/FileSelectorLogic';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ItemEditDialog } from '../itemEditDialog/ItemEditDialog';
import { ItemEditDialogParams } from '../itemEditDialog/ItemEditDialogTypes';
import { ModuleEditDialog } from '../moduleEdit/ModuleEditDialog';
import { useModuleEditDialogLogic } from '../moduleEdit/ModuleEditDialogLogic';
import { AddNewItemPopper } from './AddNewItemPopper';
import { useGridColumns } from './AdminCourseContentSubpageColumns';
import { mapToRowSchema, RowSchema } from './AdminCourseContentSubpageLogic';
import { VideoUploadProgressNotification } from './VideoUploadProgressNotification';

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigate2 } = useNavigation();
    const { showErrorDialog } = useShowErrorDialog2();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const itemEditDialogLogic = useEpistoDialogLogic<ItemEditDialogParams>(ItemEditDialog);
    const dialogParams = itemEditDialogLogic.params!;
    const isAnySelected = !!courseId && (courseId != Id.create<'Course'>(-1));

    const videoUploadProgressEventManager = useMemo(() => new XEventManager<'onProgressChanged' | 'onError' | 'onDone'>(), []);

    const videoFileUploadCallback = (params: VideoFileUploadCallbackParams) => {

        videoUploadProgressEventManager
            .fireEvent('onProgressChanged', {
                progress: params.currentChunkIndex / params.chunkCount * 100,
                buffer: Math.min(params.currentChunkIndex + 1, params.chunkCount) / params.chunkCount * 100,
                isDone: false,
                videoVersionId: params.videoVersionId
            });
    };

    const handleVideoFileUploadError = (params: { error: any, videoVersionId: Id<'VideoVersion'> }) => {

        videoUploadProgressEventManager
            .fireEvent('onError', {
                videoVersionId: params.videoVersionId
            });

        showErrorDialog(params.error);
    };

    const handleVideoFileUploadDone = (params: { videoVersionId: Id<'VideoVersion'> }) => {

        videoUploadProgressEventManager
            .fireEvent('onDone', {
                videoVersionId: params.videoVersionId
            });
    };

    const { saveVideoFileAsync, saveVideoFileState } = useUploadVideoFileAsync(videoFileUploadCallback, handleVideoFileUploadError, handleVideoFileUploadDone);

    // state
    const [fileUploadVideo, setFileUploadVideo] = useState<RowSchema | null>(null);
    const [draggedRow, setDraggedRow] = useState<RowSchema | null>(null);
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
    const [itemsMutatorState, itemsMutatorFunctions] = useXMutatorNew(CourseContentItemAdminDTO, 'versionCode', 'ItemMutator');
    const currentDropModuleId = draggedRow?.module.versionId ?? null;
    const fileUploadVideoVersionId = fileUploadVideo?.data?.videoVersionId ?? Id.create<'VideoVersion'>(-1);

    // busy state
    useSetBusy(CourseApiService.useSaveCourseContentData, saveCourseDataState);
    useSetBusy(CourseApiService.useCourseContentAdminData, courseContentAdminDataState);

    // module edit dialog logic
    const canDelete = useCallback((moduleVersionId: Id<'ModuleVersion'>) => !itemsMutatorState
        .mutatedItems
        .any(x => x.moduleVersionId === moduleVersionId), []);

    const moduleEditDialogLogic = useModuleEditDialogLogic({
        canDelete,
        modules: courseContentAdminData?.modules ?? EMPTY_ARRAY
    });

    const isSaveEnabled = itemsMutatorState.isAnyItemsMutated
        || moduleEditDialogLogic.isAnyItemsMutated;

    const modules = moduleEditDialogLogic
        .mutatedItems;

    const nonPretestModules = modules
        .filter(x => !x.isPretestModule);

    // preprocess items 
    const gridRowItems = useMemo(() => {

        if (modules.length === 0)
            return [];

        const items = itemsMutatorState
            .mutatedItems;

        const preproItems = items
            .map((item, index) => mapToRowSchema(item, index, modules, getItemKey, itemsMutatorFunctions.isMutated.bind(itemsMutatorFunctions)))
            .orderBy(x => x.module.orderIndex)
            .groupBy(x => x.module.versionId)
            .flatMap(x => x
                .items
                .orderBy(i => i.itemOrderIndex));

        return preproItems;
    }, [itemsMutatorFunctions, itemsMutatorState, modules, getItemKey]);

    // set - original items if loaded
    useEffect(() => {

        if (!courseContentAdminData)
            return;

        itemsMutatorFunctions
            .setOriginalItems(courseContentAdminData.items ?? []);
    }, [courseContentAdminData, itemsMutatorFunctions]);

    /**
     * Handle upload video file 
     */
    const handleUploadVideoFile = useCallback((data: SelectedFileDataType) => {

        showNotificationAdvanced(<VideoUploadProgressNotification
            videoVersionId={fileUploadVideoVersionId}
            defaultPercentage={0}
            eventManager={videoUploadProgressEventManager}
            videoTitle={fileUploadVideo?.itemTitle ?? ''}
            onClose={() => killNotification(fileUploadVideoVersionId.toString())} />, {
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            toastId: fileUploadVideoVersionId.toString()
        });

        saveVideoFileAsync(fileUploadVideoVersionId, data.file);
    }, [saveVideoFileAsync, fileUploadVideoVersionId]);

    /**
     * Use video selector logic
     */
    const videoFileSelectorLogic = useFileSelectorLogic({
        onFileSelected: handleUploadVideoFile,
        type: 'video'
    });

    /**
     * Handle select video file 
     */
    const handleSelectVideoFile = useCallback((row: RowSchema) => {

        setFileUploadVideo(row);
        videoFileSelectorLogic.selectFile();
    }, [videoFileSelectorLogic]);

    /**
     * Close add popper  
     */
    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    /**
     * Open item edit dialog  
     */
    const openItemEditDialog = (type: 'video' | 'exam' | 'module', row?: RowSchema) => {

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

    /**
     * Add item row  
     */
    const handleAddRow = (type: 'video' | 'exam') => {

        const moduleVersionId = nonPretestModules
            .first(x => true)
            .moduleVersionId;

        const foundModule = itemsMutatorState
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
                id: Id.create<'ModuleVersion'>(-1),
                orderIndex: -1
            };

        const itemOrderIndex = itemsMutatorState
            .mutatedItems
            .filter(x => x.moduleVersionId === moduleVersionId && x.itemType !== 'pretest')
            .length;

        const itemVersionId = type === 'video'
            ? Id.create<'VideoVersion'>(getVirtualId())
            : Id.create<'ExamVersion'>(getVirtualId());

        const newVersionCode = VersionCode
            .create(
                type === 'video'
                    ? 'video_version'
                    : 'exam_version',
                itemVersionId);

        const dto: CourseContentItemAdminDTO = {
            itemType: type === 'exam' ? 'exam' : 'video',
            itemSubtitle: '',
            itemTitle: '',
            itemOrderIndex,
            courseId,
            warnings: [],
            errors: [],
            versionCode: newVersionCode,
            examVersionId: type === 'exam' ? itemVersionId as Id<'ExamVersion'> : null,
            videoVersionId: type === 'video' ? itemVersionId as Id<'VideoVersion'> : null,
            moduleVersionId: moduleInfo.id,
            moduleOrderIndex: moduleInfo.orderIndex,
            moduleName: moduleInfo.name,
            videoLength: 0,
            questionMutations: [],
            answerMutations: []
        };

        itemsMutatorFunctions
            .create(newVersionCode, dto);
        closeAddPopper();
    };

    /**
     * Save mutations async 
     */
    const handleSaveAsync = useCallback(async () => {

        try {

            await saveCourseDataAsync({
                courseId,
                itemMutations: itemsMutatorState
                    .mutations,
                moduleMutations: moduleEditDialogLogic
                    .mutations
            });

            itemsMutatorFunctions
                .resetMutations('NO CALLBACK');

            await refetchCourseContentAdminData();

            showNotification('Mentve', { autoCloseMs: 1000 });
        }
        catch (e) {

            showErrorDialog(e);
        }
    }, [courseId, itemsMutatorFunctions, itemsMutatorState, moduleEditDialogLogic, refetchCourseContentAdminData, saveCourseDataAsync, showErrorDialog]);

    const gridColumns = useGridColumns(modules, openItemEditDialog, itemsMutatorFunctions, handleSelectVideoFile, currentDropModuleId);

    return (
        <CourseAdministartionFrame
            noHeightOverflow
            isAnySelected={isAnySelected}>

            {/* video file selector */}
            <FileSelector
                logic={videoFileSelectorLogic} />

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
                        action: () => openItemEditDialog('module'),
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

                        itemsMutatorFunctions
                            .mutate({
                                key: dialogParams.versionCode,
                                field: 'questionMutations',
                                newValue: questionMutations
                            });

                        itemsMutatorFunctions
                            .mutate({
                                key: dialogParams.versionCode,
                                field: 'answerMutations',
                                newValue: answerMutations
                            });
                    }}
                    dialogLogic={itemEditDialogLogic} />

                <ModuleEditDialog
                    logic={moduleEditDialogLogic} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    hasModules={nonPretestModules.any()}
                    targetElement={ref?.current}
                    onAddItem={handleAddRow}
                    onClose={closeAddPopper} />

                {/* data grid */}
                <EpistoFlex2
                    flex="1"
                    overflow="hidden">

                    <EpistoDataGrid
                        columns={gridColumns}
                        rows={gridRowItems}
                        getKey={getRowKey}
                        onRowOrderChange={({ sourceIndex, targetIndex }) => {

                            const nonPretestItems = gridRowItems.filter(x => x.itemType.type !== 'pretest');
                            const shiftedSourceIndex = sourceIndex - 1;
                            const shiftedTargetIndex = targetIndex - 1;
                            const reorderedItems = moveItemInArray(nonPretestItems, shiftedSourceIndex, shiftedTargetIndex);

                            reorderedItems
                                .groupBy(x => x.module.versionId)
                                .forEach(group => group
                                    .items
                                    .forEach((row, index) => itemsMutatorFunctions
                                        .mutate({
                                            key: getRowKey(row),
                                            field: 'itemOrderIndex',
                                            newValue: index
                                        })));
                        }}
                        hideFooter
                        onDragStart={setDraggedRow}
                        onDragEnd={() => setDraggedRow(null)}
                        isRowEditable={x => x.itemType.type !== 'pretest'}
                        initialState={{
                            pinnedColumns: {
                                left: ['rowNumber', 'itemTitle'],
                                right: ['quickMenu']
                            }
                        }} />
                </EpistoFlex2>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    );
};
