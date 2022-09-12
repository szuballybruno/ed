import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { CompanyAssociatedCourseDTO } from '../../../shared/dtos/company/CompanyAssociatedCourseDTO';
import { Id } from '../../../shared/types/versionId';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

type RowType = CompanyAssociatedCourseDTO;

export const CompanyAdminCoursesPage = () => {

    const { indexRoute, editRoute, coursesRoute } = applicationRoutes.administrationRoute.companiesRoute;

    const companyId = useRouteParams(editRoute)
        .getValue(x => x.companyId, 'int');

    const { courseAssociations, courseAssociationsError, courseAssociationsState } = CompanyApiService
        .useCourseAssociations(companyId);

    const columns: GridColumnType<RowType, Id<'Course'>, any>[] = [
        {
            field: 'title',
            headerName: 'Title'
        }
    ];

    return (
        <AdminSubpageHeader
            direction="column"
            pb="20px"
            tabMenuItems={[
                indexRoute,
                editRoute,
                coursesRoute
            ]}
            navigationQueryParams={{
                companyId
            }}
            headerButtons={[
                {
                    title: 'Save',
                    icon: <EpistoIcons.Save />,
                    action: () => 1
                }
            ]}>
            <EpistoDataGrid
                columns={columns}
                rows={courseAssociations}
                getKey={x => x.courseId} />
        </AdminSubpageHeader>
    );
};