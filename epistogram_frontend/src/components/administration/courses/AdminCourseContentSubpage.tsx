import { Add } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useCourseContentEditData, useSaveCourseContentData } from "../../../services/api/courseApiService";
import { useCreateExam, useDeleteExam } from "../../../services/api/examApiService";
import { useCreateModule, useDeleteModule } from "../../../services/api/moduleApiService";
import { usePretestExamId } from "../../../services/api/pretestApiService";
import { useCreateVideo, useDeleteVideo } from "../../../services/api/videoApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { CourseAdminItemShortDTO, CourseAdminItemShortNewDTO } from "../../../shared/dtos/CourseAdminItemShortDTO";
import { CourseContentEditDataDTO } from "../../../shared/dtos/CourseContentEditDataDTO";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoPopper } from "../../controls/EpistoPopper";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { LoadingFrame } from "../../system/LoadingFrame";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminCourseContentDataGridControl } from "./AdminCourseContentDataGridControl";
import { CourseAdministartionFrame } from "./CourseAdministartionFrame";
import { AdminVideoItemModal } from "./modals/AdminVideoItemModal";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <EpistoFont>{props.value}</EpistoFont>
}

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic();
    const courseItemStatisticsModalLogic = useEpistoDialogLogic({ defaultCloseButtonType: "top" });

    // state
    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])
    const [items, setItems] = useState<CourseAdminItemShortNewDTO[]>([])
    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);
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

    // effects 
    useEffect(() => {

        if (!courseContentEditData)
            return;

        const items = courseContentEditData
            .modules
            .flatMap(module => {
                return module
                    .items
                    .map(item => ({
                        ...item,
                        module: {
                            id: module.id,
                            name: module.name
                        }
                    })) as CourseAdminItemShortNewDTO[]
            });

        setItems(items);
    }, [courseContentEditData]);

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseContentEditDataState]}
        error={courseContentEditDataError}
        className="whall">

        {/* frame */}
        <CourseAdministartionFrame>

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
                    }
                ]}>

                {/* Delete dialog */}
                <EpistoDialog logic={deleteWarningDialogLogic} />

                <AdminVideoItemModal logic={courseItemStatisticsModalLogic} />

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

                <AdminCourseContentDataGridControl
                    selectableModules={modules}
                    items={items}
                    handleItemEdit={() => { }}
                    handleItemStatistics={() => { courseItemStatisticsModalLogic.openDialog() }}
                    handleItemRemove={() => { }} />
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >
};
