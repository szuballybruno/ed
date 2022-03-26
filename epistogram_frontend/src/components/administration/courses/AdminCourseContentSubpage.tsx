import { Flex } from "@chakra-ui/react";
import { Add, Delete, Edit, Equalizer } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
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
import { CourseContentItemIssueDTO } from "../../../shared/dtos/admin/CourseContentItemIssueDTO";
import { CourseModuleShortDTO } from "../../../shared/dtos/admin/CourseModuleShortDTO";
import { CourseItemType } from "../../../shared/types/sharedTypes";
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
import { ExamEditDialog } from "./ExamEditDialog";
import { VideoEditDialog } from "./VideoEditDialog";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <EpistoFont>{props.value}</EpistoFont>
}

type RowSchema = CourseContentItemAdminDTO & {
    quickMenu: number;
    videoFile: string;
    rowNumber: number;
};

type RowType = GridRowType<RowSchema>;

const useGridColumnDefinitions = (
    modules: CourseModuleShortDTO[],
    openDialog: (type: "video" | "exam") => void) => {

    const getIssueText = (dto: CourseContentItemIssueDTO) => {

        if (dto.code === "ans_miss")
            return `Valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

        if (dto.code === "corr_ans_miss")
            return `Helyesnek megjelolt valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

        if (dto.code === "questions_missing")
            return `Kerdesek hianyoznak`;

        if (dto.code === "video_too_long")
            return `Video tul hosszu`;

        return null;
    }

    const getItemTypeValues = (itemType: CourseItemType): { label: string, color: any } => {

        if (itemType === "exam")
            return {
                color: "var(--deepOrange)",
                label: "Vizsga"
            }

        if (itemType === "video")
            return {
                color: "var(--deepBlue)",
                label: "Videó"
            }

        if (itemType === "pretest")
            return {
                color: "purple",
                label: "Szintfelmérő"
            }

        if (itemType === "final")
            return {
                color: "orange",
                label: "Záróvizsga"
            }

        throw new Error("Unexpected type: " + itemType);
    }

    const gridColumns: GridColumnType<RowSchema>[] = [
        {
            field: 'rowNumber',
            headerName: 'Sorszám',
            width: 80
        },
        /* {
            field: 'itemOrderIndex',
            headerName: 'Elhelyezkedés',
            width: 80,
            renderCell: (row) => {

                if (row.itemType === "pretest")
                    return "-";

                return row.itemOrderIndex;
            }
        }, */
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

                if (row.itemType === "pretest")
                    return "-";

                return <EpistoSelect
                    items={modules}
                    currentKey={row.moduleId + ""}
                    onSelected={() => { }}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={module => "" + module?.id} />
            }
        },
        {
            field: 'itemType',
            headerName: 'Típus',
            width: 120,
            renderCell: (row) => {

                const { color, label } = getItemTypeValues(row.itemType);

                return <ChipSmall
                    text={label}
                    color={color} />
            }
        },
        {
            field: 'videoLength',
            headerName: 'Videó hossza',
            width: 80,
            renderCell: (row) => {

                if (row.itemType === "exam")
                    return "-";

                const isLengthWarning = row
                    .warnings
                    .any(x => x.code === "video_too_long");

                return <ChipSmall
                    text={formatTime(Math.round(row.videoLength))}
                    color={isLengthWarning
                        ? "var(--intenseOrange)"
                        : "gray"} />
            }
        },
        {
            field: 'errors',
            headerName: 'Hibák',
            width: 100,
            renderCell: (row) => {

                const hasErrors = row.errors.length > 0;

                return <ChipSmall
                    text={hasErrors
                        ? `${row.errors.length} hiba`
                        : "Nincs hiba"}
                    tooltip={row
                        .errors
                        .map(x => getIssueText(x))
                        .join("\n")}
                    color={hasErrors
                        ? "var(--intenseRed)"
                        : "var(--intenseGreen)"} />
            }
        },
        {
            field: 'videoFile',
            headerName: 'Videó fájl',
            width: 180,
            renderCell: (row) => {

                return <EpistoButton
                    variant="outlined"
                    onClick={() => { }}>

                    Fájl kiválasztása
                </EpistoButton >
            }
        },
        {
            field: 'quickMenu',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: (row) => {

                return (
                    <Flex>
                        <EpistoButton
                            onClick={() => openDialog(row.itemType === "video" ? "video" : "exam")}>

                            <Edit />
                        </EpistoButton>

                        <EpistoButton onClick={() => { }}>

                            <Equalizer />
                        </EpistoButton>

                        <EpistoButton onClick={() => { }}>

                            <Delete />
                        </EpistoButton>
                    </Flex >
                )
            }
        }
    ];

    return gridColumns;
}

