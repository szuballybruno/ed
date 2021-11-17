import { Flex } from "@chakra-ui/react";
import StatisticsCard from "./statisticsCard/StatisticsCard";
import React from "react";
import classes from "./learningStatistics/learningStatistics.module.scss";
import { Bar } from "react-chartjs-2";
import { chartDefaultOptions, daysWithActivityInTime } from "./learningStatistics/LearningStatistics";
import { getAssetUrl, roundNumber } from "../frontendHelpers";
import { FlexFloat } from "./universal/FlexFloat";
import { Lock } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { translatableTexts } from "../translatableTexts";
import { useUserStats } from "../services/userStatsService";

export const StatsSummary = () => {

    const { userStats } = useUserStats();

    return <div
        style={{
            width: "100%",
            maxWidth: "100%",
            display: "grid",
            padding: "10px",
            boxSizing: "border-box",
            gap: "10px",
            gridAutoFlow: "row dense",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gridAutoRows: "200px"
        }}>

        {/* chart item  */}
        <FlexFloat
            direction="column"
            p="0px"
            minW={250}
            style={{
                gridColumn: `auto / span 2`,
                gridRow: `auto / span 2`
            }}
            position="relative"
            m="10px" >

            {/* locked overlay */}
            <Flex
                flexDir="column"
                boxSizing="border-box"
                p={20}
                alignItems="center"
                justifyContent="center"
                pos="absolute"
                w="100%"
                h="100%"
                bgColor="#333333CC"
                color="white"
                borderRadius={5} >
                <Lock style={{
                    width: "50%",
                    height: "50%"
                }} />
                <Typography align="center">
                    {translatableTexts.homePage.noStatsYet}
                </Typography>
            </Flex>

            {/* bar chart */}
            <Bar
                className={classes.progressLineChart}
                options={chartDefaultOptions}
                data={daysWithActivityInTime} />
        </FlexFloat>

        {/* total completed video count */}
        <StatisticsCard
            title="Megtekintett videók a hónapban"
            value={userStats ? userStats.completedVideoCount + "" : "0"}
            suffix="db"
            iconPath={getAssetUrl("statistics_icons/watched_videos.svg")}
            isOpenByDefault={false} />

        {/* total playback time */}
        <StatisticsCard
            title="Videónézéssel eltöltött idő a hónapban"
            value={userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) + "" : "0"}
            suffix="óra"
            iconPath={getAssetUrl("statistics_icons/total_watching_time.svg")}
            isOpenByDefault={false} />

        {/* total given answer count  */}
        <StatisticsCard
            title="Megválaszolt tudást vizsgáló kérdések száma"
            value={userStats ? userStats.totalGivenAnswerCount + "" : "0"}
            suffix="db"
            iconPath={getAssetUrl("statistics_icons/answered_questions.svg")}
            isOpenByDefault={false} />

        {/* correct answer rate  */}
        <StatisticsCard
            title="Helyes válaszok aránya"
            value={userStats ? roundNumber(userStats.totalCorrectAnswerRate) + "" : "0"}
            suffix="%"
            iconPath={getAssetUrl("statistics_icons/correct_answer_rate.svg")}
            isOpenByDefault={false} />
    </div>
}
