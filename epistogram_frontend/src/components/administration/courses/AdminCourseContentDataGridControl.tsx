import { Flex } from "@chakra-ui/react";
import { Delete, Edit, Equalizer } from "@mui/icons-material";
import { GridRowsProp } from "@mui/x-data-grid";
import { GridColDef, DataGridPro } from "@mui/x-data-grid-pro";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useNavigation } from "../../../services/core/navigatior";
import { CourseAdminItemShortDTO, CourseAdminItemShortNewDTO } from "../../../shared/dtos/CourseAdminItemShortDTO";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoSelect } from "../../controls/EpistoSelect";
import { ChipSmall } from "./CourseEditItemView";


/**
 * TODO: Add select/upload video function
 * TODO: Add Edit items functionality
 * TODO: Add Remove items functionality
 * TODO: Add Drag&Drop reorder functionality
 * TODO: Add Edit questions modal for video
 * TODO: Add Edit questions modal for exam
 */

export const AdminCourseContentDataGridControl = (props: {
    selectableModules: ModuleAdminShortDTO[],
    items: CourseAdminItemShortNewDTO[]
}) => {

    const { selectableModules, items } = props

    const { navigate } = useNavigation()
    const navToVideoStats = (videoId: number) => navigate(applicationRoutes.administrationRoute.coursesRoute.videoStatsRoute.route, { videoId });

    const useGetRowsFromModules = () => items.map((item) => {
        return {
            id: item.id,
            title: item.title,
            subTitle: item.subTitle,
            module: item.module as ModuleAdminShortDTO,
            type: {
                type: item.type,
                typeLabel: item.type === "video" ? "Videó" : "Vizsga"
            },
            videoLength: {
                type: item.type,
                videoLength: item.videoLength
            },
            orderIndex: item.orderIndex,
            issues: getIssuesCountFromCourseItem(item),
            videoFile: item.videoLength,
            item: item
        }
    })

    const getIssuesCountFromCourseItem = (item: CourseAdminItemShortNewDTO) => {

        /* check video issues */
        const getIssuesCountFromVideoItem = (item: CourseAdminItemShortNewDTO) => {
            let issueCounter = 0
            let issueDescriptions: string[] = []

            /* Check if video exists */
            if (item.videoLength === 0 || !item.videoLength) {
                issueCounter++
                issueDescriptions.push("Nincs videó feltöltve")
            }


            if (!item.questionCount || item.questionCount !== 1) {
                issueCounter++
                issueDescriptions.push("Nincs kérdés feltöltve")
            }

            return {
                issueCounter: issueCounter,
                issueDescriptions: issueDescriptions
            }
        }

        return getIssuesCountFromVideoItem(item)

    }


    const moduleRows: GridRowsProp = useGetRowsFromModules()

    const courseItemColumns: GridColDef[] = [
        {
            field: 'orderIndex',
            headerName: 'Elhelyezkedés',
            width: 80,
            editable: true
        },
        {
            field: 'title',
            headerName: 'Cím',
            width: 220,
            editable: true,
            resizable: true
        },
        {
            field: 'subTitle',
            headerName: 'Alcím',
            width: 220,
            resizable: true
        },
        {
            field: 'module',
            headerName: 'Modul',
            width: 250,
            renderCell: (params) => {
                const currentModule = params.value as ModuleAdminShortDTO
                return <EpistoSelect
                    items={selectableModules}
                    selectedValue={currentModule}
                    onSelected={() => { }}
                    getDisplayValue={x => "" + x?.name}
                    getCompareKey={module => "" + module?.id} />
            },
            editable: true
        },
        {
            field: 'type',
            headerName: 'Típus',
            width: 80,
            renderCell: (params) =>
                <ChipSmall
                    text={params.value.typeLabel}
                    color={params.value.type === "video" ? "var(--epistoTeal)" : "var(--intenseYellow)"} />
        },
        {
            field: 'videoLength',
            headerName: 'Videó hossza',
            width: 80,
            renderCell: (params) =>
                <ChipSmall
                    text={formatTime(Math.round(params.value.videoLength))}
                    color={params.value.videoLength > 300 ? "var(--intenseRed)" : "var(--intenseGreen)"} />
        },
        {
            field: 'issues',
            headerName: 'Problémák',
            width: 150,
            renderCell: (params) =>
                <ChipSmall
                    title={params.value.issueDescriptions.join()}
                    text={`${params.value.issueCounter} probléma`}
                    color={params.value.issueCounter > 0 ? "var(--intenseRed)" : "var(--intenseGreen)"} />,
            resizable: true
        },
        {
            field: 'videoFile',
            headerName: 'Videó fájl',
            width: 180,
            renderCell: (params) =>
                params.value === 0 && <EpistoButton
                    variant="outlined"
                    onClick={() => { }}>

                    Fájl kiválasztása
                </EpistoButton >
        },
        {
            field: 'item',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: (params) =>
                <Flex>
                    <EpistoButton onClick={() => { }}>

                        <Edit />
                    </EpistoButton>

                    <EpistoButton onClick={() => {
                        if (params.value.type === "video")
                            navToVideoStats(params.value.id)
                    }}>

                        <Equalizer />
                    </EpistoButton>

                    <EpistoButton onClick={() => { }}>

                        <Delete />
                    </EpistoButton>
                </Flex>
        }
    ];

    return <DataGridPro
        className="fontExtraSmall"
        rows={moduleRows}
        columns={courseItemColumns}
        initialState={{ pinnedColumns: { left: ['orderIndex', 'title'], right: ['item'] } }}
        style={{
            background: "var(--transparentWhite70)"
        }} />

}