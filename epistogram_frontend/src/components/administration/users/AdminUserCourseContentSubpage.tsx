import { Flex, Image } from "@chakra-ui/react";
import { Tab, Tabs } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCourseBriefData, useCourseContentEditData } from "../../../services/api/courseApiService";
import { useEditUserData } from "../../../services/api/userApiService";
import { useUserProgressData } from "../../../services/api/userProgressApiService";
import { useUserStats } from "../../../services/api/userStatsApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { AdminPageUserDTO } from "../../../shared/dtos/AdminPageUserDTO";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { getAssetUrl, roundNumber } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { TabPanel } from "../../courseDetails/TabPanel";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { NoProgressChartYet } from "../../home/NoProgressChartYet";
import { UserProgressChart } from "../../home/UserProgressChart";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader"
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminUserList } from "./AdminUserList";

export const AdminUserCourseContentSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props


    const params = useParams<{ courseId: string, userId: string, }>();

    const userId = parseInt(params.userId);
    const courseId = parseInt(params.courseId);

    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])
    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);

    const [currentMoreInfoDialogTab, setCurrentMoreInfoDialogTab] = useState<number>(0)

    const { userStats } = useUserStats(userId);
    const { userProgressData, userProgressDataError, userProgressDataState } = useUserProgressData(courseId ?? 0, !!courseId);

    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList("");

    const getRowsFromVideos = () => courses.map((course) => {
        return {
            id: course.courseId,
            title: "asd",
            videoLength: "asd",
            allSpentTime: "",
            replaysCount: "",
            isAnsweredCorrectly: "",
            reactionTime: "",
            lastWatchTime: "",
        }
    })

    const videoRows: GridRowsProp = getRowsFromVideos()

    const videoColumns: GridColDef[] = [
        { field: 'title', headerName: 'Cím', width: 130, renderCell: (params) => <img src={params.value} /> },
        { field: 'videoLength', headerName: 'Videó hossz', width: 300, editable: true, resizable: true },
        { field: 'allSpentTime', headerName: 'Összes eltöltött idő', width: 150, resizable: true },
        { field: 'replaysCount', headerName: 'Ismétlések száma', width: 150, resizable: true },
        { field: 'isAnsweredCorrectly', headerName: 'Helyesen válaszolt?', width: 150, resizable: true },
        { field: 'reactionTime', headerName: 'Reakcióidő', width: 150, resizable: true },
        { field: 'lastWatchTime', headerName: 'Utolsó megtekintés ideje', width: 150, resizable: true }
    ];

    const getRowsFromExams = () => courses.map((course) => {
        return {
            id: course.courseId,
            avatar: course.thumbnailImageURL,
            title: course.title,
            category: course.category.name,
            subCategory: course.subCategory.name,
            videosCount: course.videosCount,
            editCourse: course.courseId
        }
    })

    const examRows: GridRowsProp = getRowsFromExams()

    const examColumns: GridColDef[] = [
        { field: 'avatar', headerName: 'Thumbnail kép', width: 130, renderCell: (params) => <img src={params.value} /> },
        { field: 'title', headerName: 'Cím', width: 300, editable: true, resizable: true },
        { field: 'progress', headerName: 'Haladás', width: 150, resizable: true },
        { field: 'currentPerformance', headerName: 'Jelenlegi teljesítmény', width: 150, resizable: true },
        { field: 'watchedVideos', headerName: 'Megtekintett videók', width: 150, resizable: true },
        { field: 'doneExams', headerName: 'Elvégzett vizsgák', width: 150, resizable: true },
        { field: 'isFinalExamDone', headerName: 'Kurzuszáró vizsga', width: 150, resizable: true },
        { field: 'currentTempomatMode', headerName: 'Jelenlegi tempomat mód', width: 150, resizable: true },
        { field: 'recommendedVideosCount', headerName: 'Ajánlott videók hetente', width: 150, resizable: true }
    ];

    const moreInfoDialogTabs = [
        {
            title: "Áttekintés",
            component: <Flex direction="column" p="20px">
                <Flex>
                    <Flex flex="1" align="center">
                        <Image flex="1" maxH="200px" objectFit="contain" src={getAssetUrl("/images/donut1.png")} />

                        <Image flex="1" maxH="200px" objectFit="contain" src={getAssetUrl("/images/donut2.png")} />

                        <Image flex="1" maxH="200px" objectFit="contain" src={getAssetUrl("/images/donut3.png")} />
                    </Flex>
                    <Flex
                        className="roundBorders"
                        flex="1"
                        p="10px"
                        direction="column"
                        background="var(--transparentWhite70)">

                        {userProgressData && userProgressData.days.length > 0
                            ? <UserProgressChart userProgress={userProgressData} />
                            : <NoProgressChartYet />}
                    </Flex>
                </Flex>
                <div
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        display: "grid",
                        boxSizing: "border-box",
                        gap: "10px",
                        gridAutoFlow: "row dense",
                        gridTemplateColumns: "repeat(auto-fill, minmax(23%, 1fr))",
                        gridAutoRows: "160px"
                    }}>

                    {/* {/* chart item
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
                        direction="column"
                        p="10px"
                        minWidth={250}
                        style={{
                            gridColumn: `auto / span 2`,
                            gridRow: `auto / span 2`
                        }}>

                        <Image
                            src={getAssetUrl("images/piechart.png")}
                            w="100%"
                            h="100%"
                            objectFit="contain" />

                    </FlexFloat> */}

                    {/* total completed video count */}
                    <StatisticsCard
                        title={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.title}
                        value={userStats ? userStats.completedVideoCount + "" : "0"}
                        suffix={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.suffix}
                        iconPath={getAssetUrl("images/watchedvideos3Dsmaller.png")}
                        isOpenByDefault={false} />

                    {/* total playback time */}
                    <StatisticsCard
                        title={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.title}
                        value={userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) + "" : "0"}
                        suffix={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.suffix}
                        iconPath={getAssetUrl("images/watch3D.png")}
                        isOpenByDefault={false} />

                    {/* total given answer count  */}
                    <StatisticsCard
                        title={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.title}
                        value={userStats ? userStats.totalGivenAnswerCount + "" : "0"}
                        suffix={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.suffix}
                        iconPath={getAssetUrl("images/answeredquestions3D.png")}
                        isOpenByDefault={false} />

                    {/* correct answer rate  */}
                    <StatisticsCard
                        title={translatableTexts.homePage.statsSummary.correctAnswerRate.title}
                        value={userStats ? roundNumber(userStats.totalCorrectAnswerRate) + "" : "0"}
                        suffix={translatableTexts.homePage.statsSummary.correctAnswerRate.suffix}
                        iconPath={getAssetUrl("images/rightanswer3D.png")}
                        isOpenByDefault={false} />
                </div>
            </Flex>
        },
        {
            title: "Videók",
            component: <Flex h="400px">
                <DataGrid rows={videoRows} columns={videoColumns} />
            </Flex>
        },
        {
            title: "Vizsgák",
            component: <Flex>
                <DataGrid rows={examRows} columns={examColumns} />
            </Flex>
        },
        {
            title: "Kommentek/kérdések",
            component: <Flex>
                Kommentek/kérdések
            </Flex>
        }
    ]

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
    const { courseContentEditData, courseContentEditDataError, courseContentEditDataState, refetchCourseContentEditData } = useCourseContentEditData(courseId);

    const { navigate } = useNavigation()

    const dialogLogic = useEpistoDialogLogic({
        defaultCloseButtonType: "top"
    });

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


    const getRowsFromCourses = () => courses.map((course) => {
        return {
            id: course.courseId,
            avatar: course.thumbnailImageURL,
            title: course.title,
            category: course.category.name,
            subCategory: course.subCategory.name,
            videosCount: course.videosCount,
            editCourse: course.courseId
        }
    })

    const courseRows: GridRowsProp = getRowsFromCourses()

    const columns: GridColDef[] = [
        { field: 'avatar', headerName: 'Thumbnail kép', width: 130, renderCell: (params) => <img src={params.value} /> },
        { field: 'title', headerName: 'Cím', width: 300, editable: true, resizable: true },
        { field: 'progress', headerName: 'Haladás', width: 150, resizable: true },
        { field: 'currentPerformance', headerName: 'Jelenlegi teljesítmény', width: 150, resizable: true },
        { field: 'watchedVideos', headerName: 'Megtekintett videók', width: 150, resizable: true },
        { field: 'doneExams', headerName: 'Elvégzett vizsgák', width: 150, resizable: true },
        { field: 'isFinalExamDone', headerName: 'Kurzuszáró vizsga', width: 150, resizable: true },
        { field: 'currentTempomatMode', headerName: 'Jelenlegi tempomat mód', width: 150, resizable: true },
        { field: 'recommendedVideosCount', headerName: 'Ajánlott videók hetente', width: 150, resizable: true },
        {
            field: 'editCourse',
            headerName: 'Kurzus szerkesztése',
            width: 150,
            renderCell: (params) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() => {
                        navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + userId + "/courses/" + params.value + "/content")
                        dialogLogic.openDialog()
                    }} >
                    Bővebben
                </EpistoButton>
        }
    ];

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

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.editRoute.route, { userId: userId })
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

            <EpistoDialog fullScreenY fullScreenX logic={dialogLogic}>
                <Flex
                    overflowY="scroll"
                    className="roundBorders"
                    flex="1"
                    flexDirection="column">

                    {/* tabs */}
                    <Flex
                        direction="column"
                        background="white"
                        position="absolute"
                        w="100%"
                        top="0"
                        p="10px"
                        flex="1">

                        <Flex h="100px" direction="column">
                            <EpistoFont fontSize={"fontHuge"}>
                                Felhasználó neve
                            </EpistoFont>
                            <EpistoFont fontSize={"fontLarge"}>
                                Kurzus neve
                            </EpistoFont>
                        </Flex>
                        <Tabs
                            value={currentMoreInfoDialogTab}
                            onChange={(_, y) => setCurrentMoreInfoDialogTab(y as number)}
                            className="roundBorders"
                            TabIndicatorProps={{
                                style: {
                                    display: "none",
                                },
                            }}
                            sx={{
                                "&.MuiTabs-root": {
                                    //background: "var(--transparentIntenseBlue)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 45,
                                    minHeight: 0
                                }
                            }}>

                            {moreInfoDialogTabs
                                .map((x, index) => {

                                    return <Tab
                                        sx={{
                                            "&.MuiTab-root": {
                                                color: "#444",
                                                cursor: "pointer",
                                                backgroundColor: "transparent",
                                                padding: "6px 16px",
                                                border: "none",
                                                borderRadius: "5px",
                                                display: "flex",
                                                justifyContent: "center",
                                                height: "41px",
                                                minHeight: "0px"
                                            },
                                            "&.MuiTouchRipple-root": {
                                                lineHeight: "0px"
                                            },
                                            "&.Mui-selected": {
                                                color: "#444",
                                                fontWeight: "bold",
                                                background: "var(--transparentIntenseTeal)"
                                            }
                                        }}
                                        label={x.title}
                                        key={index}
                                        id={`simple-tab-${index}`} />
                                })}
                        </Tabs>
                    </Flex>

                    { /* tab contents */}
                    {moreInfoDialogTabs
                        .map((x, index) => <TabPanel
                            style={{
                                marginTop: 160
                            }}
                            value={currentMoreInfoDialogTab}
                            index={index}>

                            {x.component}
                        </TabPanel>)}
                </Flex>
            </EpistoDialog>

            <DataGrid rows={courseRows} columns={columns} />
        </AdminSubpageHeader >

    </AdminBreadcrumbsHeader >
}