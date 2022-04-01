import { DataGridPro, GridColDef, GridRowsProp } from "@mui/x-data-grid-pro";

export const AdminUserExamsDataGridControl = () => {

    const exams = [{
        id: 0
    }];

    const getRowsFromExams = () => exams.map((exam) => {
        return {
            id: exam.id,
        };
    });

    const examRows: GridRowsProp = getRowsFromExams();

    const examColumns: GridColDef[] = [
        { field: "avatar", headerName: "Thumbnail kép", width: 130, renderCell: (params) => <img src={params.value} /> },
        { field: "title", headerName: "Cím", width: 300, editable: true, resizable: true },
        { field: "progress", headerName: "Haladás", width: 150, resizable: true },
        { field: "currentPerformance", headerName: "Jelenlegi teljesítmény", width: 150, resizable: true },
        { field: "watchedVideos", headerName: "Megtekintett videók", width: 150, resizable: true },
        { field: "doneExams", headerName: "Elvégzett vizsgák", width: 150, resizable: true },
        { field: "isFinalExamDone", headerName: "Kurzuszáró vizsga", width: 150, resizable: true },
        { field: "currentTempomatMode", headerName: "Jelenlegi tempomat mód", width: 150, resizable: true },
        { field: "recommendedVideosCount", headerName: "Ajánlott videók hetente", width: 150, resizable: true }
    ];

    return <DataGridPro rows={examRows}
columns={examColumns} />;
};