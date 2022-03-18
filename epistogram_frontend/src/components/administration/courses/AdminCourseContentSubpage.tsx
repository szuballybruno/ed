import { Flex } from "@chakra-ui/react";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VideocamIcon from '@mui/icons-material/Videocam';
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CourseAdminItemShortDTO, CourseAdminItemShortNewDTO } from "../../../shared/dtos/CourseAdminItemShortDTO";
import { CourseContentEditDataDTO } from "../../../shared/dtos/CourseContentEditDataDTO";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { useCourseContentEditData, useSaveCourseContentData } from "../../../services/api/courseApiService";
import { useCreateExam, useDeleteExam } from "../../../services/api/examApiService";
import { useCreateModule, useDeleteModule } from "../../../services/api/moduleApiService";
import { usePretestExamId } from "../../../services/api/pretestApiService";
import { useCreateVideo, useDeleteVideo } from "../../../services/api/videoApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { insertAtIndex, isNullOrUndefined, swapItems } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { EpistoHeader } from "../../EpistoHeader";
import { LoadingFrame } from "../../system/LoadingFrame";
import { CollapseItem } from "../../universal/CollapseItem";
import { DragAndDropContext, DragItem, DropZone } from "../../universal/DragAndDrop";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { CourseEditItemView } from "./CourseEditItemView";
import { AdminCourseList } from "./AdminCourseList";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader";
import { CourseAdminListItemDTO } from "../../../shared/dtos/CourseAdminListItemDTO";
import { Add } from "@mui/icons-material";
import { EpistoPopper } from "../../controls/EpistoPopper";
import { AdminCourseContentDataGridControl } from "./AdminCourseContentDataGridControl";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <EpistoFont>{props.value}</EpistoFont>
}

