import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCourseBriefData, useCourseContentEditData } from "../../../services/api/courseApiService";
import { useEditUserData } from "../../../services/api/userApiService";
import { useVideoEditData } from "../../../services/api/videoApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminCourseItemList } from "../courses/AdminCourseItemList";
import { AdminCourseList } from "../courses/AdminCourseList"

export const AdminUserVideoStatistics = () => {

    const params = useParams<{ courseId: string, userId: string, videoId: string }>();

    const userId = parseInt(params.userId);
    const courseId = parseInt(params.courseId);
    const videoId = parseInt(params.videoId);

    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])
    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);

    const { videoEditData, videoEditDataError, videoEditDataState, refetchVideoEditDataAsync } = useVideoEditData(videoId);

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

    /* const checkIfCurrentCourseFromUrl = () => {
        const found = modules.some(module => module.items.some((item) => {
            return item.type === "video" && item.id === videoId
        }));

        if (!found && modules[0]) {
            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/" + modules[0].items[0].type + "/" + modules[0].items[0].id)
        }
    } */
    // effects 
    useEffect(() => {

        if (!courseContentEditData)
            return;

        setModules(courseContentEditData.modules);
        setOpenModuleIds(courseContentEditData.modules.map(x => x.id));

    }, [courseContentEditData]);

    // checkIfCurrentCourseFromUrl()

    return <AdminBreadcrumbsHeader breadcrumbs={[
        <BreadcrumbLink
            title={userEditData?.lastName + " " + userEditData?.firstName}
            iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/edit"} />,
        <BreadcrumbLink
            title={courseBriefData?.title!}
            to={applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/content"} />,
        <BreadcrumbLink
            title={videoEditData?.title + ""}
            isCurrent />,
    ]}>

        <AdminCourseItemList
            modules={modules}
            navigationFunction={(itemId, itemType) => navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/" + itemType + "/" + itemId)} />

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.videoStatisticsRoute
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
                { }
            </Flex>
        </AdminSubpageHeader >

    </AdminBreadcrumbsHeader>
}