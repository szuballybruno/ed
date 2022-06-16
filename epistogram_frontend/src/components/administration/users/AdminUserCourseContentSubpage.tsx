import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseBriefData, useSetRequiredCompletionDate } from '../../../services/api/courseApiService';
import { useEditUserData } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { useIntParam } from '../../../static/locationHelpers';
import { } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminBreadcrumbsHeader, BreadcrumbLink } from '../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminUserList } from './AdminUserList';
import { AdminUserCoursesDataGridControl } from './dataGrids/AdminUserCoursesDataGridControl';
import { AdminUserCourseContentDialog } from './modals/AdminUserCourseContentDialog';

export const AdminUserCourseContentSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;

    const userId = useIntParam('userId')!;

    const { userEditData } = useEditUserData(userId);
    const { setRequiredCourseCompletionDateAsync, setRequiredCourseCompletionDateState } = useSetRequiredCompletionDate();

    const dialogLogic = useEpistoDialogLogic<{ courseId: number | null }>('sasd');

    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    const handleSaveRequiredCompletionDate = (courseId: number | null, requiredCompletionDate: Date | null) => {

        if (!courseId || !requiredCompletionDate)
            showError('Hiba történt');

        console.log(requiredCompletionDate!.toISOString());

        setRequiredCourseCompletionDateAsync({
            courseId: courseId!,
            requiredCourseCompletionDate: requiredCompletionDate!.toISOString()
        });


    };

    return <AdminBreadcrumbsHeader>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.courseContentRoute, { userId: userId });
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
                userCourseStatsData={{
                    userProgressData: {
                        startDate: new Date('2022. 04. 10.'),
                        estimatedCompletionDate: new Date('2022. 05. 10.'),
                        estimatedLengthInDays: 30,
                        days: [
                            {
                                completionDate: new Date('2022. 05. 10.'),
                                completedItemCount: 4,
                                completedPercentage: 5,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 5
                            },
                            {
                                completionDate: new Date('2022. 05. 12.'),
                                completedItemCount: 4,
                                completedPercentage: 8,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 13
                            },
                            {
                                completionDate: new Date('2022. 05. 12.'),
                                completedItemCount: 4,
                                completedPercentage: 2,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 15
                            },
                            {
                                completionDate: new Date('2022. 05. 12.'),
                                completedItemCount: 4,
                                completedPercentage: 2,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 17
                            },
                            {
                                completionDate: new Date('2022. 05. 12.'),
                                completedItemCount: 4,
                                completedPercentage: 8,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 25
                            },
                            {
                                completionDate: new Date('2022. 05. 12.'),
                                completedItemCount: 4,
                                completedPercentage: 8,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 33
                            }
                        ]
                    },
                    completedVideoCount: 48,
                    totalVideoPlaybackSeconds: 60 * 60 * 3.5,
                    totalGivenAnswerCount: 39,
                    totalCorrectAnswerRate: 74

                }}
                dialogLogic={dialogLogic} />

            <AdminUserCoursesDataGridControl
                handleMoreButton={
                    (courseId: number | null) => dialogLogic.openDialog({ params: { courseId: courseId } })
                }
                handleSaveRequiredCompletionDate={handleSaveRequiredCompletionDate} />
        </AdminSubpageHeader >
    </AdminBreadcrumbsHeader >;
};