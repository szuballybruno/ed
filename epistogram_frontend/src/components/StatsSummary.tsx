import StatisticsCard from "./statisticsCard/StatisticsCard";
import { useContext } from "react";
import { getAssetUrl, roundNumber } from "../static/frontendHelpers";
import { FlexFloat } from "./controls/FlexFloat";
import { Typography } from "@mui/material";
import { translatableTexts } from "../static/translatableTexts";
import { useUserStats } from "../services/api/userStatsApiService";
import { CurrentUserContext } from "./system/AuthenticationFrame";
import { EpistoHeader } from "./EpistoHeader";
import { EpistoFont } from "./controls/EpistoFont";

export const StatsSummary = () => {

    const currentUser = useContext(CurrentUserContext);
    const { userStats } = useUserStats(currentUser!.id);

    return <div
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
            direction="column"
            p="10px"
            minWidth={250}
            style={{
                gridColumn: `auto / span 2`,
                gridRow: `auto / span 2`
            }} >

            {/* locked overlay */}
            <EpistoHeader
                text={translatableTexts.homePage.statsSummary.mostImportantStatistics}
                showDivider variant="strongSub"
                m="5px 10px 20px 10px" />

            {/* bar chart */}
            <img
                src={getAssetUrl("/images/learningcurve3D.png")}
                alt={""}
                style={{
                    maxHeight: 180,
                    objectFit: "contain",
                    margin: "0 10px 0 0",
                }} />

            <EpistoFont fontSize="fontSmall" style={{
                textAlign: "center",
                margin: "0 20px"
            }}>
                {translatableTexts.homePage.noStatsYet}
            </EpistoFont>
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
}
