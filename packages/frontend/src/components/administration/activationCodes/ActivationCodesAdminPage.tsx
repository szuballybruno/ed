import { Id } from '@episto/commontypes';
import { ActivationCodeListDTO } from '@episto/communication';
import { AdminActiveCompanyType } from '../../../models/types';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
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

export const ActivationCodesAdminPage = ({ activeCompany }: { activeCompany: AdminActiveCompanyType }) => {

    const { miscApiService } = useServiceContainerContext();

    const { activationCodeLinks, refetchActivationCodeLinks } = miscApiService
        .useActivationCodesList(activeCompany?.id ?? null);

    const columns = useColumns();

    const codegGenDialogLogic = useCodeGenDialogLogic(activeCompany, refetchActivationCodeLinks);

    const openAddDialog = () => {

        codegGenDialogLogic
            .dialogLogic
            .openDialog();
    };

    return (
        <>
            <AdminBreadcrumbsHeader>
                <EpistoButton
                    margin={{
                        right: 'px10'
                    }}
                    onClick={openAddDialog}
                    icon={<EpistoIcons.Add />}>
                    Generate codes
                </EpistoButton>
            </AdminBreadcrumbsHeader>

            <CodeGenDialog
                logic={codegGenDialogLogic} />

            <EpistoDataGrid
                columns={columns}
                getKey={x => x.activationCodeId}
                rows={activationCodeLinks} />
        </>
    );
};