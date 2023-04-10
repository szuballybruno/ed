import { CompanyAssociatedCourseDTO, FeatureDTO } from '@episto/communication';
import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/CompanyApiService';
import { showNotification } from '../../../services/core/notifications';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useRouteParams_OLD } from '../../../static/locationHelpers';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoImage } from '../../controls/EpistoImage';
import { IXMutatorFunctions } from '../../lib/XMutator/XMutatorCore';
import { useXMutatorNew } from '../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { Id } from '@episto/x-core';

type RowType = FeatureDTO;

const useColumns = (mutatorFunctions: IXMutatorFunctions<FeatureDTO, 'featureId', Id<'Feature'>>) => {

    return new EpistoDataGridColumnBuilder<RowType, Id<'Feature'>>()
        .add({
            field: 'coverUrl',
            headerName: 'Borítókép',
            renderCell: ({ value }) => <EpistoImage
                className="square70"
                objectFit="contain"
                src={value} />
        })
        .add({
            field: 'featureCode',
            headerName: 'Cím',
            width: 250
        })
        .add({
            field: 'fea',
            headerName: 'Hozzárendelt-e?',
            renderCell: ({ value, key }) => <EpistoCheckbox
                setValue={value => mutatorFunctions
                    .mutate({
                        key,
                        field: 'isAssociated',
                        newValue: value
                    })}
                value={value} />,
        })
        .add({
            field: 'isDefault',
            headerName: 'Alapértelmezett-e?',
            renderCell: ({ value, key }) => <EpistoCheckbox
                setValue={value => mutatorFunctions
                    .mutate({
                        key,
                        field: 'isDefault',
                        newValue: value
                    })}
                value={value} />,
        })
        .getColumns();
};

export const CompanyAdminCoursesPage = () => {

    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { editRoute, coursesRoute } = companiesRoute;

    const companyId = useRouteParams_OLD(editRoute)
        .getValue(x => x.companyId, 'int');

    const { courseAssociations, refetchCourseAssociations, courseAssociationsState, courseAssociationsError } = CompanyApiService
        .useCourseAssociations(companyId);

    const { saveCourseAssociationsAsync, saveCourseAssociationsState } = CompanyApiService
        .useSaveCourseAssociations();

    useSetBusy(CompanyApiService.useCourseAssociations, courseAssociationsState, courseAssociationsError);
    useSetBusy(CompanyApiService.useSaveCourseAssociations, saveCourseAssociationsState);

    const [mutatorState, mutatorFunctions] = useXMutatorNew(CompanyAssociatedCourseDTO, 'courseId', 'CompanyAssociatedCourses');

    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(courseAssociations);

    }, [courseAssociations, mutatorFunctions]);

    const save = async () => {

        await saveCourseAssociationsAsync({ companyId, mutations: mutatorState.mutations });

        showNotification('Saved');

        await refetchCourseAssociations();
    };

    const columns = useColumns(mutatorFunctions);

    return (
        <AdminSubpageHeader
            direction="column"
            pb="20px"
            tabMenuItems={[
                companiesRoute,
                editRoute,
                coursesRoute
            ]}
            navigationQueryParams={{
                companyId
            }}
            headerButtons={[
                {
                    title: 'Save',
                    icon: <EpistoIcons.Save />,
                    action: save
                }
            ]}>
            <EpistoDataGrid
                columns={columns}
                rows={mutatorState.mutatedItems}
                getKey={x => x.courseId} />
        </AdminSubpageHeader>
    );
};