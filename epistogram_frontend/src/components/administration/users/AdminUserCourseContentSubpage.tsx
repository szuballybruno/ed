import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CourseApiService } from '../../../services/api/courseApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { Id } from '../../../shared/types/versionId';
import { useRouteParams } from '../../../static/locationHelpers';
import { } from '../../universal/epistoDialog/EpistoDialog';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { useAdminCourseContentDialogLogic } from './adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from './adminCourseContentDialog/AdminUserCourseContentDialog';
import { AdminUserList } from './AdminUserList';
import { AdminUserCoursesDataGridControl } from './dataGrids/AdminUserCoursesDataGridControl';

export const AdminUserCourseContentSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;

    const userId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.courseContentRoute)
        .getValue(x => x.userId, 'int');

    const { userEditData } = UserApiService.useEditUserData(userId);
    const { setRequiredCourseCompletionDateAsync, setRequiredCourseCompletionDateState } = CourseApiService.useSetRequiredCompletionDate();

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    const handleSaveRequiredCompletionDate = (courseId: Id<'Course'>, requiredCompletionDate: Date | null) => {

        if (!courseId || !requiredCompletionDate)
            showError('Hiba történt');

        console.log(requiredCompletionDate!.toISOString());

        setRequiredCourseCompletionDateAsync({
            courseId: courseId,
            requiredCourseCompletionDate: requiredCompletionDate!.toISOString()
        });


    };

    return <AdminBreadcrumbsHeader>

        <AdminUserList
            currentUserId={userId}
            users={users}
            navigationFunction={(userId) => {
                navigate2(applicationRoutes.administrationRoute.usersRoute.courseContentRoute, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.courseContentRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            <AdminUserCoursesDataGridControl
                handleMoreButton={(courseId: Id<'Course'>) => adminCourseContentDialogLogic
                    .openDialog({
                        params: {
                            courseId: courseId,
                            userId: userId
                        }
                    })}
                handleSaveRequiredCompletionDate={handleSaveRequiredCompletionDate} />
        </AdminSubpageHeader >
    </AdminBreadcrumbsHeader >;
};