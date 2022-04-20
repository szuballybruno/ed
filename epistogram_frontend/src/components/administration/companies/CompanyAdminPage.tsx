import { Flex } from '@chakra-ui/react';
import { Edit } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../../models/types';
import { useCompaniesAdmin, useCompanyEditData } from '../../../services/api/companiesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { ArrayBuilder, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

const IndexPage = memo(() => {

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
});

const EditPage = memo((props: { onNameLoaded: (name: string) => void }) => {

    const { onNameLoaded } = props;
    const compnayId = useIntParam('companyId')!;

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

            {companyEditData?.name ?? ''}
        </LoadingFrame>
    </>;
}, (p, n) => p.onNameLoaded === n.onNameLoaded);

export const CompanyAdminPage = memo(() => {

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editCompanyRoute;
    const [companyName, setCompanyName] = useState<string | null>(null);
    const isEdit = isMatchingCurrentRoute(editRoute).isMatchingRouteExactly;

    console.log('asd');

    return (
        <AdminBreadcrumbsHeader
            background='white'
            direction='column'
            subRouteLabel={isEdit ? companyName ?? undefined : undefined}>

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                navigationQueryParams={{
                    companyId: 1
                }}
                tabMenuItems={new ArrayBuilder<ApplicationRoute>()
                    .add(applicationRoutes.administrationRoute.companiesRoute.indexRoute)
                    .addIf(isEdit, editRoute)
                    .getArray()}>

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

            </AdminSubpageHeader>
        </AdminBreadcrumbsHeader >
    );
});