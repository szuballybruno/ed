import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { NavigateBefore } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { title } from "process";
import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ButtonType } from "../../../models/types";
import { useEditUserData } from "../../../services/api/userApiService";
import { useActiveCourses, useUserProgressData } from "../../../services/api/userProgressApiService";
import { useUserStats } from "../../../services/api/userStatsApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { AdminPageUserDTO } from "../../../shared/dtos/AdminPageUserDTO";
import { CourseLearningDTO } from "../../../shared/dtos/CourseLearningDTO";
import { getAssetUrl, roundNumber, usePaging } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoGrid } from "../../controls/EpistoGrid";
import { FlexFloat } from "../../controls/FlexFloat";
import { NoProgressChartYet } from "../../home/NoProgressChartYet";
import { UserProgressChart } from "../../home/UserProgressChart";
import { LearningCourseStatsTile, SmallStat } from "../../learningInsights/LearningCourseStatsTile";
import { LearningStatistics } from "../../learningInsights/LearningStatistics";
import { LinearProgressWithLabel } from "../../signup/ProgressIndicator";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import CourseTile from "../../universal/CourseTile";
import { DashboardSection } from "../../universal/DashboardSection";
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "../courses/EditSection";
import { AdminUserList } from "./AdminUserList";

const DummyLearningCourseStatsModified = () => <GridItem
    className="roundBorders"
    background="var(--transparentWhite70)">

    <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        shadow={"0 0 10px 1px #CCC"}
        background="var(--transparentWhite70)"
        p="5"
        justifyContent="space-between">

        {/* cover image box */}
        <Box
            flex="1"
            position="relative"
            minHeight={150}
            maxHeight={150}>

            {/* cover image */}
            <img
                className="whall"
                style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    position: "absolute"
                }}
                src={getAssetUrl("courseCoverImages/4.png")}
                alt="" />
        </Box>

        {/* content */}
        <Flex p="10px" direction="column">

            {/* category  */}
            <Text
                as="text"
                color="grey">

                Irodai alkalmazások
            </Text>

            {/* title */}
            <Text
                as="h6"
                fontWeight={"bold"}
                fontSize="large">

                Microsoft Excel Mesterkurzus
            </Text>

            {/* small stats */}
            <Flex mt={7} justify="space-evenly">

                {/* spent time  */}
                <SmallStat
                    iconUrl={getAssetUrl("images/time3D.png")}
                    text={"2m"} />

                {/* videos  */}
                <SmallStat
                    iconUrl={getAssetUrl("images/videos3D.png")}
                    text={"18/1"} />

                {/* video questions */}
                <SmallStat
                    iconUrl={getAssetUrl("images/rightanswerontile3D.png")}
                    text={`2/0`} />
            </Flex>

            {/* course progress bar chart */}
            <Flex
                direction={"row"}
                alignItems={"center"}
                mt={7}
                width="100%"
                height="10px">

                <LinearProgress
                    variant="determinate"
                    style={{
                        width: "100%",
                    }}
                    value={70} />

                <Flex m="0 5px 0 20px">
                    {`${70}%`}
                </Flex>

            </Flex>
        </Flex>

        {/* buttons */}
        <Flex mt="10px">


            {/* start course */}
            <EpistoButton
                variant="colored"
                style={{ flex: "1" }}>

                Részletek
            </EpistoButton>
        </Flex>
    </FlexFloat>
</GridItem>

const UserStatisticsProgressWithLabel = () => {
    return <Flex
        w="100%"
        mt="10px"
        h="30px"
        align="center"
        p="5px">

        <EpistoFont fontSize={"fontExtraSmall"}>
            Kurzusok időben való teljesítése
        </EpistoFont>

        <LinearProgress
            value={95}
            variant="determinate"
            style={{
                width: "80%",
                color: "red",
                margin: "0 10px",
                height: "5px"
            }} />

        <EpistoFont
            style={{
                fontWeight: 600
            }}
            fontSize={"fontSmall"}>

            95
        </EpistoFont>
    </Flex>
}

