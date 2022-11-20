import { Id } from '@episto/commontypes';
import { ActivationCodeListDTO } from '@episto/communication';
import { CompanyApiService } from '../../../services/api/CompanyApiService';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { CompanySelectorDropdown, useCompanySelectorLogic } from '../users/CompanySelectorDropdown';
import { CodeGenDialog, useCodeGenDialogLogic } from './CodeGenDialog';

const useColumns = () => new EpistoDataGridColumnBuilder<ActivationCodeListDTO, Id<'ActivationCode'>>()
    .add({
        field: 'activationCodeId',
        headerName: 'Ac id'
    })
    .add({
        field: 'companyName',
        headerName: 'Company'
    })
    .add({
        field: 'code',
        headerName: 'Code',
        width: 200
    })
    .add({
        field: 'trialLengthDays',
        headerName: 'Trial length'
    })
    .add({
        field: 'url',
        headerName: 'Url',
        renderCell: ({ value }) => (
            <a
                href={value}
                target="_blank"
                rel="noreferrer">
                {value}
            </a>
        )
    })
    .add({
        field: 'isUsed',
        headerName: 'Used'
    })
    .add({
        field: 'email',
        headerName: 'Email'
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

export const ActivationCodesAdminPage = () => {

    const { companies } = CompanyApiService.useCompanies();
    const companySelectorLogic = useCompanySelectorLogic({ companies });
    const { miscApiService } = useServiceContainerContext();

    const { activationCodeLinks, refetchActivationCodeLinks } = miscApiService
        .useActivationCodesList(companySelectorLogic.activeCompanyId);

    const columns = useColumns();

    const codegGenDialogLogic = useCodeGenDialogLogic(companySelectorLogic, refetchActivationCodeLinks);

    const openAddDialog = () => {

        codegGenDialogLogic
            .dialogLogic
            .openDialog();
    };

    return (
        <AdminBreadcrumbsHeader
            headerComponent={<EpistoFlex2>
                <EpistoButton
                    margin={{
                        right: 'px10'
                    }}
                    onClick={openAddDialog}
                    icon={<EpistoIcons.Add />}>
                    Generate codes
                </EpistoButton>

                <CompanySelectorDropdown
                    logic={companySelectorLogic} />
            </EpistoFlex2>}>

            <CodeGenDialog
                logic={codegGenDialogLogic} />

            <EpistoDataGrid
                columns={columns}
                getKey={x => x.activationCodeId}
                rows={activationCodeLinks} />
        </AdminBreadcrumbsHeader>
    );
};