import { Id, VersionCode } from '@episto/commontypes';
import { CourseContentItemAdminDTO } from '@episto/communication';
import { Add, Edit } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { EMPTY_ARRAY } from '../../../../helpers/emptyArray';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { useUploadVideoFileAsync, VideoFileUploadCallbackParams } from '../../../../services/api/videoApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { useNavigation } from '../../../../services/core/navigatior';
import { killNotification, showNotification, showNotificationAdvanced, useShowErrorDialog2 } from '../../../../services/core/notifications';
import { moveItemInArray } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { XEventManager } from '../../../../static/XEventManager/XEventManager';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoDiv } from '../../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { FileSelector } from '../../../universal/fileSelector/FileSelector';
import { SelectedFileDataType, useFileSelectorLogic } from '../../../universal/fileSelector/FileSelectorLogic';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ExamDetails } from '../item-details/ExamDetails';
import { ItemEditDialogParams } from '../item-details/ItemEditDialogTypes';
import { VideoDetails } from '../item-details/VideoDetails';
import { ModuleEditDialog } from '../moduleEdit/ModuleEditDialog';
import { useModuleEditDialogLogic } from '../moduleEdit/ModuleEditDialogLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { AddNewItemPopper } from './AddNewItemPopper';
import { useGridColumns } from './AdminCourseContentSubpageColumns';
import { mapToRowSchema, RowSchema } from './AdminCourseContentSubpageLogic';
import { VideoUploadProgressNotification } from './VideoUploadProgressNotification';

