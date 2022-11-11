import { CompanyApiService } from '../../../services/api/CompanyApiService1';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { CompanySelectorDropdown, useCompanySelectorLogic } from '../users/CompanySelectorDropdown';

export const ActivationCodesAdminPage = () => {

    const { companies } = CompanyApiService.useCompanies();
    const companySelectorLogic = useCompanySelectorLogic({ companies });
    const { miscApiService } = useServiceContainerContext();

    const { activationCodeLinks } = miscApiService
        .useActivationCodesList(companySelectorLogic.activeCompanyId);

    return (
        <AdminBreadcrumbsHeader
            headerComponent={<CompanySelectorDropdown
                logic={companySelectorLogic} />}>
            <EpistoFlex2>
                <EpistoFont
                    style={{
                        whiteSpace: 'pre-wrap'
                    }}>

                    {activationCodeLinks.join('\n')}
                </EpistoFont>
            </EpistoFlex2>
        </AdminBreadcrumbsHeader>
    );
};