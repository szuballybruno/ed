import { Switch } from "react-router"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { getRoute } from "../../../MainRouting"
import { useAdminCourseList } from "../../../services/api/courseApiService"
import { useNavigation } from "../../../services/core/navigatior"
import { AdminCourseContentSubpage } from "./AdminCourseContentSubpage"
import { AdminInteractiveCourseSubpage } from "./AdminInteractiveCourseSubpage"
import CourseStatisticsSubpage from "./CourseStatisticsSubpage"
import { AdminCourseDetailsSubpage } from "./EditCourseDetailsSubpage"
import { EditExamSubpage } from "./EditExamSubpage"
import { EditModuleSubpage } from "./EditModuleSubpage"
import { EditQuestionSubpage } from "./EditQuesttionSubpage"
import { EditVideoSubpage } from "./EditVideoSubpage"
import { VideoStatisticsSubpage } from "./VideoStatisticsSubpage"

export const AdminCourseControl = () => {
    const coursesRoute = applicationRoutes.administrationRoute.coursesRoute

    // TODO: use courseStatus and coursesError in loadingframe too
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList("");
    const { navigate } = useNavigation()

    return <Switch>

        {getRoute(
            coursesRoute.courseDetailsRoute,
            <AdminCourseDetailsSubpage
                courses={courses}
                refetchCoursesFunction={refetchCoursesAsync}
                navigationFunction={(courseId) => navigate(`${coursesRoute.route}/${courseId}/details`)} />)}

        {getRoute(
            coursesRoute.courseContentRoute,
            <AdminCourseContentSubpage
                courses={courses}
                refetchCoursesFunction={refetchCoursesAsync}
                navigationFunction={(courseId) => navigate(`${coursesRoute.route}/${courseId}/content`)} />)}

        {getRoute(coursesRoute.statisticsCourseRoute, <CourseStatisticsSubpage />)}
        {getRoute(coursesRoute.interactiveCourseRoute, <AdminInteractiveCourseSubpage />)}
        {getRoute(coursesRoute.editVideoRoute, <EditVideoSubpage />)}
        {getRoute(coursesRoute.videoStatsRoute, <VideoStatisticsSubpage />)}
        {getRoute(coursesRoute.editVideoQuestionRoute, <EditQuestionSubpage />)}
        {getRoute(coursesRoute.editExamRoute, <EditExamSubpage />)}
        {getRoute(coursesRoute.editExamQuestionRoute, <EditQuestionSubpage />)}
        {getRoute(coursesRoute.editModuleRoute, <EditModuleSubpage />)}
    </Switch>
}