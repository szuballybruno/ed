import { Flex } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompaniesAdmin } from '../../../services/api/companiesApiService';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminPage = () => {

    const IndexPage = () => {

        const { companies, companiesState } = useCompaniesAdmin();

        return (
            <LoadingFrame
                loadingState={companiesState}
                className='whall'>

                {companies
                    .map((company, index) => (
                        <Flex key={index}>
                            {company.name}
                        </Flex>
                    ))}
            </LoadingFrame>
        );
    };

    const EditPage = () => {

        return <>
            edit
        </>;
    };

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
                tabMenuItems={[
                    applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                    applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute
                ]}>

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