export const AdminCourseContentSubpage = () => {

    // util
    const ref = useRef(null);
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const deleteWarningDialogLogic = useEpistoDialogLogic("dvd");
    const videoEditDialogLogic = useEpistoDialogLogic("video_edit_dialog", { defaultCloseButtonType: "top" });
    const examEditDialogLogic = useEpistoDialogLogic("exam_edit_dialog", { defaultCloseButtonType: "top" });

    // state
    const [isAddButtonsPopperOpen, setIsAddButtonsPopperOpen] = useState<boolean>(false);
    const [gridRows, setGridRows] = useState<RowType[]>([]);
    // const [gridRowMutations, gridRowMutations] = useState<RowType[]>([]);

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
    const modules = courseContentAdminData?.modules ?? [];

    // type ListT = {
    //     id: number,
    //     name: string,
    //     car: string
    // }

    // const list: ListT[] = [
    //     {
    //         id: 1,
    //         name: "asd1",
    //         car: "bmw",
    //     },
    //     {
    //         id: 2,
    //         name: "dwdw2",
    //         car: "merdzso"
    //     }
    // ]

    // const { mutatedData, add, mutate, remove } = useXListMutator(list, x => x.id);

    // console.log(mutatedData);

    // useEffect(() => {

    //     add(3, { car: "audi", name: "ben" });
    // });

    // 
    // FUNCS
    // 

    const openDialog = (type: "video" | "exam") => {

        if (type === "video") {

            videoEditDialogLogic.openDialog();
        }
        else {

            examEditDialogLogic.openDialog();
        }
    }

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
        if (courseItem.itemType === "exam") {

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

    const mutateRow = (newValue: RowType) => {

        const newItems = [...gridRows];
        const rowIndex = gridRows
            .findIndex(x => x.id === newValue.id);

        newItems[rowIndex] = newValue;

        setGridRows(newItems);
    }

    const gridColumns = useGridColumnDefinitions(modules, openDialog);

    //
    // EFFECTS
    //

    // run on first load 
    useEffect(() => {

        if (!courseContentAdminData)
            return;

        const gridRows: RowType[] = courseContentAdminData
            .items
            .map((item, index) => {
                return {
                    id: index,
                    ...item,
                    quickMenu: index,
                    rowNumber: index,
                    videoFile: "file_" + item.videoId
                }
            });

        setGridRows(gridRows);

    }, [courseContentAdminData]);

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
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
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

                        },
                        title: "Mentés"
                    }
                ]}>

                {/* dialogs */}
                <EpistoDialog logic={deleteWarningDialogLogic} />
                <VideoEditDialog logic={videoEditDialogLogic} />
                <ExamEditDialog logic={examEditDialogLogic} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    ref={ref?.current}
                    onAddItem={() => { }}
                    onClose={() => setIsAddButtonsPopperOpen(false)} />

                {/* data grid */}
                <EpistoDataGrid
                    columns={gridColumns}
                    rows={gridRows}
                    onEdit={mutateRow}
                    initialState={{
                        pinnedColumns: {
                            left: ['rowNumber', 'itemTitle'],
                            right: ['quickMenu']
                        }
                    }} />
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >
};
