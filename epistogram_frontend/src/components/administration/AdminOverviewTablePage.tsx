import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { useAdminCourseList } from "../../services/api/courseApiService";
import { useNavigation } from "../../services/core/navigatior";
import { AdminBreadcrumbsHeader } from "./AdminBreadcrumbsHeader";

export const AdminOverviewTablePage = () => {

    const [searchText, setSearchText] = useState<string | null>(null);

    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList(searchText + "");

    const { navigate } = useNavigation();


    const getRowsFromCourses = () => courses.map((course) => {
        return {
            id: course.courseId,
            avatar: course.thumbnailImageURL,
            title: course.title,
            category: course.category.name,
            subCategory: course.subCategory.name,
            videosCount: course.videosCount,
            editCourse: course.courseId
        };
    });

    const courseRows: GridRowsProp = getRowsFromCourses();

    const columns: GridColDef[] = [
        // { field: 'avatar', headerName: 'Thumbnail kép', width: 130, renderCell: (params) => <img src={params.value} /> },
        // { field: 'title', headerName: 'Cím', width: 300, editable: true, resizable: true },
        // { field: 'category', headerName: 'Kategória', width: 150, resizable: true },
        // { field: 'subCategory', headerName: 'Alkategória', width: 150, resizable: true },
        // { field: 'videosCount', headerName: 'Videók száma', width: 150, resizable: true },
        // { field: 'editCourse', headerName: 'Kurzus szerkesztése', width: 150, renderCell: (params) => <EpistoButton variant="outlined" onClick={() => navigate(applicationRoutes.administrationRoute.coursesRoute.route + "/" + params.value + "/details")}>Szerkesztés</EpistoButton> }
    ];

    return <AdminBreadcrumbsHeader>
        <DataGrid rows={courseRows}
columns={columns}
style={{
            background: "var(--transparentWhite70)"
        }} />
    </AdminBreadcrumbsHeader>;
};