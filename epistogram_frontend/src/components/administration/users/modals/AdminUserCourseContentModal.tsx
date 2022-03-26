import { Flex, Image } from "@chakra-ui/react"
import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { UserCourseProgressChartDTO } from "../../../../shared/dtos/UserCourseProgressChartDTO"
import { getAssetUrl, roundNumber } from "../../../../static/frontendHelpers"
import { translatableTexts } from "../../../../static/translatableTexts"
import { EpistoFont } from "../../../controls/EpistoFont"
import { TabPanel } from "../../../courseDetails/TabPanel"
import { EpistoDialog, EpistoDialogLogicType } from "../../../EpistoDialog"
import { NoProgressChartYet } from "../../../home/NoProgressChartYet"
import { UserProgressChart } from "../../../home/UserProgressChart"
import StatisticsCard from "../../../statisticsCard/StatisticsCard"
import { AdminUserVideosDataGridControl } from "../dataGrids/AdminUserVideosDataGridControl"

export const AdminUserCourseContentOverviewModalSubpage = (props: {
    userStats: {
        userProgressData: UserCourseProgressChartDTO,
        completedVideoCount: number,
        totalVideoPlaybackSeconds: number,
        totalGivenAnswerCount: number,
        totalCorrectAnswerRate: number
    }
}) => {

    const { userStats } = props

    return <Flex direction="column" p="20px">
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

                {userStats.userProgressData && userStats.userProgressData.days.length > 0
                    ? <UserProgressChart userProgress={userStats.userProgressData} />
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
}



export const AdminUserCourseContentModal = (props: {
    userCourseStatsData: {
        userProgressData: UserCourseProgressChartDTO,
        completedVideoCount: number,
        totalVideoPlaybackSeconds: number,
        totalGivenAnswerCount: number,
        totalCorrectAnswerRate: number
    },
    dialogLogic: EpistoDialogLogicType
}) => {

    const { userCourseStatsData: userStats, dialogLogic } = props

    const [currentTab, setCurrentTab] = useState(0)


    const moreInfoDialogTabs = [
        {
            title: "Áttekintés",
            component: <AdminUserCourseContentOverviewModalSubpage userStats={userStats} />
        },
        {
            title: "Videók",
            component: <Flex>
                <AdminUserVideosDataGridControl />
            </Flex>
        },
        {
            title: "Vizsgák",
            component: <Flex>

            </Flex>
        },
        {
            title: "Kommentek/kérdések",
            component: <Flex>
                Kommentek/kérdések
            </Flex>
        }
    ]

    return <EpistoDialog fullScreenX fullScreenY logic={dialogLogic}>
        <Flex
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* tabs */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                justify="space-between"
                position="sticky"
                w="100%"
                top="0"
                p="20px 30px 20px 30px"
                className="mildShadow"
                zIndex="1000"
                flex="1">

                <Flex align="center">
                    <Flex h="50px" direction="column" mr="20px">
                        <EpistoFont fontSize={"fontLarge"} style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            fontWeight: 600
                        }}>
                            Microsoft PowerPoint alapok
                        </EpistoFont>
                        <EpistoFont fontSize={"fontMid"}>
                            Kiss Edina
                        </EpistoFont>
                    </Flex>
                </Flex>
                <Tabs
                    value={currentTab}
                    onChange={(_, y) => setCurrentTab(y as number)}
                    className="roundBorders"
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                    sx={{
                        "&.MuiTabs-root": {
                            //background: "var(--transparentIntenseBlue85)",
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
                    value={currentTab}
                    index={index}>

                    {x.component}
                </TabPanel>)}
        </Flex>
    </EpistoDialog>
}