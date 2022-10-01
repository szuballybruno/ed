import { memo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { CompanyAdminActivationCodesPage } from './CompanyAdminActivationCodesPage';
import { CompanyAdminCoursesPage } from './CompanyAdminCoursesPage';
import { CompanyAdminEditPage } from './CompanyAdminEditPage';
import { CompanyAdminIndexPage } from './CompanyAdminIndexPage';

export const CompanyAdminPage = memo(() => {

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { indexRoute, editRoute, coursesRoute, activationCodesRoute } = companiesRoute;
    const [companyName, setCompanyName] = useState<string | null>(null);

    const subRouteLabel = (() => {

        const isEdit = isMatchingCurrentRoute(editRoute).isMatchingRouteExactly;
        const isCoursesRoute = isMatchingCurrentRoute(coursesRoute).isMatchingRouteExactly;

        if (!companyName)
            return undefined;

        if (isEdit || isCoursesRoute)
            return companyName;

        return undefined;
    })();

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column'
            subRouteLabel={subRouteLabel}>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: indexRoute,
                        element: <CompanyAdminIndexPage />
                    },
                    {
                        route: editRoute,
                        element: <CompanyAdminEditPage onNameLoaded={setCompanyName} />
                    },
                    {
                        route: coursesRoute,
                        element: <CompanyAdminCoursesPage />
                    },
                    {
                        route: activationCodesRoute,
                        element: <CompanyAdminActivationCodesPage />
                    }
                ]} />
        </AdminBreadcrumbsHeader >
    );
});