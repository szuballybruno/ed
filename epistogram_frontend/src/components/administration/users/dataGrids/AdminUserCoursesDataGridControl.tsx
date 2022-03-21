import { DataGridPro, GridColDef, GridRowsProp } from "@mui/x-data-grid-pro";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { useAdminCourseList } from "../../../../services/api/courseApiService";
import { useNavigation } from "../../../../services/core/navigatior";
import { EpistoButton } from "../../../controls/EpistoButton";
import { useEpistoDialogLogic } from "../../../EpistoDialog";

export const AdminUserCoursesDataGridControl = (props: {
    handleMoreButton: () => void
}) => {

    const { handleMoreButton } = props

    const params = useParams<{ courseId: string, userId: string, }>();

    const userId = parseInt(params.userId);
    const courseId = parseInt(params.courseId);

    const { navigate } = useNavigation()



    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList("");

    const getRowsFromCourses = () => courses.map((course) => {
        return {
            id: course.courseId,
            thumbnailImage: course.thumbnailImageURL,
            title: course.title,
            category: course.category.name,
            subCategory: course.subCategory.name,
            videosCount: course.videosCount,
            moreDetails: course.courseId
        }
    })

    const rows: GridRowsProp = getRowsFromCourses()

    const columns: GridColDef[] = [
        { field: 'thumbnailImage', headerName: 'Thumbnail kép', width: 130, renderCell: (params) => <img src={params.value} /> },
        { field: 'title', headerName: 'Cím', width: 300, editable: true, resizable: true },
        { field: 'progress', headerName: 'Haladás', width: 150, resizable: true },
        { field: 'currentPerformance', headerName: 'Jelenlegi teljesítmény', width: 150, resizable: true },
        { field: 'watchedVideos', headerName: 'Megtekintett videók', width: 150, resizable: true },
        { field: 'doneExams', headerName: 'Elvégzett vizsgák', width: 150, resizable: true },
        { field: 'isFinalExamDone', headerName: 'Kurzuszáró vizsga', width: 150, resizable: true },
        { field: 'currentTempomatMode', headerName: 'Jelenlegi tempomat mód', width: 150, resizable: true },
        { field: 'recommendedVideosCount', headerName: 'Ajánlott videók hetente', width: 150, resizable: true },
        {
            field: 'moreDetails',
            headerName: 'Részletek',
            width: 150,
            renderCell: (params) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() => {
                        handleMoreButton()
                    }} >
                    Bővebben
                </EpistoButton>
        }
    ];

    return <DataGridPro
        rows={rows}
        autoHeight={true}
        columns={columns}
        initialState={{
            pinnedColumns: {
                left: ['thumbnailImage', 'title'],
                right: ['moreDetails']
            }
        }}
        sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: 1
            }
        }}
        style={{
            background: "var(--transparentWhite70)"
        }} />
}

