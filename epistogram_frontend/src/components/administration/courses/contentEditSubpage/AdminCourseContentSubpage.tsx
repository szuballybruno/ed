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
import { VersionCode } from '../../../../shared/types/VersionCode1';
import { Id } from '../../../../shared/types/versionId';
import { useIntParam } from '../../../../static/locationHelpers';
import { Logger } from '../../../../static/Logger';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
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
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic('dvd');
    const itemEditDialogLogic = useEpistoDialogLogic<ItemEditDialogParams>(ItemEditDialog);
    const dialogParams = itemEditDialogLogic.params!;
    const isAnySelected = !!courseId && (courseId != Id.create<'Course'>(-1));

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
    const [itemsMutatorState, itemsMutatorFunctions] = useXMutatorNew(CourseContentItemAdminDTO, 'versionCode', 'ItemMutator');

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
        || moduleEditDialogLogic.mutatorRef.current.isAnyItemsMutated;

    const modules = moduleEditDialogLogic
        .mutatorRef
        .current
        .mutatedItems;

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

    // recalc  
    const recalcOrderIndices = useCallback(() => {

        itemsMutatorState
            .mutatedItems
            .groupBy(x => x.moduleVersionId)
            .forEach(x => x
                .items
                .forEach((x, i) => {

                    itemsMutatorFunctions
                        .mutate({
                            key: x.versionCode,
                            field: 'itemOrderIndex',
                            newValue: i
                        });
                }));
    }, [itemsMutatorFunctions, itemsMutatorState]);

    // set - on post mutations changed 
    useEffect(() => {

        itemsMutatorFunctions
            .setOnPostMutationChanged(recalcOrderIndices);
    }, [itemsMutatorFunctions, recalcOrderIndices]);

    // set - original items if loaded
    useEffect(() => {

        if (!courseContentAdminData)
            return;

        itemsMutatorFunctions
            .setOriginalItems(courseContentAdminData.items ?? []);
    }, [courseContentAdminData, itemsMutatorFunctions]);

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

    const handleSaveAsync = useCallback(async () => {

        try {

            await saveCourseDataAsync({
                courseId,
                itemMutations: itemsMutatorState
                    .mutations,
                moduleMutations: moduleEditDialogLogic
                    .mutatorRef
                    .current
                    .mutations
            });

            itemsMutatorFunctions
                .resetMutations('NO CALLBACK');

            await refetchCourseContentAdminData();

            showNotification('Mentve', { autoCloseMs: 1000 });
        }
        catch (e) {

            showError(e);
        }
    }, [courseId, itemsMutatorFunctions, itemsMutatorState, moduleEditDialogLogic, refetchCourseContentAdminData, saveCourseDataAsync, showError]);

    const gridColumns = useGridColumnDefinitions(modules, openDialog, itemsMutatorFunctions);

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
