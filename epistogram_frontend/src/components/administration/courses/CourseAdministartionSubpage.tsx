import { Flex } from "@chakra-ui/react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { getRoute } from "../../../MainRouting";
import { AdminCourseContentSubpage } from "./AdminCourseContentSubpage";
import { AdminCourseUserProgressSubpage } from "./AdminCourseUserProgressSubpage";
import { AdminInteractiveCourseSubpage } from "./AdminInteractiveCourseSubpage";
import { CourseAdministartionFrame } from "./CourseAdministartionFrame";
import { CourseStatisticsSubpage } from "./CourseStatisticsSubpage";
import { AdminCourseDetailsSubpage } from "./EditCourseDetailsSubpage";

export const CourseAdministartionSubpage = () => {

    return (
        <Flex>

            {/* content pane */}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute, <CourseAdministartionFrame />)}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute, <AdminCourseDetailsSubpage />)}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute.courseContentRoute, <AdminCourseContentSubpage />)}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute, <CourseStatisticsSubpage />)}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute, <AdminCourseUserProgressSubpage />)}

            {/* for demo */}
            {getRoute(applicationRoutes.administrationRoute.coursesRoute.interactiveCourseRoute, <AdminInteractiveCourseSubpage />)}
        </Flex>
    );
};