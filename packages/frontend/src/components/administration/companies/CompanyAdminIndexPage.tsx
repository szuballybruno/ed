import { Id } from '@episto/x-core/dist/Id';
import { Add } from '@mui/icons-material';
import { memo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/CompanyApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { usePostCallback } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { useAdminBreadcrumbsContext } from '../breadcrumbsHeader/AdminBreadcrumbsContext';

export const CompanyAdminIndexPage = memo(() => {

    const { navigate2 } = useNavigation();
    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { editRoute, coursesRoute } = companiesRoute;
    const { activeCompanyId } = useAdminBreadcrumbsContext();

    // http
    const { companies, companiesState, companiesError, refetchCompanies } = CompanyApiService.useCompaniesAdmin();
    const { createCompanyAsync, createCompanyState } = CompanyApiService.useCreateCompany();
    const { deleteCompanyAsync, deleteCompanyState } = CompanyApiService.useDeleteCompany();

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
                    companiesRoute
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
                        <EpistoFlex2
                            key={index}
                            align='center'>

                            <EpistoFont>
                                {company.name}
                            </EpistoFont>

                            <EpistoButton
                                onClick={() => navigate2(editRoute, { activeCompanyId, companyId: company.id })}>
                                <EpistoIcons.Edit />
                            </EpistoButton>

                            <EpistoButton
                                onClick={() => navigate2(coursesRoute, { activeCompanyId, companyId: company.id })}>
                                <EpistoIcons.Courses />
                            </EpistoButton>

                            <EpistoButton
                                onClick={() => handleDeleteCompany({ companyId: Id.read(company.id) })}>
                                <EpistoIcons.Delete />
                            </EpistoButton>
                        </EpistoFlex2>
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});