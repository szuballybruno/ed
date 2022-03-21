import { Flex, Image } from "@chakra-ui/react"
import { SxProps, Tab, Tabs } from "@mui/material"
import { ReactNode, useState } from "react"
import { DialogOptions } from "../../../../models/types"
import { UserCourseProgressChartDTO } from "../../../../shared/dtos/UserCourseProgressChartDTO"
import { getAssetUrl, roundNumber } from "../../../../static/frontendHelpers"
import { translatableTexts } from "../../../../static/translatableTexts"
import { EpistoFont } from "../../../controls/EpistoFont"
import { TabPanel } from "../../../courseDetails/TabPanel"
import { EpistoDialog, EpistoDialogLogicType, EpistoDialogPropType } from "../../../EpistoDialog"
import { NoProgressChartYet } from "../../../home/NoProgressChartYet"
import { UserProgressChart } from "../../../home/UserProgressChart"
import StatisticsCard from "../../../statisticsCard/StatisticsCard"

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
    }
} & EpistoDialogPropType) => {

    const { userCourseStatsData: userStats, ...dialogOptions } = props

    const [currentTab, setCurrentTab] = useState(0)


    const moreInfoDialogTabs = [
        {
            title: "Áttekintés",
            component: <AdminUserCourseContentOverviewModalSubpage userStats={userStats} />
        },
        {
            title: "Videók",
            component: <Flex h="400px">

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

    return <EpistoDialog {...dialogOptions}>
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
                        Szubally Brúnó
                    </EpistoFont>
                    <EpistoFont fontSize={"fontLarge"}>
                        Microsoft PowerPoint alapok
                    </EpistoFont>
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
                    value={currentTab}
                    index={index}>

                    {x.component}
                </TabPanel>)}
        </Flex>
    </EpistoDialog>
}