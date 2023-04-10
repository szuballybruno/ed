import { memo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { CompanyAdminCoursesPage } from './CompanyAdminCoursesPage';
import { CompanyAdminEditPage } from './CompanyAdminEditPage';
import { CompanyAdminIndexPage } from './CompanyAdminIndexPage';
import { CompanyAdminFeaturePage } from './CompanyAdminFeaturePage';

export const CompanyAdminPage = memo(() => {

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { editRoute, coursesRoute, featuresRoute } = companiesRoute;
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
        <>
            <AdminBreadcrumbsHeader
                subRouteLabel={subRouteLabel}>
            </AdminBreadcrumbsHeader >

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: companiesRoute,
                        element: <CompanyAdminIndexPage />,
                        asIndexRoute: true
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
                        route: featuresRoute,
                        element: <CompanyAdminFeaturePage />
                    }
                ]} />
        </>
    );
});