export type CallbackParamsType = {
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    videoAudioText?: string;
};

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigate2 } = useNavigation();
    const { showErrorDialog } = useShowErrorDialog2();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
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

    const [currentItem, setCurrentItem] = useState<ItemEditDialogParams | null>(null);
    const isDetailsPaneOpen = useMemo(() => !!currentItem, [currentItem]);
    const currentVersionCode = currentItem?.versionCode ?? null;

    /**
     * Item edit dialog's callback function 
     * this is called when the dialog is closed
     */
    const callback = useCallback(({
        questionMutations,
        answerMutations,
        videoAudioText
    }: CallbackParamsType) => {

        if (!currentItem)
            return;

        // close details pane
        setCurrentItem(null);

        const { versionCode } = currentItem;

        itemsMutatorFunctions
            .mutate({
                key: versionCode,
                field: 'questionMutations',
                newValue: questionMutations
            });

        itemsMutatorFunctions
            .mutate({
                key: versionCode,
                field: 'answerMutations',
                newValue: answerMutations
            });

        if (videoAudioText)
            itemsMutatorFunctions
                .mutate({
                    key: versionCode,
                    field: 'videoAudioText',
                    newValue: videoAudioText
                });
    }, [itemsMutatorFunctions, currentItem]);

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
    const openItemEditDialog = useCallback((type: 'video' | 'exam' | 'module', row?: RowSchema) => {

        const data = row?.data!;
        const isVideo = type === 'video';
        const defaultModuleId = modules
            .firstOrNull(x => x.moduleVersionId === data.moduleVersionId)?.moduleId ?? null;

        // open exam 
        if (type === 'exam') {

            const params: ItemEditDialogParams = {
                isVideo,
                itemVersionId: isVideo ? data.videoVersionId! : data.examVersionId!,
                versionCode: data.versionCode,
                questionMutations: data.questionMutations,
                answerMutations: data.answerMutations,
                defaultModuleId,
                modules,
                examType: data.itemType === 'pretest'
                    ? 'pretest'
                    : data.itemType === 'final'
                        ? 'final'
                        : 'normal'
            };

            setCurrentItem(params);
        }

        // open video 
        else if (type === 'video') {

            const params: ItemEditDialogParams = {
                isVideo,
                itemVersionId: isVideo ? data.videoVersionId! : data.examVersionId!,
                versionCode: data.versionCode,
                questionMutations: data.questionMutations,
                answerMutations: data.answerMutations,
                videoAudioText: data.videoAudioText,
                defaultModuleId,
                modules
            };

            setCurrentItem(params);
        }

        // open module edit dialog
        else {

            moduleEditDialogLogic
                .dialogLogic
                .openDialog();
        }
    }, [moduleEditDialogLogic.dialogLogic, modules]);

    /**
     * Add item row  
     */
    const handleAddRow = (type: 'video' | 'exam') => {

        const module = nonPretestModules
            .lastOrNull();

        if (!module)
            return;

        const itemOrderIndex = itemsMutatorState
            .mutatedItems
            .filter(x => x.moduleVersionId === module.moduleVersionId)
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
            itemOrderIndex: itemOrderIndex,
            courseId,
            warnings: [],
            errors: [],
            versionCode: newVersionCode,
            examVersionId: type === 'exam' ? itemVersionId as Id<'ExamVersion'> : null,
            videoVersionId: type === 'video' ? itemVersionId as Id<'VideoVersion'> : null,
            moduleVersionId: module.moduleVersionId,
            moduleOrderIndex: module.orderIndex,
            moduleName: module.name,
            videoLength: 0,
            questionMutations: [],
            answerMutations: [],
            videoAudioText: ''
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

            /**
             * Save
             */
            const files = moduleEditDialogLogic
                .mutatorFunctions
                .getFiles();

            await saveCourseDataAsync({
                data: {
                    courseId,
                    itemMutations: itemsMutatorState
                        .mutations,
                    moduleMutations: moduleEditDialogLogic
                        .mutations
                },
                files: files
            });

            /**
             * Reset mutations 
             */
            itemsMutatorFunctions
                .resetMutations('NO CALLBACK');

            moduleEditDialogLogic
                .mutatorFunctions
                .resetMutations('NO CALLBACK');

            /**
             * Refetch data and notify
             */
            await refetchCourseContentAdminData();
            showNotification('Mentve', { autoCloseMs: 1000 });
        }
        catch (e) {

            showErrorDialog(e);
        }
    }, [courseId, itemsMutatorFunctions, itemsMutatorState, moduleEditDialogLogic, refetchCourseContentAdminData, saveCourseDataAsync, showErrorDialog]);

    /**
     * Handle reorders
     */
    const handleReorder = useCallback(({ sourceIndex, targetIndex }: { sourceIndex: number, targetIndex: number }) => {

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
    }, [getRowKey, gridRowItems, itemsMutatorFunctions]);

    const headerButtons = useMemo(() => [
        {
            action: () => setIsAddButtonsPopperOpen(true),
            icon: <Add ref={ref} />,
            title: translatableTexts.misc.add,
            disabled: isDetailsPaneOpen
        },
        {
            action: () => openItemEditDialog('module'),
            icon: <Edit ref={ref} />,
            title: translatableTexts.administration.courseContentSubpage.editModules,
            disabled: isDetailsPaneOpen
        },
        {
            action: handleSaveAsync,
            title: 'Mentés',
            disabled: !isSaveEnabled || isDetailsPaneOpen
        }
    ], [handleSaveAsync, isSaveEnabled, openItemEditDialog, isDetailsPaneOpen]);

    /**
     * Get grid columns
     */
    const gridColumns = useGridColumns(
        modules,
        openItemEditDialog,
        itemsMutatorFunctions,
        handleSelectVideoFile,
        currentDropModuleId,
        isDetailsPaneOpen,
        currentVersionCode);

    return (
        <>
            {/* video file selector */}
            <FileSelector
                logic={videoFileSelectorLogic} />

            {/* add buttons popper */}
            <AddNewItemPopper
                isOpen={isAddButtonsPopperOpen}
                hasModules={nonPretestModules.any()}
                targetElement={ref?.current}
                onAddItem={handleAddRow}
                onClose={closeAddPopper} />

            {/* dialogs */}
            <EpistoDialog logic={deleteWarningDialogLogic} />

            {/* module edit dialog */}
            <ModuleEditDialog
                logic={moduleEditDialogLogic} />

            {/* actual page content  */}
            <CourseAdministartionFrame
                noHeightOverflow
                disabled={isDetailsPaneOpen}
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
                    headerButtons={headerButtons}>

                    {/* content */}
                    <EpistoFlex2
                        flex="1"
                        overflow="hidden">

                        {/* grid */}
                        <EpistoDiv
                            flex="1"
                            minWidth="200px">
                            <EpistoDataGrid
                                dragEnabled={!isDetailsPaneOpen}
                                columns={gridColumns}
                                rows={gridRowItems}
                                getKey={getRowKey}
                                onRowOrderChange={handleReorder}
                                onDragStart={setDraggedRow}
                                onDragEnd={() => setDraggedRow(null)}
                                pinnedColumns={{
                                    left: ['rowNumber', 'itemTitle'],
                                    right: ['quickMenu']
                                }} />
                        </EpistoDiv>

                        {/* details pane */}
                        <EpistoFlex2
                            flex="4"
                            bg="white"
                            padding="10px"
                            maxWidth={isDetailsPaneOpen ? '9999px' : '0px'}>

                            {/* video details  */}
                            {currentItem && currentItem.isVideo && <VideoDetails
                                answerMutations={currentItem.answerMutations}
                                callback={callback}
                                defaultModuleId={currentItem.defaultModuleId!}
                                modules={modules}
                                questionMutations={currentItem.questionMutations}
                                videoAudioText={currentItem.videoAudioText!}
                                videoVersionId={currentItem.itemVersionId as Id<'VideoVersion'>}
                                cancelEdit={() => setCurrentItem(null)} />}

                            {/* exam details */}
                            {currentItem && !currentItem.isVideo && <ExamDetails
                                answerMutations={currentItem.answerMutations}
                                callback={callback}
                                defaultModuleId={currentItem.defaultModuleId!}
                                modules={modules}
                                questionMutations={currentItem.questionMutations}
                                examVersionId={currentItem.itemVersionId as Id<'ExamVersion'>}
                                cancelEdit={() => setCurrentItem(null)} />}

                        </EpistoFlex2>
                    </EpistoFlex2>
                </AdminSubpageHeader>
            </CourseAdministartionFrame>
        </>
    );
};
