import { Flex } from '@chakra-ui/react';
import { Edit } from '@mui/icons-material';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../../models/types';
import { useCompaniesAdmin } from '../../../services/api/companiesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { ArrayBuilder, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminPage = () => {

    const IndexPage = () => {

        const { companies, companiesState } = useCompaniesAdmin();
        const { navigateWithParams } = useNavigation();
        const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;

        return (
            <LoadingFrame
                loadingState={companiesState}
                className='whall'
                direction='column'>

                {companies
                    .map((company, index) => (
                        <Flex
                            key={index}
                            align='center'>

                            <EpistoFont>
                                {company.name}
                            </EpistoFont>

                            <EpistoButton
                                onClick={() => navigateWithParams(editRoute, { companyId: company.id })}>
                                <Edit></Edit>
                            </EpistoButton>
                        </Flex>
                    ))}
            </LoadingFrame>
        );
    };

    const EditPage = () => {

        const compnayId = useIntParam('companyId');

        return <>
            {compnayId}
        </>;
    };

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column' >

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                navigationQueryParams={{
                    companyId: 1
                }}
                tabMenuItems={new ArrayBuilder<ApplicationRoute>()
                    .add(applicationRoutes.administrationRoute.companiesRoute.indexRoute)
                    .addIf(isMatchingCurrentRoute(editRoute).isMatchingRouteExactly, editRoute)
                    .getArray()}>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                            element: <IndexPage />
                        },
                        {
                            route: applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute,
                            element: <EditPage />
                        }
                    ]} />

            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader >
    );
};