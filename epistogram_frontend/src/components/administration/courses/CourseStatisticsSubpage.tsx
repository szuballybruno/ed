import { Flex, Grid } from "@chakra-ui/react";
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { EpistoGrid } from "../../controls/EpistoGrid";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { DashboardSection } from "../../universal/DashboardSection";
import { VideoHotspotsChart } from "../../universal/VideoHotspotsChart";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminCourseList } from "./AdminCourseList";
import { AdminCourseItemList } from "./AdminCourseItemList";
import { CourseAdminListItemDTO } from "../../../shared/dtos/CourseAdminListItemDTO";
import { useParams } from "react-router-dom";
import { useNavigation } from "../../../services/core/navigatior";

const CourseStatisticsSubpage = (props: {
    courses: CourseAdminListItemDTO[],
    refetchCoursesFunction: () => void,
    navigationFunction: (courseId: number) => void
}) => {
    const { courses, refetchCoursesFunction, navigationFunction } = props

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);

    const currentCourse = courses.find(course => course.courseId === courseId)

    const { navigate } = useNavigation();

    const checkIfCurrentCourseFromUrl = () => {
        const isCourseFound = courses.some(course => course.courseId === courseId);

        if (!isCourseFound && courses[0]) {
            navigate(applicationRoutes.administrationRoute.coursesRoute.route + "/" + courses[0].courseId + "/content")
        }
    }
    checkIfCurrentCourseFromUrl()

    return <AdminBreadcrumbsHeader breadcrumbs={[
        <BreadcrumbLink
            title="Kurzusok"
            iconComponent={applicationRoutes.administrationRoute.coursesRoute.icon}
            to={applicationRoutes.administrationRoute.coursesRoute.route + "/a/content"} />,
        <BreadcrumbLink
            title={"" + currentCourse?.title}
            isCurrent />
    ]}>

        {/* <AdminCourseList currentCoursePage={"statistics"} /> */}
        <AdminCourseList
            courses={courses}
            navigationFunction={navigationFunction} />

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
            ]}>
            <EpistoGrid auto="fill" gap="10" mt="5px" minColumnWidth="250px" gridAutoRows="200px">

                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Kezdte el idáig a kurzust"
                    suffix="fő"
                    value="30" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Alatt teljesítették átlagban"
                    suffix="óra"
                    value="12" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Teljesítette eddig összesen"
                    suffix="fő"
                    value="144" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Teljesítette azok közül akik elkezdték"
                    suffix="%"
                    value="76" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Hagyta félbe"
                    suffix="fő"
                    value="32" />
                <DashboardSection
                    title={"Mélypontok"}
                    background="var(--transparentWhite70)"
                    className="mildShadow roundBorders"
                    gridColumn="span 4" // do not remove!!
                    gridRow="span 2" // do not remove!!
                    //boxShadow="inset -1px -1px 7px rgba(0,0,0,0.20)"
                    color="black"
                    showDivider
                    w="100%">

                    <VideoHotspotsChart />
                </DashboardSection>
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Kalkulált nehézség"
                    suffix="/5.0"
                    value="2.5" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Nehézség értékelés alapján"
                    suffix="/5.0"
                    value="2.5" />
                <StatisticsCard
                    style={{
                        paddingLeft: 20,
                        minWidth: 200
                    }}
                    title="Tesztek átlagteljesítménye"
                    suffix="%"
                    value="80" />

            </EpistoGrid>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>


};

export default CourseStatisticsSubpage;
