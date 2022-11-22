import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { RoleAdminIndexPage } from './RoleAdminIndexPage';

export const RoleAdminPage = () => {

    return (
        <AdminBreadcrumbsHeader>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.administrationRoute.rolesRoute.indexRoute,
                        element: <RoleAdminIndexPage />
                    }
                ]} />
        </AdminBreadcrumbsHeader >
    );
};