import { Flex } from '@chakra-ui/react';
import { Add, Edit } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { useCourseContentAdminData, useSaveCourseContentData } from '../../../../services/api/courseApiService';
import { getVirtualId } from '../../../../services/core/idService';
import { useNavigation } from '../../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../../services/core/notifications';
import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { VersionCode } from '../../../../shared/types/versionCode';
import { Environment } from '../../../../static/Environemnt';
import { useForceUpdate } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { XMutatorCore } from '../../../lib/XMutator/XMutatorCore';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { CourseAdministartionFrame } from '../CourseAdministartionFrame';
import { ItemEditDialog } from '../itemEditDialog/ItemEditDialog';
import { ItemEditDialogParams } from '../itemEditDialog/ItemEditDialogTypes';
import { ModuleEditDialog } from '../moduleEdit/ModuleEditDialog';
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
    const moduleEditDialogLogic = useEpistoDialogLogic('module_edit_dialog');
    const isAnySelected = !!courseId && (courseId != -1);

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);
    const [preprocessedItems, setPreprocessedItems] = useState<RowSchema[]>([]);

    // http
    const {
        courseContentAdminData,
        courseContentAdminDataError,
        courseContentAdminDataState,
        refetchCourseContentAdminData
    } = useCourseContentAdminData(courseId, isAnySelected, true);
    const {
        saveCourseDataAsync,
        saveCourseDataState
    } = useSaveCourseContentData();

    // misc
    const modules = useMemo(() => courseContentAdminData?.modules ?? [], [courseContentAdminData]);
    const getItemKey = useCallback((item: CourseContentItemAdminDTO) => item.versionCode, []);
    const getRowKey = useCallback((row: RowSchema) => row.rowKey, []);
    const forceUpdate = useForceUpdate();
    const itemsMutatorRef = useRef(new XMutatorCore<CourseContentItemAdminDTO, 'versionCode', VersionCode>({ keyPropertyName: 'versionCode' }));

    // busy state
    useSetBusy(useSaveCourseContentData, saveCourseDataState);
    useSetBusy(useCourseContentAdminData, courseContentAdminDataState);

    // preprocess items 
    const preprocessItems = useCallback(() => {

        const items = itemsMutatorRef
            .current
            .mutatedItems;

        const preproItems = items
            .map((item, index) => mapToRowSchema(item, index, modules, getItemKey, itemsMutatorRef.current.isMutated))
            .orderBy(x => x.module.orderIndex)
            .groupBy(x => x.module.id)
            .flatMap(x => x
                .items
                .orderBy(i => i.itemOrderIndex));

        setPreprocessedItems(preproItems);
    }, [setPreprocessedItems, modules]);

    // recalc  
    const recalcOrderIndices = useCallback(() => {

        console.log('recalc order');

        itemsMutatorRef
            .current
            .mutatedItems
            .groupBy(x => x.moduleVersionId)
            .forEach(x => x
                .items
                .forEach((x, i) => {

                    console.log(`${x.itemTitle} -> ${i}`);

                    itemsMutatorRef
                        .current
                        .mutate({
                            key: x.versionCode,
                            field: 'itemOrderIndex',
                            newValue: i
                        });
                }));

        console.log(itemsMutatorRef
            .current
            .mutations);
    }, []);

    // set - on post mutations changed 
    useEffect(() => {

        itemsMutatorRef
            .current
            .setOnPostMutationChanged(recalcOrderIndices);
    }, []);

    // set - on mutation changed functions
    useEffect(() => {

        itemsMutatorRef
            .current
            .setOnMutationsChanged(() => {
                preprocessItems();
                forceUpdate();
            });
    }, [preprocessItems]);

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
            moduleEditDialogLogic.openDialog();

    };

    const handleAddRow = (type: 'video' | 'exam') => {

        const moduleVersionId = modules[0].id;

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
                mutations: itemsMutatorRef
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

    if (Environment.loggingSettings.render)
        console.log('Rendering AdminCourseContentSubpage');

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
                        disabled: !itemsMutatorRef.current.isAnyMutated
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
                    afterChangeCallback={refetchCourseContentAdminData} />

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
                        rows={preprocessedItems}
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