export const AdminUserStatisticsSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props

    const params = useParams<{ userId: string }>();
    const userId = parseInt(params.userId);

    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);
    const navigateToUserCourses = () => navigate(`${applicationRoutes.administrationRoute.usersRoute.route}/${userId}/courses/:courseId/statistics`)
    const location = useLocation()

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging(activeCourses);
    const activeCourseId = activeCoursesPaging?.currentItem?.courseId ?? null

    const { userEditData } = useEditUserData(userId);
    const { userStats } = useUserStats(userId);
    const { userProgressData, userProgressDataError, userProgressDataState } = useUserProgressData(1, true);

    const bulkEditButtons = [
        {
            title: "Összes megtekintett kurzus",
            action: () => navigateToUserCourses()
        },
        {
            title: "Hozzáadás",
            action: () => navigateToAddUser()
        }
    ] as ButtonType[]

    return <AdminBreadcrumbsHeader
        viewSwitchChecked={location.pathname === applicationRoutes.administrationRoute.usersRoute.route}
        viewSwitchFunction={() => {
            navigate(applicationRoutes.administrationRoute.usersRoute.route)
        }}
        subRouteLabel={`${userEditData?.lastName} ${userEditData?.firstName}`}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.statsRoute.route, { userId: userId })
            }} />

        {/* admin header */}
        <AdminSubpageHeader
            direction="column"
            tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.editRoute,
                applicationRoutes.administrationRoute.usersRoute.statsRoute
            ].concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}
            headerButtons={bulkEditButtons}>

            {/* learning insights header */}
            <EditSection
                isFirst
                title="Tanulási jelentés"
                rightSideComponent={<Flex justify="center" align="center" my="10px">

                    <Image
                        h="30px"
                        w="30px"
                        mr="5px"
                        src={getAssetUrl("/images/tempomatdatechange.png")}
                    />

                    <EpistoFont fontSize={"fontLarge"}>

                        Vizsgált időszak:
                    </EpistoFont>

                    <EpistoFont
                        fontSize={"fontLarge"}
                        style={{
                            marginLeft: "5px",
                            fontWeight: 600
                        }}>

                        2022.03.14.
                    </EpistoFont>
                </Flex>}>
                <Flex minH="400px">
                    <Flex
                        direction="column"
                        justify="flex-start"
                        flex="4"
                        p="0 5px 0 0">

                        <Flex
                            background="var(--transparentWhite70)"
                            className="roundBorders mildShadow"
                            align="center"
                            p="10px"
                            maxH="150px"
                            flex="1"
                            position="relative">

                            <Image
                                h={"120px"}
                                w={"120px"}
                                src={getAssetUrl("images/happyfacechart.png")} />

                            <Flex direction="column" p="10px">
                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={"fontLargePlus"}>

                                    80/100 Pont
                                </EpistoFont>

                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={"fontSmallPlus"}>

                                    Jól teljesített a hónapban
                                </EpistoFont>

                                <EpistoFont
                                    fontSize={"fontSmallPlus"}>

                                    A tanfolyamokon jól teljesített, és a kitűzött határidőket is többnyire tartani tudta.
                                </EpistoFont>
                            </Flex>
                        </Flex>
                        <Flex w="100%" mt="20px" direction="column">

                            <UserStatisticsProgressWithLabel />
                            <UserStatisticsProgressWithLabel />
                            <UserStatisticsProgressWithLabel />
                            <UserStatisticsProgressWithLabel />
                            <UserStatisticsProgressWithLabel />
                        </Flex>
                    </Flex>
                    <Flex
                        direction="column"
                        flex="5"
                        p="0 0 10px 5px">
                        <Flex h="150px">

                            <StatisticsCard
                                iconPath={getAssetUrl("images/watchedvideos3Dsmaller.png")}
                                value={"13"}
                                suffix={"óra"}
                                style={{
                                    marginRight: 10
                                }}
                                title={"Aktívan eltöltött idő a platformon"} />
                            <StatisticsCard
                                iconPath={getAssetUrl("images/watchedvideos3Dsmaller.png")}
                                value={"38"}
                                suffix={"db"}
                                title={"megtekintett videók a hónapban"} />
                        </Flex>
                        <Flex p="10px">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In harum dolorem, illum eos ex labore consequuntur, ea tempora dolor maiores quo repudiandae, non vitae beatae nam perspiciatis pariatur dolores consequatur.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In harum dolorem, illum eos ex labore consequuntur, ea tempora dolor maiores quo repudiandae, non vitae beatae nam perspiciatis pariatur dolores consequatur.
                        </Flex>

                    </Flex>
                </Flex>
            </EditSection>

            <EditSection title="Kurzusok a hónapban">
                <EpistoGrid auto="fill" gap="15" minColumnWidth="250px" p="10px 0">

                    <DummyLearningCourseStatsModified />
                    <DummyLearningCourseStatsModified />
                </EpistoGrid>
            </EditSection>

            <EditSection title="Átlagos haladás a tanfolyamokon">
                <Flex p="10px 0" minH="400px">
                    <Flex flex="1">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis? Magnam aliquam dolorem consequatur laborum, incidunt sequi ipsam velit maiores aspernatur tenetur nesciunt dolor earum consequuntur! Minus facere reiciendis distinctio!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis? Magnam aliquam dolorem consequatur laborum, incidunt sequi ipsam velit maiores aspernatur tenetur nesciunt dolor earum consequuntur! Minus facere reiciendis distinctio!
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
            </EditSection>

            <EditSection title="Aktivitások">
                <div
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        display: "grid",
                        boxSizing: "border-box",
                        gap: "10px",
                        gridAutoFlow: "row dense",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gridAutoRows: "160px"
                    }}>

                    {/* chart item  */}
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

                    </FlexFloat>

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
            </EditSection>
        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader >
};
