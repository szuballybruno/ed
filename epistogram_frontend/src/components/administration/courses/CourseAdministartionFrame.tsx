import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useAdminCourseList } from "../../../services/api/courseApiService"
import { useNavigation } from "../../../services/core/navigatior"
import { useIsMatchingCurrentRoute } from "../../../static/frontendHelpers"
import { useIntParam } from "../../../static/locationHelpers"
import { EpistoFont } from "../../controls/EpistoFont"
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminCourseList } from "./AdminCourseList"

export const CourseAdministartionFrame = (params: { children?: ReactNode }) => {

    const { children } = params;

    // util
    const { navigate } = useNavigation();
    const courseId = useIntParam("courseId");
    const isMatchingCurrentUrl = useIsMatchingCurrentRoute();

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList("");

    // dt
    const currentCourse = courses
        .firstOrNull(x => x.courseId === courseId);

    // func
    const navigationFunction = (courseId: number) => {

        const url = (() => {

            const base = applicationRoutes.administrationRoute.coursesRoute;

            if (isMatchingCurrentUrl(base.courseDetailsRoute))
                return base.courseDetailsRoute;

            if (isMatchingCurrentUrl(base.courseContentRoute))
                return base.courseContentRoute;

            return base.statisticsCourseRoute;
        })();

        navigate(url, { courseId });
    }

    return (
        <Flex
            id="CourseAdministartionFrame"
            className="whall">

            {/* header */}
            <AdminBreadcrumbsHeader
                breadcrumbs={[
                    <BreadcrumbLink
                        key={1}
                        title="Kurzusok"
                        iconComponent={applicationRoutes.administrationRoute.coursesRoute.icon} />,
                    currentCourse && <BreadcrumbLink
                        key={2}
                        title={currentCourse?.title + ""}
                        isCurrent />
                ]}>

                {/* course list */}
                <AdminCourseList
                    onCourseClick={navigationFunction}
                    courses={courses} />

                {/* content pane */}
                {children
                    ? children
                    : <Flex
                        justify="center"
                        className="whall"
                        bg="white">

                        <EpistoFont
                            style={{
                                marginTop: "50px"
                            }}>
                            Please select a course
                        </EpistoFont>
                    </Flex>}

            </AdminBreadcrumbsHeader>
        </Flex>
    )
}