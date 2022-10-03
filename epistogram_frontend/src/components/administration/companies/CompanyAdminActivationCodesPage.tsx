import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { parseIntOrNull } from '../../../static/frontendHelpers';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminActivationCodesPage = () => {

    const { indexRoute, editRoute, coursesRoute, activationCodesRoute } = applicationRoutes.administrationRoute.companiesRoute;
    const activationCodeCount = useEpistoEntryState({
        isMandatory: true,
        validateFunction: (value) => {

            if (value === '0')
                return 'Nem adhatsz hozzá \'0\' aktivációs kódot.';

            if (!parseIntOrNull(value))
                return 'Helytelen formátum';

            return null;
        }
    });
    const { createCompanyActivationCodesAsync } = CompanyApiService.useCreateCompanyActivationCodes();

    const companyId = useRouteParams(editRoute)
        .getValue(x => x.companyId, 'int');

    const handleCreateActivationCodes = () => {

        createCompanyActivationCodesAsync({
            activationCodeCount: parseInt(activationCodeCount.value),
            companyId: companyId
        });
    };

    return <AdminSubpageHeader
        direction="column"
        pb="20px"
        tabMenuItems={[
            indexRoute,
            editRoute,
            coursesRoute,
            activationCodesRoute
        ]}
        navigationQueryParams={{
            companyId
        }}>

        <EpistoEntryNew
            style={{
                background: '#AAA',
                margin: '10px',
                borderRadius: '7px'
            }}
            state={activationCodeCount} />

        <EpistoButton
            onClick={() => handleCreateActivationCodes()}
            variant='colored'
            margin={{
                all: 'px10'
            }}>

            Aktivációs kódok generálása
        </EpistoButton>

    </AdminSubpageHeader>;
};