export const AdminCourseContentSubpage = (props: {
    courses: CourseAdminListItemDTO[],
    refetchCoursesFunction: () => void,
    navigationFunction: (courseId: number) => void
}) => {

    const { courses, refetchCoursesFunction, navigationFunction } = props
    const ref = useRef(null);

    // util
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const currentCourse = courses.find(course => course.courseId === courseId)
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic();

    // state
    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])
    const [items, setItems] = useState<CourseAdminItemShortNewDTO[]>([])
    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);
    const [isDataGridView, setIsDataGridView] = useState<boolean>(true)
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false)

    // http
    const { courseContentEditData, courseContentEditDataError, courseContentEditDataState, refetchCourseContentEditData } = useCourseContentEditData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();
    const { pretestExamId, pretestExamIdError, pretestExamIdState } = usePretestExamId(courseId);
    const { createVideoAsync } = useCreateVideo();
    const { createExamAsync } = useCreateExam();
    const { deleteVideoAsync } = useDeleteVideo();
    const { deleteExamAsync } = useDeleteExam();
    const { createModuleAsync } = useCreateModule();
    const { deleteModuleAsync } = useDeleteModule();

    // calc 
    const isAnyModulesOpen = openModuleIds.length > 0;

    // nav
    const courseRoutes = applicationRoutes.administrationRoute.coursesRoute;
    const navToVideoStats = (videoId: number) => navigate(courseRoutes.videoStatsRoute.route, { courseId, videoId });
    const navToVideoEdit = (videoId: number) => navigate(courseRoutes.editVideoRoute.route, { courseId, videoId });
    const navToExamEdit = (examId: number) => navigate(courseRoutes.editExamRoute.route, { courseId, examId });

    // opens / closes a module 
    const setModuleOpenState = (isOpen: boolean, moduleId: number) => {

        if (isOpen) {

            setOpenModuleIds([...openModuleIds, moduleId]);
        }
        else {

            setOpenModuleIds(openModuleIds.filter(x => x !== moduleId));
        }
    }

    // saves everything. considers 
    // the current order of things in memory,
    // and sets the order indices accordingly 
    const handleSaveCourseAsync = async () => {

        if (!courseContentEditData)
            return;

        const orderedModules = [...modules];

        // set order indices & module ids
        orderedModules
            .forEach((m, mIndex) => {

                m.orderIndex = mIndex;

                m.items
                    .forEach((i, iIndex) => {

                        i.moduleId = m.id;
                        i.orderIndex = iIndex;
                    });
            });

        const dto = {
            courseId: courseId,
            modules: orderedModules
        } as CourseContentEditDataDTO;

        try {

            await saveCourseDataAsync(dto);

            showNotification(translatableTexts.administration.courseContentSubpage.courseSavedSuccessfully);
        }
        catch (e) {

            showError(e);
        }
    }

    // navigates to edit course item 
    const handleEditCourseItem = (courseItem: CourseAdminItemShortDTO) => {

        if (courseItem.type === "exam") {

            navToExamEdit(courseItem.id);
        }
        else {

            navToVideoEdit(courseItem.id);
        }
    }

    const handleCourseItemStatistics = (courseItem: CourseAdminItemShortDTO) => {
        if (courseItem.type === "video")
            navToVideoStats(courseItem.id)
    }

    // adds a course item,
    // video or exam 
    const handleAddCourseItemAsync = async (moduleId: number, type: "video" | "exam") => {

        //await handleSaveCourseAsync();

        try {

            if (type === "video") {

                const idResult = await createVideoAsync(moduleId)
                showNotification(translatableTexts.administration.courseContentSubpage.newVideoAddedSuccessfully);
                //navToVideoEdit(idResult.id);
                refetchCourseContentEditData()
            }

            else {

                const idResult = await createExamAsync(moduleId);
                showNotification(translatableTexts.administration.courseContentSubpage.newExamAddedSuccessfully);
                //navToExamEdit(idResult.id);
                refetchCourseContentEditData()
            }
        } catch (e) {

            showError(e);
        }
    }

    // removes a course item from the list 
    // non async, does not make API calls 
    const removeCourseItem = (code: string) => {

        setModules([...modules]
            .map(x => {
                x.items = x.items.filter(y => y.descriptorCode !== code)
                return x;
            }));
    }

    // deletes a course item 
    // shows warning dialog
    const handleDeleteCourseItemAsync = async (courseItem: CourseAdminItemShortDTO) => {

        // exam
        if (courseItem.type === "exam") {

            deleteWarningDialogLogic
                .openDialog({
                    title: translatableTexts.administration.courseContentSubpage.doYouReallyRemoveTheExam,
                    description: translatableTexts.administration.courseContentSubpage.allQuestionsWillBeLost,
                    buttons: [
                        {
                            title: translatableTexts.administration.courseContentSubpage.removeExam,
                            action: async () => {

                                try {

                                    await deleteExamAsync(courseItem.id);
                                    showNotification(translatableTexts.administration.courseContentSubpage.examRemovedSuccessfully);
                                    removeCourseItem(courseItem.descriptorCode);
                                }
                                catch (e) {

                                    showError(e);
                                }
                            }
                        }
                    ]
                });
        }

        // video
        else {

            deleteWarningDialogLogic
                .openDialog({
                    title: translatableTexts.administration.courseContentSubpage.doYouReallyRemoveTheVideo,
                    description: translatableTexts.administration.courseContentSubpage.uploadedVideoWillBeLost,
                    buttons: [
                        {
                            title: translatableTexts.administration.courseContentSubpage.removeVideo,
                            action: async () => {

                                try {

                                    await deleteVideoAsync(courseItem.id);
                                    showNotification(translatableTexts.administration.courseContentSubpage.videoRemovedSuccessfully);
                                    removeCourseItem(courseItem.descriptorCode);
                                }
                                catch (e) {

                                    showError(e);
                                }
                            }
                        }
                    ]
                });
        }
    }

    // deletes a module,
    // shows a warning dialog
    const handleDeleteModule = async (module: ModuleAdminShortDTO) => {
        deleteWarningDialogLogic
            .openDialog({
                title: translatableTexts.administration.courseContentSubpage.doYouReallyRemoveTheModule,
                description: translatableTexts.administration.courseContentSubpage.uploadedContentWillBeLost,
                buttons: [
                    {
                        title: translatableTexts.administration.courseContentSubpage.removeModule,
                        action: async () => {

                            try {

                                await deleteModuleAsync(module.id);
                                showNotification(translatableTexts.administration.courseContentSubpage.moduleRemovedSuccessfully);
                                setModules(modules.filter(x => x.id !== module.id));
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    }

    // navigate to edit module 
    // saves the changes beforehand
    const handleEditModule = async (module: ModuleAdminShortDTO) => {

        await handleSaveCourseAsync();
        navigate(applicationRoutes.administrationRoute.coursesRoute.editModuleRoute.route, { courseId, moduleId: module.id });
    }

    // adds a new module to the course 
    // saved instantly
    const handleAddNewModuleAsync = async () => {

        try {

            await createModuleAsync({
                courseId: courseId,
                name: translatableTexts.administration.courseContentSubpage.addModule,
                orderIndex: modules.length
            });

            showNotification(translatableTexts.administration.courseContentSubpage.newModuleAddedSuccessfully);
            await refetchCourseContentEditData();
        }
        catch (e) {

            showError(e);
        }
    }

    // move item to the proper module
    // or change order of items in the current module. 
    // order indices ate inteact, will be set when saved.
    const onDragEnd = (srcId: string, destId: string | null, srcIndex: number, destIndex: number | null) => {

        if (isNullOrUndefined(destId) || isNullOrUndefined(destIndex))
            return;

        const newModules = [...modules];

        if (destId === "zone-root") {

            setModules(swapItems(newModules, srcIndex, destIndex!));
        }
        else {

            if (destId === srcId) {

                const module = newModules
                    .filter(x => x.id + "" === destId)[0];

                module.items = swapItems(module.items, srcIndex, destIndex!);

                setModules(newModules);
            }
            else {

                const srcModule = newModules
                    .filter(x => x.id + "" === srcId)[0];

                const destModule = newModules
                    .filter(x => x.id + "" === destId)[0];

                insertAtIndex(destModule.items, destIndex!, srcModule.items[srcIndex]);

                srcModule.items = srcModule.items
                    .filter((x, index) => index !== srcIndex);

                setModules(newModules);
            }
        }
    }

    // opens / closes all modules depending 
    // on if any or none are currently open
    const handleOpenCloseAllModules = () => {

        if (isAnyModulesOpen) {

            setOpenModuleIds([]);
        }
        else {

            setOpenModuleIds(modules.map(x => x.id))
        }
    }

    // effects 
    useEffect(() => {

        if (!courseContentEditData)
            return;

        setModules(courseContentEditData.modules);
        setItems(courseContentEditData.modules.map(module => {
            return module.items.map(item => ({
                ...item,
                module: {
                    id: module.id,
                    name: module.name
                }
            })) as CourseAdminItemShortNewDTO[]
        }).flat())
        setOpenModuleIds(courseContentEditData.modules.map(x => x.id));

    }, [courseContentEditData]);

    /**
     *  Checks if the courseId from params exists in courses. If not, navigate to the first element of courses
     * 
     * TODO: Create a better, more reusable check function
     *   */
    const checkIfCurrentCourseFromUrl = () => {
        const isCourseFound = courses.some(course => course.courseId === courseId);

        if (!isCourseFound && courses[0]) {
            navigate(applicationRoutes.administrationRoute.coursesRoute.route + "/" + courses[0].courseId + "/content")
        }
    }
    checkIfCurrentCourseFromUrl()

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseContentEditDataState]}
        error={courseContentEditDataError}
        className="whall">

        <AdminBreadcrumbsHeader
            breadcrumbs={[
                <BreadcrumbLink
                    title="Kurzusok"
                    iconComponent={applicationRoutes.administrationRoute.coursesRoute.icon}
                    to={applicationRoutes.administrationRoute.coursesRoute.route + "/a/content"} />,
                <BreadcrumbLink
                    title={"" + currentCourse?.title}
                    isCurrent />
            ]}>

            {/* Left side course selector list */}
            <AdminCourseList
                courses={courses}
                navigationFunction={navigationFunction} />

            {/* Right side content */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
                ]}
                //onSave={handleSaveCourseAsync}
                direction="column"
                headerButtons={[
                    {
                        action: () => setIsAddButtonsPopperOpen(true),//handleAddNewModuleAsync(),
                        icon: <Add ref={ref} />,
                        title: translatableTexts.misc.add
                    },
                    {
                        action: () => {

                            navigate(applicationRoutes.administrationRoute.coursesRoute.editExamRoute, {
                                courseId,
                                examId: pretestExamId
                            })
                        },
                        title: "Precourse"
                    },
                    ...!isDataGridView ? [{
                        action: handleOpenCloseAllModules,
                        title: isAnyModulesOpen
                            ? translatableTexts.misc.closeAll
                            : translatableTexts.misc.openAll
                    }] : []
                ]}
                viewSwitchChecked={isDataGridView}
                viewSwitchFunction={() => {
                    setIsDataGridView(p => !p)
                }}>

                {/* Delete dialog */}
                <EpistoDialog logic={deleteWarningDialogLogic} />

                {/* Add buttons popper */}
                <EpistoPopper
                    isOpen={isAddButtonsPopperOpen}
                    target={ref?.current}
                    placementX="left"
                    style={{
                        width: 200,
                        alignItems: "flex-start"
                    }}
                    handleClose={() => setIsAddButtonsPopperOpen(false)}>

                    <EpistoButton>
                        Modul
                    </EpistoButton>
                    <EpistoButton onClick={() => { handleAddCourseItemAsync(Math.min(...modules.map(m => m.id)), "video") }}>
                        Videó
                    </EpistoButton>
                    <EpistoButton onClick={() => { handleAddCourseItemAsync(Math.min(...modules.map(m => m.id)), "exam") }}>
                        Vizsga
                    </EpistoButton>

                </EpistoPopper>

                {/* Show course items in DataGrid or list(will be removed soon) */}
                {isDataGridView

                    /* Show course items in DataGrid */
                    ? <Flex flexGrow={1}>

                        <AdminCourseContentDataGridControl selectableModules={modules} items={items} />
                    </Flex>

                    /* Show course items in list */
                    : <DragAndDropContext onDragEnd={onDragEnd}>

                        <DropZone zoneId="zone-root" groupId="root">
                            {modules
                                .map((module, moduleIndex) => {

                                    return <DragItem
                                        alignHandle="top"
                                        itemId={module.id + ""}
                                        index={moduleIndex}>

                                        <CollapseItem
                                            handleToggle={(targetIsOpen) => setModuleOpenState(targetIsOpen, module.id)}
                                            isOpen={openModuleIds.some(x => x === module.id)}
                                            style={{ width: "100%" }}
                                            header={(ecButton) => <Flex
                                                p="2px">

                                                {ecButton}

                                                <Flex
                                                    width="100%"
                                                    align="center"
                                                    justify="space-between">

                                                    <EpistoHeader
                                                        text={module.name}
                                                        variant="strongSub"
                                                        style={{ marginLeft: "10px" }} />

                                                    <Flex>

                                                        {/* new video */}
                                                        <EpistoButton
                                                            onClick={() => handleAddCourseItemAsync(module.id, "video")}
                                                            style={{ alignSelf: "center", margin: "2px" }}
                                                            padding="2px"
                                                            variant="outlined">
                                                            <Flex>
                                                                <AddIcon />
                                                                <VideocamIcon />
                                                            </Flex>
                                                        </EpistoButton>

                                                        {/* new exam */}
                                                        <EpistoButton
                                                            onClick={() => handleAddCourseItemAsync(module.id, "exam")}
                                                            style={{ alignSelf: "center", margin: "2px" }}
                                                            padding="2px"
                                                            variant="outlined">
                                                            <Flex>
                                                                <AddIcon />
                                                                <AssignmentIcon />
                                                            </Flex>
                                                        </EpistoButton>

                                                        {/* edit module */}
                                                        <EpistoButton
                                                            onClick={() => handleEditModule(module)}>
                                                            <EditIcon />
                                                        </EpistoButton>

                                                        {/* delete module */}
                                                        <EpistoButton
                                                            onClick={() => handleDeleteModule(module)}>
                                                            <DeleteIcon />
                                                        </EpistoButton>
                                                    </Flex>
                                                </Flex>
                                            </Flex>}>

                                            <DropZone
                                                width="100%"
                                                my="5px"
                                                mt="10px"
                                                zoneId={module.id + ""}
                                                groupId="child">

                                                {module
                                                    .items
                                                    .map((item, itemIndex) => {

                                                        return <DragItem
                                                            itemId={item.descriptorCode}
                                                            index={itemIndex}>

                                                            <CourseEditItemView
                                                                moduleIndex={moduleIndex}
                                                                index={itemIndex}
                                                                item={item}
                                                                deleteCourseItem={handleDeleteCourseItemAsync}
                                                                showCourseItemStats={handleCourseItemStatistics}
                                                                editCourseItem={handleEditCourseItem}
                                                                isShowDivider={itemIndex + 1 < module.items.length} />
                                                        </DragItem>
                                                    })}
                                            </DropZone>
                                        </CollapseItem>
                                    </DragItem>
                                })}
                        </DropZone>
                    </DragAndDropContext>}
            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader>
    </LoadingFrame >
};
