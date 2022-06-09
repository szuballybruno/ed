import { memo, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { CompanyAdminEditPage } from './CompanyAdminEditPage';
import { CompanyAdminIndexPage } from './CompanyAdminIndexPage';

export const CompanyAdminPage = memo(() => {

    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;
    const [companyName, setCompanyName] = useState<string | null>(null);
    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();
    const isEdit = useMemo(() => isMatchingCurrentRoute(editRoute).isMatchingRouteExactly, [isMatchingCurrentRoute]);

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column'
            subRouteLabel={isEdit ? companyName ?? undefined : undefined}>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                        element: <CompanyAdminIndexPage />
                    },
                    {
                        route: applicationRoutes.administrationRoute.companiesRoute.editRoute,
                        element: <CompanyAdminEditPage onNameLoaded={setCompanyName} />
                    }
                ]} />
        </AdminBreadcrumbsHeader >
    );
});