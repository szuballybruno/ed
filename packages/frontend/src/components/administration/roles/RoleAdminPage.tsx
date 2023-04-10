import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { RoleAdminIndexPage } from './RoleAdminIndexPage';

export const RoleAdminPage = () => {

    return (
        <>
            <AdminBreadcrumbsHeader>
            </AdminBreadcrumbsHeader >

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.administrationRoute.rolesRoute,
                        element: <RoleAdminIndexPage />,
                        asIndexRoute: true
                    }
                ]} />
        </>
    );
};