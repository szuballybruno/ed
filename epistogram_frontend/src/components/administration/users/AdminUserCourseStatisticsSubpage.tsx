import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCourseBriefData, useCourseContentEditData } from "../../../services/api/courseApiService";
import { useEditUserData } from "../../../services/api/userApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminCourseList } from "../courses/AdminCourseList"

export const AdminUserCourseStatisticsSubpage = () => {

    const params = useParams<{ courseId: string, userId: string, }>();

    const userId = parseInt(params.userId);
    const courseId = parseInt(params.courseId);

    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])
    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);

    // opens / closes a module 
    const setModuleOpenState = (isOpen: boolean, moduleId: number) => {

        if (isOpen) {

            setOpenModuleIds([...openModuleIds, moduleId]);
        }
        else {

            setOpenModuleIds(openModuleIds.filter(x => x !== moduleId));
        }
    }

    // TODO: Fix useBriefUserData
    const { userEditData } = useEditUserData(userId);
    const { courseBriefData } = useCourseBriefData(courseId);
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList("");
    const { courseContentEditData, courseContentEditDataError, courseContentEditDataState, refetchCourseContentEditData } = useCourseContentEditData(courseId);

    const { navigate } = useNavigation()

    const checkIfCurrentCourseFromUrl = () => {
        const found = courses.some(course => course.courseId === courseId);

        if (!found && courses[0]) {
            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courses[0].courseId + "/statistics")
        }
    }
    // effects 
    useEffect(() => {

        if (!courseContentEditData)
            return;

        setModules(courseContentEditData.modules);
        setOpenModuleIds(courseContentEditData.modules.map(x => x.id));

    }, [courseContentEditData]);

    checkIfCurrentCourseFromUrl()

    return <AdminBreadcrumbsHeader breadcrumbs={[
        <BreadcrumbLink
            title="Felhasználók"
            iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/a/edit"} />,
        <BreadcrumbLink
            title={userEditData?.lastName + " " + userEditData?.firstName}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/edit"} />,
        <BreadcrumbLink
            title={courseBriefData?.title!} isCurrent />,
    ]}>

        <AdminCourseList
            courses={courses}
            navigationFunction={(courseId) => navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/statistics")} />

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.courseStatisticsRoute,
                applicationRoutes.administrationRoute.usersRoute.courseContentRoute
            ]}
            direction="column"
            headerButtons={[
            ]}>

            {/* course items */}
            <Flex
                flex="1"
                direction={"column"}
                className="roundBorders"
                background="var(--transparentWhite70)"
                mt="5px">

            </Flex>
        </AdminSubpageHeader >

    </AdminBreadcrumbsHeader>
}