import { CompanyFeatureDTO } from '@episto/communication';
import { Id } from '@episto/x-core';
import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { FeatureApiService } from '../../../services/api/FeatureApiService';
import { showNotification } from '../../../services/core/notifications';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useRouteParams_OLD } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { IXMutatorFunctions } from '../../lib/XMutator/XMutatorCore';
import { useXMutatorNew } from '../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

type RowType = CompanyFeatureDTO;

const useColumns = (mutatorFunctions: IXMutatorFunctions<CompanyFeatureDTO, 'featureId', Id<'Feature'>>) => {

    return new EpistoDataGridColumnBuilder<RowType, Id<'Feature'>>()

        .add({
            field: 'featureCode',
            headerName: 'Funkció kódja',
            width: 250
        })
        .add({
            field: 'featureDescription',
            headerName: 'Leírás',
            width: 250
        })
        .add({
            field: 'isEnabled',
            headerName: 'Hozzárendelt-e?',
            renderCell: ({ value, key }) => <EpistoCheckbox
                setValue={value => mutatorFunctions
                    .mutate({
                        key,
                        field: 'isEnabled',
                        newValue: value
                    })}
                value={value} />,
        })
        .getColumns();
};

export const CompanyAdminFeaturePage = () => {

    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { editRoute, coursesRoute, courseCategoriesRoute, featuresRoute } = companiesRoute;

    const companyId = useRouteParams_OLD(editRoute)
        .getValue(x => x.companyId, 'int');

    const { companyFeatures, companyFeaturesError, companyFeaturesState, refetchCompanyFeatureResults } = FeatureApiService
        .useGetCompanyFeatures(companyId);

    const { saveCompanyFeaturesAsync, saveCompanyFeaturesState } = FeatureApiService
        .useSaveCompanyFeatures();

    useSetBusy(FeatureApiService.useGetCompanyFeatures, companyFeaturesState, companyFeaturesError);
    useSetBusy(FeatureApiService.useSaveCompanyFeatures, saveCompanyFeaturesState);

    const [mutatorState, mutatorFunctions] = useXMutatorNew(CompanyFeatureDTO, 'featureId', 'CompanyFeatures');

    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(companyFeatures);

    }, [companyFeatures, mutatorFunctions]);

    const save = async () => {

        await saveCompanyFeaturesAsync({ companyId, mutations: mutatorState.mutations });

        showNotification('Saved');

        await refetchCompanyFeatureResults();
    };

    const columns = useColumns(mutatorFunctions);

    return (
        <AdminSubpageHeader
            direction="column"
            pb="20px"
            tabMenuItems={[
                companiesRoute,
                editRoute,
                coursesRoute,
                courseCategoriesRoute,
                featuresRoute
            ]}
            navigationQueryParams={{
                companyId
            }}
            headerButtons={[
                {
                    title: translatableTexts.misc.save,
                    icon: <EpistoIcons.Save />,
                    action: save
                }
            ]}>
            <EpistoDataGrid
                columns={columns}
                rows={mutatorState.mutatedItems}
                getKey={x => x.featureId} />
        </AdminSubpageHeader>
    );
};