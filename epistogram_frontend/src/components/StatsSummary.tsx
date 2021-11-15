import {Flex} from "@chakra-ui/react";
import StatisticsCard from "./statisticsCard/StatisticsCard";
import React from "react";
import classes from "./learningStatistics/learningStatistics.module.scss";
import {Bar} from "react-chartjs-2";
import {chartDefaultOptions, daysWithActivityInTime} from "./learningStatistics/LearningStatistics";
import {getAssetUrl} from "../frontendHelpers";
import {FlexFloat} from "./universal/FlexFloat";
import {Lock} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {translatableTexts} from "../translatableTexts";

export const StatsSummary = () => {
    return <div style={{
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
            <Flex
                flexDir={"column"}
                boxSizing={"border-box"}
                p={20}
                alignItems={"center"}
                justifyContent={"center"}
                pos={"absolute"}
                w={"100%"}
                h={"100%"}
                bgColor={"#333333CC"}
                color={"white"}
                borderRadius={5} >
                <Lock style={{
                    width: "50%",
                    height: "50%"
                }}/>
                <Typography align={"center"}>
                    {translatableTexts.homePage.noStatsYet}
                </Typography>
            </Flex>
            <Bar
                className={classes.progressLineChart}
                options={chartDefaultOptions}
                data={daysWithActivityInTime} />
        </FlexFloat>
        <StatisticsCard
            title={"Session átlagos hossza"}
            value={"32"}
            suffix={"perc"}
            iconPath={getAssetUrl("statistics_icons/average_session_length.svg")}
            isOpenByDefault={false}>

        </StatisticsCard>
        <StatisticsCard
            title={"Session átlagos hossza"}
            value={"32"}
            suffix={"perc"}
            iconPath={getAssetUrl("statistics_icons/average_session_length.svg")}
            isOpenByDefault={false}>

        </StatisticsCard>
        <StatisticsCard
            title={"Session átlagos hossza"}
            value={"32"}
            suffix={"perc"}
            iconPath={getAssetUrl("statistics_icons/average_session_length.svg")}
            isOpenByDefault={false}>

        </StatisticsCard>
        <StatisticsCard
            title={"Session átlagos hossza"}
            value={"32"}
            suffix={"perc"}
            iconPath={getAssetUrl("statistics_icons/average_session_length.svg")}
            isOpenByDefault={false}>

        </StatisticsCard>
    </div>
}
