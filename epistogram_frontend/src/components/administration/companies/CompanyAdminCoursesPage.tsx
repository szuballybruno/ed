import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useRouteParams } from '../../../static/locationHelpers';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminCoursesPage = () => {

    const { indexRoute, editRoute, coursesRoute } = applicationRoutes.administrationRoute.companiesRoute;

    const companyId = useRouteParams(editRoute)
        .getValue(x => x.companyId, 'int');

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
            {companyId}
        </AdminSubpageHeader>
    );
};