import { Flex } from '@chakra-ui/react';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompaniesAdmin, useCompanyEditData, useCreateCompany, useDeleteCompany } from '../../../services/api/companiesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useIsMatchingCurrentRoute, usePostCallback } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

const IndexPage = memo(() => {

    const { navigateWithParams } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;

    // http
    const { companies, companiesState, companiesError, refetchCompanies } = useCompaniesAdmin();
    const { createCompanyAsync, createCompanyState } = useCreateCompany();
    const { deleteCompanyAsync, deleteCompanyState } = useDeleteCompany();

    const [handleCreateCompany] = usePostCallback(createCompanyAsync, [refetchCompanies]);
    const [handleDeleteCompany] = usePostCallback(deleteCompanyAsync, [refetchCompanies]);

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
                                onClick={() => navigateWithParams(editRoute, { companyId: company.id })}>
                                <Edit></Edit>
                            </EpistoButton>

                            <EpistoButton
                                onClick={() => handleDeleteCompany({ companyId: company.id })}>
                                <Delete />
                            </EpistoButton>
                        </Flex>
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});

const EditPage = memo((props: { onNameLoaded: (name: string) => void }) => {

    const { onNameLoaded } = props;
    const compnayId = useIntParam('companyId')!;
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;

    const {
        companyEditData,
        companyEditDataState
    } = useCompanyEditData(compnayId);

    useEffect(() => {

        if (companyEditData?.name)
            onNameLoaded(companyEditData.name);
    }, [companyEditData]);

    return <>
        <LoadingFrame
            loadingState={companyEditDataState}>

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                    editRoute
                ]}
                headerButtons={[
                    {
                        title: 'Save',
                        icon: <Save></Save>,
                        action: () => { console.log(); }
                    }
                ]}>

                {companyEditData?.name ?? ''}
            </AdminSubpageHeader>
        </LoadingFrame>
    </>;
}, (p, n) => p.onNameLoaded === n.onNameLoaded);

export const CompanyAdminPage = memo(() => {

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;
    const [companyName, setCompanyName] = useState<string | null>(null);
    const isEdit = isMatchingCurrentRoute(editRoute).isMatchingRouteExactly;

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column'
            subRouteLabel={isEdit ? companyName ?? undefined : undefined}>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                        element: <IndexPage />
                    },
                    {
                        route: applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute,
                        element: <EditPage onNameLoaded={setCompanyName} />
                    }
                ]} />
        </AdminBreadcrumbsHeader >
    );
});