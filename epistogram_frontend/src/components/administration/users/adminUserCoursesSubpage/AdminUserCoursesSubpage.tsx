import { useCallback, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { UserApiService } from '../../../../services/api/userApiService';
import { useUserAssignedCourses } from '../../../../services/api/userStatsApiService';
import { useNavigation } from '../../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../../shared/dtos/admin/AdminPageUserDTO';
import { Id } from '../../../../shared/types/versionId';
import { ArrayBuilder } from '../../../../static/frontendHelpers';
import { useRouteParams } from '../../../../static/locationHelpers';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoSwitch } from '../../../controls/EpistoSwitch';
import { } from '../../../universal/epistoDialog/EpistoDialog';
import { AdminBreadcrumbsHeader } from '../../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { AdminUserList } from '../AdminUserList';
import { UserCoursesRowType, useUserCoursesColumns } from './AdminUserCoursesColumns';

export const AdminUserCoursesSubpage = ({
    users
}: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { usersRoute } = applicationRoutes.administrationRoute;

    const userId = useRouteParams(usersRoute.courseContentRoute)
        .getValue(x => x.userId, 'int');

    const [editModeEnabled, setEditModeEnabled] = useState(false);

    const { userEditData } = UserApiService
        .useEditUserData(userId);

    const { setRequiredCourseCompletionDateAsync, setRequiredCourseCompletionDateState } = CourseApiService
        .useSetRequiredCompletionDate();

    const {
        userAssignedCourses,
        userAssignedCoursesState,
        userAssignedCoursesError,
        refetchUserAssignedCourses
    } = useUserAssignedCourses(userId, editModeEnabled);

    const rows = userAssignedCourses
        .map((dto, index): UserCoursesRowType => ({
            ...dto,
            moreDetails: index
        }));
    const getRowKey = useCallback((row: UserCoursesRowType) => row.courseId, []);
    const columns = useUserCoursesColumns({
        handleOpenUserCourseDetailsDialog: (x) => console.log(x),
        hideStats: editModeEnabled
    });

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    const handleSaveRequiredCompletionDate = (courseId: Id<'Course'>, requiredCompletionDate: Date | null) => {

        if (!courseId || !requiredCompletionDate)
            showError('Hiba történt');

        setRequiredCourseCompletionDateAsync({
            courseId: courseId,
            requiredCourseCompletionDate: requiredCompletionDate!.toISOString()
        });
    };

    return <AdminBreadcrumbsHeader>

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
            </>}>

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