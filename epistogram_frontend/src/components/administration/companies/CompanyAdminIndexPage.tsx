import { Flex } from '@chakra-ui/react';
import { Add, Delete, Edit } from '@mui/icons-material';
import { memo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompaniesAdmin, useCreateCompany, useDeleteCompany } from '../../../services/api/companyApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { usePostCallback } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminIndexPage = memo(() => {

    const { navigate2 } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;

    // http
    const { companies, companiesState, companiesError, refetchCompanies } = useCompaniesAdmin();
    const { createCompanyAsync, createCompanyState } = useCreateCompany();
    const { deleteCompanyAsync, deleteCompanyState } = useDeleteCompany();

    const handleCreateCompany = usePostCallback(createCompanyAsync, [refetchCompanies]);
    const handleDeleteCompany = usePostCallback(deleteCompanyAsync, [refetchCompanies]);

    return (
        <LoadingFrame
            loadingState={[companiesState, createCompanyState, deleteCompanyState]}
            error={companiesError}
            className='whall'
            direction='column'>

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.companiesRoute.indexRoute
                ]}
                headerButtons={[
                    {
                        title: 'Add',
                        icon: <Add></Add>,
                        action: handleCreateCompany
                    }
                ]}>

                {companies
                    .map((company, index) => (
                        <Flex
                            key={index}
                            align='center'>

                            <EpistoFont>
                                {company.name}
                            </EpistoFont>

                            <EpistoButton
                                onClick={() => navigate2(editRoute, { companyId: company.id })}>
                                <Edit></Edit>
                            </EpistoButton>

                            <EpistoButton
                                onClick={handleDeleteCompany}>
                                <Delete />
                            </EpistoButton>
                        </Flex>
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});