import { Flex } from "@chakra-ui/react";
import { Add, Delete, Edit, Equalizer } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { DataGridPro, GridColDef, GridRowsProp } from "@mui/x-data-grid-pro";
import { useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useCourseContentAdminData, useSaveCourseContentData } from "../../../services/api/courseApiService";
import { useCreateExam, useDeleteExam } from "../../../services/api/examApiService";
import { useCreateModule, useDeleteModule } from "../../../services/api/moduleApiService";
import { usePretestExamId } from "../../../services/api/pretestApiService";
import { useCreateVideo, useDeleteVideo } from "../../../services/api/videoApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { CourseContentItemAdminDTO } from "../../../shared/dtos/admin/CourseContentItemAdminDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoDataGrid, GridColumnType, GridRowType } from "../../controls/EpistoDataGrid";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoSelect } from "../../controls/EpistoSelect";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { LoadingFrame } from "../../system/LoadingFrame";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AddNewItemPopper } from "./AddNewItemPopper";
import { ChipSmall } from "./ChipSmall";
import { CourseAdministartionFrame } from "./CourseAdministartionFrame";
import { AdminVideoStatisticsModal } from "./modals/AdminVideoStatisticsModal";

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
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false)

    // http
    const { courseContentAdminData, courseContentAdminDataError, courseContentAdminDataState, refreshCourseContentAdminData } = useCourseContentAdminData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();
    const { pretestExamId, pretestExamIdError, pretestExamIdState } = usePretestExamId(courseId);
    const { createVideoAsync } = useCreateVideo();
    const { createExamAsync } = useCreateExam();
    const { deleteVideoAsync } = useDeleteVideo();
    const { deleteExamAsync } = useDeleteExam();
    const { createModuleAsync } = useCreateModule();
    const { deleteModuleAsync } = useDeleteModule();

    // computed
    const items = courseContentAdminData?.items ?? [];
    const modules = courseContentAdminData?.modules ?? [];

    // nav

    // saves everything. considers 
    // the current order of things in memory,
    // and sets the order indices accordingly 
    const handleSaveCourseAsync = async () => {

        // if (!courseContentEditData)
        //     return;

        // const orderedModules = [...modules];

        // // set order indices & module ids
        // orderedModules
        //     .forEach((m, mIndex) => {

        //         m.orderIndex = mIndex;

        //         m.items
        //             .forEach((i, iIndex) => {

        //                 i.moduleId = m.id;
        //                 i.orderIndex = iIndex;
        //             });
        //     });

        // const dto = {
        //     courseId: courseId,
        //     modules: orderedModules
        // } as CourseContentEditDataDTO;

        // try {

        //     await saveCourseDataAsync(dto);

        //     showNotification(translatableTexts.administration.courseContentSubpage.courseSavedSuccessfully);
        // }
        // catch (e) {

        //     showError(e);
        // }
    }

    // adds a course item,
    // video or exam 
    const handleAddCourseItemAsync = async (moduleId: number, type: "video" | "exam") => {

        // //await handleSaveCourseAsync();

        // try {

        //     if (type === "video") {

        //         const idResult = await createVideoAsync(moduleId)
        //         showNotification(translatableTexts.administration.courseContentSubpage.newVideoAddedSuccessfully);
        //         //navToVideoEdit(idResult.id);
        //         refetchCourseContentEditData()
        //     }

        //     else {

        //         const idResult = await createExamAsync(moduleId);
        //         showNotification(translatableTexts.administration.courseContentSubpage.newExamAddedSuccessfully);
        //         //navToExamEdit(idResult.id);
        //         refetchCourseContentEditData()
        //     }
        // } catch (e) {

        //     showError(e);
        // }
    }

    // removes a course item from the list 
    // non async, does not make API calls 
    const removeCourseItem = (code: string) => {

        // setModules([...modules]
        //     .map(x => {
        //         x.items = x.items.filter(y => y.descriptorCode !== code)
        //         return x;
        //     }));
    }

    // deletes a course item 
    // shows warning dialog
    const handleDeleteCourseItemAsync = async (courseItem: CourseContentItemAdminDTO) => {

        // exam
        if (!courseItem.itemIsVideo) {

            deleteWarningDialogLogic
                .openDialog({
                    title: translatableTexts.administration.courseContentSubpage.doYouReallyRemoveTheExam,
                    description: translatableTexts.administration.courseContentSubpage.allQuestionsWillBeLost,
                    buttons: [
                        {
                            title: translatableTexts.administration.courseContentSubpage.removeExam,
                            action: async () => {

                                try {

                                    await deleteExamAsync(courseItem.itemId);
                                    showNotification(translatableTexts.administration.courseContentSubpage.examRemovedSuccessfully);
                                    removeCourseItem(courseItem.itemCode);
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

                                    await deleteVideoAsync(courseItem.itemId);
                                    showNotification(translatableTexts.administration.courseContentSubpage.videoRemovedSuccessfully);
                                    removeCourseItem(courseItem.itemCode);
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
            // await refetchCourseContentEditData();
        }
        catch (e) {

            showError(e);
        }
    }

    type GridSchema = CourseContentItemAdminDTO & {
        quickMenu: number;
        videoFile: string;
    };

    const gridRows: GridRowType<GridSchema>[] = items
        .map((item, index) => {
            return {
                id: index,
                ...item,
                quickMenu: index,
                videoFile: "file_" + item.videoId
            }
        });

    const gridColumns: GridColumnType<GridSchema>[] = [
        {
            field: 'itemOrderIndex',
            headerName: 'Elhelyezkedés',
            width: 80,
            editable: true
        },
        {
            field: 'itemTitle',
            headerName: 'Cím',
            width: 220,
            editable: true,
            resizable: true
        },
        {
            field: 'itemSubtitle',
            headerName: 'Alcím',
            width: 220,
            resizable: true
        },
        {
            field: 'moduleName',
            headerName: 'Modul',
            width: 250,
            renderCell: (row) => {

                return <EpistoSelect
                    items={modules}
                    currentKey={row.moduleId + ""}
                    onSelected={() => { }}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={module => "" + module?.id} />
            },
            editable: true
        },
        {
            field: 'itemIsVideo',
            headerName: 'Típus',
            width: 80,
            renderCell: (row) => {

                return <ChipSmall
                    text={row.itemIsVideo
                        ? "Video"
                        : "Exam"}
                    color={row.itemIsVideo
                        ? "var(--epistoTeal)"
                        : "var(--intenseYellow)"} />
            }
        },
        {
            field: 'videoLength',
            headerName: 'Videó hossza',
            width: 80,
            renderCell: (row) => {

                return <ChipSmall
                    text={formatTime(Math.round(row.videoLength))}
                    color={row.videoLength > 300
                        ? "var(--intenseRed)"
                        : "var(--intenseGreen)"} />
            }
        },
        {
            field: 'itemHasProblems',
            headerName: 'Problémák',
            width: 150,
            renderCell: (params) => {

                return <></>
                // <ChipSmall
                //     title={params.value.issueDescriptions.join()}
                //     text={`${params.value.issueCounter} probléma`}
                //     color={params.value.issueCounter > 0 ? "var(--intenseRed)" : "var(--intenseGreen)"} />,
            },
            resizable: true
        },
        {
            field: 'videoFile',
            headerName: 'Videó fájl',
            width: 180,
            renderCell: (row) => {

                if (row.videoFile)
                    return row.videoFile;

                return <EpistoButton
                    variant="outlined"
                    onClick={() => { }}>

                    Fájl kiválasztása
                </EpistoButton >
            }
        },
        {
            field: 'courseTitle',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: (row) => {

                return (
                    <Flex>
                        <EpistoButton onClick={() => { }}>

                            <Edit />
                        </EpistoButton>

                        <EpistoButton onClick={() => { }}>

                            <Equalizer />
                        </EpistoButton>

                        <EpistoButton onClick={() => { }}>

                            <Delete />
                        </EpistoButton>
                    </Flex>
                )
            }
        }
    ];

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseContentAdminDataState]}
        error={courseContentAdminDataError}
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

                {/* video stats */}
                <AdminVideoStatisticsModal
                    logic={courseItemStatisticsModalLogic} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    ref={ref?.current}
                    onAddItem={() => { }}
                    onClose={() => setIsAddButtonsPopperOpen(false)} />

                {/* data grid */}
                <EpistoDataGrid
                    columns={gridColumns}
                    rows={gridRows} />
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >
};
