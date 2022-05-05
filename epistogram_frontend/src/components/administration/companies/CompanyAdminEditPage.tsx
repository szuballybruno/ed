import { Save } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompanyEditData, useSaveCompany } from '../../../services/api/companiesApiService';
import { showNotification } from '../../../services/core/notifications';
import { usePostCallback } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const CompanyAdminEditPage = memo((props: { onNameLoaded: (name: string) => void }) => {

    const { onNameLoaded } = props;
    const compnayId = useIntParam('companyId')!;
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;
    const [name, setName] = useState('');

    // http
    const {
        companyEditData,
        companyEditDataState
    } = useCompanyEditData(compnayId);
    const { saveCompanyAsync, saveCompanyState } = useSaveCompany();

    const [handleSaveCompanyAsync] = usePostCallback(saveCompanyAsync, [() => showNotification('Sikeresen mentve!')]);

    useEffect(() => {

        if (!companyEditData)
            return;

        onNameLoaded(companyEditData.name);
        setName(companyEditData.name);
    }, [companyEditData]);

    return <>
        <LoadingFrame
            loadingState={[companyEditDataState, saveCompanyState]}>

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
                        action: () => handleSaveCompanyAsync({
                            id: compnayId,
                            name
                        })
                    }
                ]}>

                <EpistoEntry
                    value={name}
                    setValue={setName} />
            </AdminSubpageHeader>
        </LoadingFrame>
    </>;
}, (p, n) => p.onNameLoaded === n.onNameLoaded);