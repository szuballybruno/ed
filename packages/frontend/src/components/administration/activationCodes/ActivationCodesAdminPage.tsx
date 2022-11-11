import { Id } from '@episto/commontypes';
import { ActivationCodeListDTO } from '@episto/communication';
import { CompanyApiService } from '../../../services/api/CompanyApiService1';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { CompanySelectorDropdown, useCompanySelectorLogic } from '../users/CompanySelectorDropdown';

export const ActivationCodesAdminPage = () => {

    const { companies } = CompanyApiService.useCompanies();
    const companySelectorLogic = useCompanySelectorLogic({ companies });
    const { miscApiService } = useServiceContainerContext();

    const { activationCodeLinks } = miscApiService
        .useActivationCodesList(companySelectorLogic.activeCompanyId);

    const columns = new EpistoDataGridColumnBuilder<ActivationCodeListDTO, Id<'ActivationCode'>>()
        .add({
            field: 'activationCodeId',
            headerName: 'Ac id'
        })
        .add({
            field: 'companyId',
            headerName: 'Company id'
        })
        .add({
            field: 'code',
            headerName: 'Code'
        })
        .add({
            field: 'trialLengthDays',
            headerName: 'Trial length'
        })
        .add({
            field: 'url',
            headerName: 'Url'
        })
        .add({
            field: 'email',
            headerName: 'Email'
        })
        .add({
            field: 'isUsed',
            headerName: 'Used'
        })
        .add({
            field: 'daysElapsedFromTrial',
            headerName: 'Days elapsed'
        })
        .add({
            field: 'isTrialOver',
            headerName: 'Trial over?'
        })
        .getColumns();

    return (
        <AdminBreadcrumbsHeader
            headerComponent={<CompanySelectorDropdown
                logic={companySelectorLogic} />}>

            <EpistoDataGrid
                columns={columns}
                getKey={x => x.activationCodeId}
                rows={activationCodeLinks} />
        </AdminBreadcrumbsHeader>
    );
};