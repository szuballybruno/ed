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
import { getVirtualId } from "../../../services/core/idService";
import { useNavigation } from "../../../services/core/navigatior";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { CourseContentItemAdminDTO } from "../../../shared/dtos/admin/CourseContentItemAdminDTO";
import { CourseContentItemIssueDTO } from "../../../shared/dtos/admin/CourseContentItemIssueDTO";
import { CourseModuleShortDTO } from "../../../shared/dtos/admin/CourseModuleShortDTO";
import { OmitProperty } from "../../../shared/types/advancedTypes";
import { CourseItemType } from "../../../shared/types/sharedTypes";
import { formatTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoDataGrid, GridColumnType } from "../../controls/EpistoDataGrid";
import { EpistoEntry } from "../../controls/EpistoEntry";
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
import { useXListMutator } from "./XMutator";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <EpistoFont>{props.value}</EpistoFont>
}

type RowSchema = CourseContentItemAdminDTO & {
    quickMenu: number;
    videoFile: string;
    rowNumber: number;
    errorsWrapper: number;
};

type EditRowFnType = <TField extends keyof RowSchema, >(key: string, field: TField, value: RowSchema[TField]) => void;

const useGridColumnDefinitions = (
    modules: CourseModuleShortDTO[],
    openDialog: (type: "video" | "exam") => void,
    removeRow: (key: string) => void,
    editRow: EditRowFnType,
    isModified: (key: string) => (field: keyof RowSchema) => boolean) => {

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
                color: "var(--intenseYellow)",
                label: "Vizsga"
            }

        if (itemType === "video")
            return {
                color: "var(--epistoTeal)",
                label: "Video"
            }

        if (itemType === "pretest")
            return {
                color: "purple",
                label: "Elo-vizsga"
            }

        if (itemType === "final")
            return {
                color: "yellow",
                label: "Zarovizsga"
            }

        throw new Error("Unexpected type: " + itemType);
    }

    const CellEntry = <TValue extends number | string | null,>(props: {
        value: TValue,
        onValueSet: (value: TValue) => void,
        isInt?: boolean,
        isModified?: boolean
    }) => {

        const { value, onValueSet, isInt, isModified } = props;

        return <EpistoEntry
            type={isInt ? "number" : undefined}
            transparentBackground
            value={value as any}
            marginTop="0"
            style={{
                width: "100%",
                height: "100%",
                background: isModified
                    ? "#ffffbd"
                    : undefined,
                padding: "10px"
            }}
            onFocusLost={x => onValueSet(x as any)} />
    }

    const columnDefGen = <TField extends keyof RowSchema,>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<RowSchema, string, TField>, "field">) => {

        return {
            field,
            ...columnOptions
        }
    }

    const gridColumns: GridColumnType<RowSchema, string, any>[] = [
        columnDefGen("rowNumber", {
            headerName: 'Sorszam',
            width: 80
        }),
        columnDefGen("itemOrderIndex", {
            headerName: 'Elhelyezkedés',
            width: 80,
            renderCell: (key, field, value, row) => {

                if (row.itemType === "pretest")
                    return "-";

                return <CellEntry
                    isModified={isModified(key)(field)}
                    onValueSet={val => editRow(key, field, val!)}
                    value={value ?? null}
                    isInt />;
            }
        }),
        columnDefGen("itemTitle", {
            headerName: 'Cím',
            width: 220,
            resizable: true,
            renderCell: (key, field, value) => <CellEntry
                isModified={isModified(key)(field)}
                value={value}
                onValueSet={x => editRow(key, field, x)} />
        }),
        columnDefGen("itemSubtitle", {
            headerName: 'Alcím',
            width: 220,
            resizable: true,
            renderCell: (key, field, value) => <CellEntry
                isModified={isModified(key)(field)}
                value={value}
                onValueSet={x => editRow(key, field, x)} />
        }),
        columnDefGen("moduleName", {
            headerName: 'Modul',
            width: 250,
            renderCell: (key, field, value, row) => {

                if (row.itemType === "pretest")
                    return "-";

                return <EpistoSelect
                    items={modules}
                    currentKey={row.moduleId + ""}
                    onSelected={() => { }}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={module => "" + module?.id} />
            }
        }),
        columnDefGen("itemType", {
            headerName: 'Típus',
            width: 120,
            renderCell: (key, field, value, row) => {

                if (!row.itemType)
                    return "";

                const { color, label } = getItemTypeValues(row.itemType);

                return <ChipSmall
                    text={label}
                    color={color} />
            }
        }),
        columnDefGen("videoLength", {
            headerName: 'Videó hossza',
            width: 80,
            renderCell: (key, field, value, row) => {

                if (row.itemType === "exam")
                    return "-";

                if (!row.warnings || !row.videoLength)
                    return "";

                const isLengthWarning = row
                    .warnings
                    .any(x => x.code === "video_too_long");

                return <ChipSmall
                    text={formatTime(Math.round(row.videoLength))}
                    color={isLengthWarning
                        ? "var(--intenseOrange)"
                        : "gray"} />
            }
        }),
        columnDefGen("errorsWrapper", {
            headerName: 'Hibak',
            width: 100,
            renderCell: (key, field, value, row) => {

                if (!row.errors)
                    return "";

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
        }),
        columnDefGen("videoFile", {
            headerName: 'Videó fájl',
            width: 180,
            renderCell: (key, field, row) => {

                return <EpistoButton
                    variant="outlined"
                    onClick={() => { }}>

                    Fájl kiválasztása
                </EpistoButton >
            }
        }),
        columnDefGen("quickMenu", {
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: (key, field, value, row) => {

                return (
                    <Flex>
                        <EpistoButton
                            onClick={() => openDialog(row.itemType === "video" ? "video" : "exam")}>

                            <Edit />
                        </EpistoButton>

                        <EpistoButton
                            onClick={() => { }}>

                            <Equalizer />
                        </EpistoButton>

                        <EpistoButton
                            onClickNoPropagation={() => removeRow(row.itemCode!)}>

                            <Delete />
                        </EpistoButton>
                    </Flex>
                )
            }
        })
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

    // http
    const { courseContentAdminData, courseContentAdminDataError, courseContentAdminDataState, refreshCourseContentAdminData } = useCourseContentAdminData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseContentData();

    // computed
    const modules = courseContentAdminData?.modules ?? [];
    const items = (courseContentAdminData?.items ?? []) as RowSchema[];

    const {
        mutatedData,
        add: addRow,
        mutate: mutateRow,
        remove: removeRow,
        isMutated: isRowModified,
        isAnyMutated: isAnyRowsMutated,
        mutations,
        resetMutations
    } = useXListMutator(items, x => x.itemCode, "itemCode");

    const gridRows: RowSchema[] = mutatedData
        .map((item, index) => {

            const { ...rest } = item;

            return {
                ...rest,
                quickMenu: index,
                rowNumber: index,
                videoFile: "file_" + item.videoId,
                errorsWrapper: index
            }
        })
        .orderBy(x => x.moduleOrderIndex)
        .groupBy(x => x.moduleId)
        .flatMap(x => x
            .items
            .orderBy(i => i.itemOrderIndex));

    console.log(gridRows);

    // 
    // FUNCS
    // 

    const closeAddPopper = () => setIsAddButtonsPopperOpen(false);

    const openDialog = (type: "video" | "exam") => {

        if (type === "video") {

            videoEditDialogLogic.openDialog();
        }
        else {

            examEditDialogLogic.openDialog();
        }
    }

    const handleMutateRow: EditRowFnType = (key, field, value) => {

        mutateRow(key, field as any, value);
    }

    const handleAddRow = (type: "video" | "exam") => {

        const moduleId = modules[0].id;

        const moduleOrderIndex = gridRows
            .firstOrNull(x => x.moduleId === moduleId)?.moduleOrderIndex ?? 0;

        const itemOrderIndex = gridRows
            .filter(x => x.moduleId === moduleId && x.itemType !== "pretest")
            .length;

        if (type === "exam") {

            addRow("newcode_" + getVirtualId(), {
                itemType: "exam",
                moduleId,
                itemSubtitle: "",
                itemTitle: "",
                itemOrderIndex,
                moduleOrderIndex,
                courseId
            });
        }
        else {

            addRow("newcode_" + getVirtualId(), {
                itemType: "video",
                moduleId,
                itemSubtitle: "",
                itemTitle: "",
                itemOrderIndex,
                moduleOrderIndex,
                courseId
            });
        }

        closeAddPopper();
    }

    const handleRemoveRow = (key: string) => {

        removeRow(key);
    }

    const handleSaveAsync = async () => {

        try {

            await saveCourseDataAsync(mutations);
            resetMutations();
            refreshCourseContentAdminData();
        }
        catch (e) {

            showError(e);
        }
    }

    const gridColumns = useGridColumnDefinitions(
        modules,
        openDialog,
        handleRemoveRow,
        handleMutateRow,
        isRowModified);

    //
    // EFFECTS
    //

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
                direction="column"
                headerButtons={[
                    {
                        action: () => setIsAddButtonsPopperOpen(true),
                        icon: <Add ref={ref} />,
                        title: translatableTexts.misc.add
                    },
                    {
                        action: handleSaveAsync,
                        title: "Mentes",
                        disabled: !isAnyRowsMutated
                    }
                ]}>

                {/* dialogs */}
                <EpistoDialog logic={deleteWarningDialogLogic} />
                <VideoEditDialog logic={videoEditDialogLogic} />
                <ExamEditDialog logic={examEditDialogLogic} />

                {/* add buttons popper */}
                <AddNewItemPopper
                    isOpen={isAddButtonsPopperOpen}
                    targetElement={ref?.current}
                    onAddItem={handleAddRow}
                    onClose={closeAddPopper} />

                {/* data grid */}
                <EpistoDataGrid
                    columns={gridColumns}
                    rows={gridRows}
                    getKey={x => x.itemCode}
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
