import { CompanyCourseCategoriesDTO } from '@episto/communication';
import { Id } from '@episto/x-core';
import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CourseCategoryApiService } from '../../../services/api/CourseCategoryApiService';
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
import { EpistoButton } from '../../controls/EpistoButton';
import { Delete } from '@mui/icons-material';

type RowType = CompanyCourseCategoriesDTO;

const useColumns = (
    mutatorFunctions: IXMutatorFunctions<CompanyCourseCategoriesDTO, 'courseCategoryId', Id<'CourseCategory'>>,
    deleteCourseCategoryFunction: (courseCategoryId: Id<'CourseCategory'>, companyId: Id<'Company'>) => any
) => {

    return new EpistoDataGridColumnBuilder<RowType, Id<'CourseCategory'>>()

        .add({
            field: 'name',
            headerName: 'Kategória',
            editHandler: ({ rowKey, value }) => mutatorFunctions
                .mutate({
                    field: 'name',
                    key: rowKey,
                    newValue: value
                }),
            width: 250
        })
        .add({
            field: 'isEnabled',
            headerName: 'Kiválasztható',
            renderCell: ({ value, key }) => <EpistoCheckbox
                setValue={value => mutatorFunctions
                    .mutate({
                        key,
                        field: 'isEnabled',
                        newValue: value
                    })}
                value={value} />,
        })
        .add({
            field: 'courseCategoryId',
            headerName: 'Gyorshivatkozások',
            width: 150,
            renderCell: ({ key, row }) => <EpistoButton
                onClickNoPropagation={() =>
                    deleteCourseCategoryFunction(row.courseCategoryId, row.companyId)}>

                <Delete />
            </EpistoButton>

        })
        .getColumns();
};

export const CompanyAdminCourseCategoriesPage = () => {

    const { companiesRoute } = applicationRoutes.administrationRoute;
    const { editRoute, coursesRoute, courseCategoriesRoute, featuresRoute } = companiesRoute;

    const companyId = useRouteParams_OLD(editRoute)
        .getValue(x => x.companyId, 'int');

    const {
        companyCourseCategories,
        companyCourseCategoriesError,
        companyCourseCategoriesState,
        refetchCompanyCourseCategoriesResults
    } = CourseCategoryApiService
        .useGetCompanyCourseCategories(companyId);

    const {
        saveCompanyCourseCategoriesAsync,
        saveCompanyCourseCategoriesState
    } = CourseCategoryApiService
        .useSaveCompanyCourseCategories();

    const {
        createCourseCategoryAsync,
        createCourseCategoryState
    } = CourseCategoryApiService.useCreateCourseCategory();

    const {
        deleteCourseCategoryAsync,
        deleteCourseCategoryState
    } = CourseCategoryApiService.useDeleteCourseCategory();

    useSetBusy(CourseCategoryApiService.useGetCompanyCourseCategories, companyCourseCategoriesState, companyCourseCategoriesError);
    useSetBusy(CourseCategoryApiService.useSaveCompanyCourseCategories, saveCompanyCourseCategoriesState);

    const [mutatorState, mutatorFunctions] = useXMutatorNew(CompanyCourseCategoriesDTO, 'courseCategoryId', 'CompanyCourseCategories');

    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(companyCourseCategories);

    }, [companyCourseCategories, mutatorFunctions]);

    const save = async () => {

        await saveCompanyCourseCategoriesAsync({ companyId, mutations: mutatorState.mutations });

        showNotification('Saved');

        await refetchCompanyCourseCategoriesResults();
    };

    const createCourseCategory = async () => {

        await createCourseCategoryAsync({
            name: 'Új kategória',
            parentCategoryId: undefined
        });

        showNotification('Új kategória hozzáadva');

        await refetchCompanyCourseCategoriesResults();
    };

    const deleteCourseCategory = async (courseCategoryId: Id<'CourseCategory'>, companyId: Id<'Company'>) => {

        await deleteCourseCategoryAsync({
            courseCategoryId,
            companyId
        });

        showNotification('Kategória sikeresen törölve');

        await refetchCompanyCourseCategoriesResults();
    };

    const columns = useColumns(mutatorFunctions, deleteCourseCategory);

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
                    title: translatableTexts.misc.add,
                    icon: <EpistoIcons.Add />,
                    action: createCourseCategory
                },
                {
                    title: translatableTexts.misc.save,
                    icon: <EpistoIcons.Save />,
                    action: save
                }
            ]}>
            <EpistoDataGrid
                columns={columns}
                rows={mutatorState.mutatedItems}
                getKey={x => x.courseCategoryId} />
        </AdminSubpageHeader>
    );
};