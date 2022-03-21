import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useCourseBriefData } from "../../../services/api/courseApiService";
import { useEditUserData } from "../../../services/api/userApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { AdminPageUserDTO } from "../../../shared/dtos/AdminPageUserDTO";
import { useEpistoDialogLogic } from "../../EpistoDialog";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminUserList } from "./AdminUserList";
import { AdminUserCoursesDataGridControl } from "./dataGrids/AdminUserCoursesDataGridControl";
import { AdminUserCourseContentModal } from "./modals/AdminUserCourseContentModal";

export const AdminUserCourseContentSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props

    const params = useParams<{ courseId: string, userId: string, }>();

    const userId = parseInt(params.userId);
    const courseId = parseInt(params.courseId);

    // TODO: Fix useBriefUserData
    const { userEditData } = useEditUserData(userId);
    const { courseBriefData } = useCourseBriefData(courseId);

    const dialogLogic = useEpistoDialogLogic({
        defaultCloseButtonType: "top"
    });

    const { navigate } = useNavigation()

    return <AdminBreadcrumbsHeader breadcrumbs={[
        <BreadcrumbLink
            title="Felhasználók"
            iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/a/edit"} />,
        <BreadcrumbLink
            title={userEditData?.lastName + " " + userEditData?.firstName}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/edit"}
            isCurrent />
    ]}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.courseContentRoute.route, { userId: userId })
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

            <AdminUserCourseContentModal
                userCourseStatsData={{
                    userProgressData: {
                        startDate: new Date("2022. 04. 10."),
                        estimatedCompletionDate: new Date("2022. 05. 10."),
                        estimatedLengthInDays: 30,
                        days: [
                            {
                                completionDate: new Date("2022. 05. 10."),
                                completedItemCount: 4,
                                completedPercentage: 5,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 5
                            },
                            {
                                completionDate: new Date("2022. 05. 12."),
                                completedItemCount: 4,
                                completedPercentage: 8,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 13
                            },
                            {
                                completionDate: new Date("2022. 05. 12."),
                                completedItemCount: 4,
                                completedPercentage: 2,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 15
                            },
                            {
                                completionDate: new Date("2022. 05. 12."),
                                completedItemCount: 4,
                                completedPercentage: 2,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 17
                            },
                            {
                                completionDate: new Date("2022. 05. 12."),
                                completedItemCount: 4,
                                completedPercentage: 8,
                                offsetDaysFromStart: 0,
                                completedPercentageSum: 25
                            },
                            {
                                completionDate: new Date("2022. 05. 12."),
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
                logic={dialogLogic}
                fullScreenX />

            <AdminUserCoursesDataGridControl
                handleMoreButton={
                    () => dialogLogic.openDialog()
                } />
        </AdminSubpageHeader >
    </AdminBreadcrumbsHeader >
}