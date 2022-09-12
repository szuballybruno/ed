import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { showNotification } from '../../../services/core/notifications';
import { CompanyAssociatedCourseDTO } from '../../../shared/dtos/company/CompanyAssociatedCourseDTO';
import { Id } from '../../../shared/types/versionId';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoImage } from '../../controls/EpistoImage';
import { useXMutatorNew } from '../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

type RowType = CompanyAssociatedCourseDTO;

export const CompanyAdminCoursesPage = () => {

    const { indexRoute, editRoute, coursesRoute } = applicationRoutes.administrationRoute.companiesRoute;

    const companyId = useRouteParams(editRoute)
        .getValue(x => x.companyId, 'int');

    const { courseAssociations, refetchCourseAssociations, courseAssociationsState, courseAssociationsError } = CompanyApiService
        .useCourseAssociations(companyId);

    const { saveCourseAssociationsAsync, saveCourseAssociationsState } = CompanyApiService
        .useSaveCourseAssociations();

    useSetBusy(CompanyApiService.useCourseAssociations, courseAssociationsState, courseAssociationsError);
    useSetBusy(CompanyApiService.useSaveCourseAssociations, saveCourseAssociationsState);

    const [{ mutatedItems, mutations }, mutatorFunctions] = useXMutatorNew(CompanyAssociatedCourseDTO, 'courseId', 'CompanyAssociatedCourses');

    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(courseAssociations);
    }, [courseAssociations, mutatorFunctions]);

    const save = async () => {

        await saveCourseAssociationsAsync({ companyId, mutations });

        showNotification('Saved');

        await refetchCourseAssociations();
    };

    const columns = new EpistoDataGridColumnBuilder<RowType, Id<'Course'>>()
        .add({
            field: 'coverUrl',
            headerName: 'Cover',
            renderCell: ({ value }) => <EpistoImage
                className="square70"
                objectFit="contain"
                src={value} />
        })
        .add({
            field: 'title',
            headerName: 'Title',
            width: 250
        })
        .add({
            field: 'isAssociated',
            headerName: 'Associated?',
            renderCell: ({ value, key }) => <EpistoCheckbox
                setValue={value => mutatorFunctions
                    .mutate({
                        key,
                        field: 'isAssociated',
                        newValue: value
                    })}
                value={value} />,
        })
        .getColumns();

    return (
        <AdminSubpageHeader
            direction="column"
            pb="20px"
            tabMenuItems={[
                indexRoute,
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
                rows={mutatedItems}
                getKey={x => x.courseId} />
        </AdminSubpageHeader>
    );
};