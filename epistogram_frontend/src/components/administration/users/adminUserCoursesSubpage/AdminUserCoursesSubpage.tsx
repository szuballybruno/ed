import { useCallback, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { UserApiService } from '../../../../services/api/userApiService';
import { useUserAssignedCourses } from '../../../../services/api/userStatsApiService';
import { useNavigation } from '../../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../../services/core/notifications';
import { LocalStorageService } from '../../../../services/core/storageService';
import { AdminPageUserDTO } from '../../../../shared/dtos/admin/AdminPageUserDTO';
import { CompanyDTO } from '../../../../shared/dtos/company/CompanyDTO';
import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { Id } from '../../../../shared/types/versionId';
import { ArrayBuilder } from '../../../../static/frontendHelpers';
import { useRouteParams } from '../../../../static/locationHelpers';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoSwitch } from '../../../controls/EpistoSwitch';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { AdminBreadcrumbsHeader, CompanySelectorDropdown } from '../../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { AdminUserList } from '../AdminUserList';
import { UserCoursesRowType, useUserCoursesColumns } from './AdminUserCoursesColumns';

export const AdminUserCoursesSubpage = ({
    users,
    selectedCompanyId,
    handleSelectCompany,
    companies
}: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void,
    selectedCompanyId: Id<'Company'> | null,
    handleSelectCompany: (companyId: Id<'Company'> | null) => void,
    companies: CompanyDTO[]
}) => {

    const { usersRoute } = applicationRoutes.administrationRoute;

    const userId = useRouteParams(usersRoute.courseContentRoute)
        .getValue(x => x.userId, 'int');

    const [editModeEnabled, setEditModeEnabled] = useState(LocalStorageService
        .readStorage('editModeEnabled') === 'true');

    const { userEditData } = UserApiService
        .useEditUserData(userId);

    const {
        userAssignedCourses,
        userAssignedCoursesState,
        userAssignedCoursesError,
        refetchUserAssignedCourses
    } = useUserAssignedCourses(userId, editModeEnabled);

    const { saveUserCourses, saveUserCoursesState } = UserApiService
        .useSaveUserAssignedCourses();

    useSetBusy(useUserAssignedCourses, userAssignedCoursesState, userAssignedCoursesError);

    const [{ mutatedItems, mutations }, mutatorFunctions] = useXMutatorNew(UserCourseStatsDTO, 'courseId', UserCourseStatsDTO.name);

    /**
     * Handle save user courses 
     */
    const handleSaveUserCourses = useCallback(async () => {

        await saveUserCourses({ mutations, userId });
        showNotification('Saved');
        await refetchUserAssignedCourses();
    }, [saveUserCourses, mutations, userId, refetchUserAssignedCourses]);

    /**
     * Initialize mutator 
     */
    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(userAssignedCourses);
    }, [userAssignedCourses, mutatorFunctions]);

    /**
     * Write edit settings to local storage
     */
    useEffect(() => {

        LocalStorageService
            .writeStorage('editModeEnabled', editModeEnabled);
    }, [editModeEnabled]);

    const rows = mutatedItems
        .map((dto, index): UserCoursesRowType => ({
            ...dto,
            moreDetails: index
        }));
    const getRowKey = useCallback((row: UserCoursesRowType) => row.courseId, []);
    const columns = useUserCoursesColumns({
        handleOpenUserCourseDetailsDialog: (x) => console.log(x),
        hideStats: editModeEnabled,
        mutatorFunctions
    });

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    return <AdminBreadcrumbsHeader
        headerComponent={companies.length > 1 && <CompanySelectorDropdown
            selectedCompanyId={selectedCompanyId}
            handleSelectCompany={handleSelectCompany}
            companies={companies} />}>

        <AdminUserList
            currentUserId={userId}
            users={users}
            onUserSelected={userId => {

                navigate2(usersRoute.courseContentRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            tabMenuItems={new ArrayBuilder()
                .add(usersRoute.editRoute)
                .add(usersRoute.statsRoute)
                .add(usersRoute.courseContentRoute)
                .addIf(!!userEditData?.isTeacher, usersRoute.teacherInfoRoute)
                .getArray()}
            headerContent={<>
                <EpistoSwitch
                    checked={editModeEnabled}
                    setChecked={setEditModeEnabled}
                    label={editModeEnabled ? 'Disable editing' : 'Enable editing'} />
            </>}
            headerButtons={editModeEnabled
                ? [{
                    title: 'Save',
                    action: handleSaveUserCourses,
                }]
                : []}>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            {/* courses grid */}
            {rows.length > 0 && <EpistoDataGrid
                getKey={getRowKey}
                rows={rows}
                columns={columns} />}

            {/* no data yet */}
            {rows.length === 0 && <EpistoFlex2
                flex='1'
                align='center'
                justify='center'>

                A felhasználó még egyetlen kurzust sem kezdett el
            </EpistoFlex2>}
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};