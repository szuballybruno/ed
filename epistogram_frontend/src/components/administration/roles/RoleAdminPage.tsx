import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { RoleAdminIndexPage } from './RoleAdminIndexPage';

export const RoleAdminPage = () => {

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column'>

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