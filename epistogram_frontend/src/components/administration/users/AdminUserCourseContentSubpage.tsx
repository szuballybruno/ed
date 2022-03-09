import { Flex } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCourseBriefData, useCourseContentEditData } from "../../../services/api/courseApiService";
import { useEditUserData } from "../../../services/api/userApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoHeader } from "../../EpistoHeader";
import { CollapseItem } from "../../universal/CollapseItem";
import { DragAndDropContext, DropZone, DragItem } from "../../universal/DragAndDrop";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminCourseList } from "../courses/AdminCourseList"
import { ChipSmall } from "../courses/CourseEditItemView";

export const AdminUserCourseContentSubpage = () => {

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
            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courses[0].courseId + "/content")
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
            navigationFunction={(courseId) => navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/content")} />

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

                {modules
                    .map((module, moduleIndex) => {

                        return <CollapseItem
                            handleToggle={(targetIsOpen) => setModuleOpenState(targetIsOpen, module.id)}
                            isOpen={openModuleIds.some(x => x === module.id)}
                            style={{ width: "100%" }}
                            header={(ecButton) => <Flex
                                p="2px">

                                {ecButton}

                                <Flex
                                    width="100%"
                                    align="center"
                                    justify="space-between">

                                    <EpistoHeader
                                        text={module.name}
                                        variant="strongSub"
                                        style={{ marginLeft: "10px" }} />
                                </Flex>
                            </Flex>}>

                            {module
                                .items
                                .map((item, itemIndex) => {

                                    return <Flex
                                        onClick={() => {
                                            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + courseId + "/" + item.type + "/" + item.id)
                                        }}
                                        flexDir={"column"}
                                        flex={1}>

                                        <Flex
                                            flex="1"
                                            borderLeft={`5px solid var(--${item.type === "video" ? "deepBlue" : "intenseOrange"})`}
                                            pl="10px"
                                            justify="flex-start"
                                            m="3px">

                                            <Flex
                                                justify={"center"} >

                                                {/* index */}
                                                <Flex
                                                    align={"center"}
                                                    height="100%">

                                                    <EpistoFont
                                                        style={{
                                                            marginRight: "10px"
                                                        }}>

                                                        {itemIndex + 1}.
                                                    </EpistoFont>
                                                </Flex>

                                                {/* title & subtitle */}
                                                <Flex
                                                    flexDir={"column"}
                                                    justifyContent={"center"}
                                                    minWidth={250}>

                                                    {/* title */}
                                                    <EpistoFont>
                                                        {item.title}
                                                    </EpistoFont>

                                                    {/* subtitle */}
                                                    <EpistoFont
                                                        fontSize={"fontSmall"}
                                                        classes={["fontGrey"]}>

                                                        {item.subTitle}
                                                    </EpistoFont>
                                                </Flex>
                                            </Flex>


                                            <Flex>

                                                {/* chips  */}
                                                <Flex
                                                    direction="column"
                                                    flexWrap="wrap"
                                                    flex="1">

                                                    <Flex>

                                                        {/* final exam */}
                                                        {item.isFinalExam && <ChipSmall
                                                            color={"var(--deepBlue)"}
                                                            text={"Záróvizsga"} />}

                                                        {/* video lenght / uploaded video */}
                                                        {item.type === "video" && <ChipSmall
                                                            color={item.videoLength > 0
                                                                ? "var(--deepGreen)"
                                                                : "var(--deepRed)"}
                                                            text={
                                                                item.videoLength
                                                                    ? `${translatableTexts.administration.courseEditItemView.videoLength} ${formatTime(Math.round(item.videoLength))}`
                                                                    : translatableTexts.administration.courseEditItemView.noVideoUploaded} />}

                                                        {/* question count */}
                                                        <ChipSmall
                                                            color={
                                                                item.questionCount > 0
                                                                    ? "var(--deepGreen)"
                                                                    : "var(--deepRed)"
                                                            }
                                                            text={
                                                                item.videoLength || item.videoLength === 0
                                                                    ? `${translatableTexts.administration.courseEditItemView.questions} ${item.questionCount}`
                                                                    : "Nincs kérdés feltöltve"
                                                            } />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>

                                    {/* <CourseEditItemView
                                                moduleIndex={moduleIndex}
                                                index={itemIndex}
                                                item={item}
                                                deleteCourseItem={handleDeleteCourseItemAsync}
                                                showCourseItemStats={handleCourseItemStatistics}
                                                editCourseItem={handleEditCourseItem}
                                                isShowDivider={itemIndex + 1 < module.items.length} /> */}

                                })}
                        </CollapseItem>
                    })}
            </Flex>
        </AdminSubpageHeader >

    </AdminBreadcrumbsHeader >
}