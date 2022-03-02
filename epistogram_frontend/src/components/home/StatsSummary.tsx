import { useContext } from "react";
import { useUserProgressData } from "../../services/api/userProgressApiService";
import { useUserStats } from "../../services/api/userStatsApiService";
import { getAssetUrl, roundNumber } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { FlexFloat } from "../controls/FlexFloat";
import StatisticsCard from "../statisticsCard/StatisticsCard";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { NoProgressChartYet } from "./NoProgressChartYet";
import { UserProgressChart } from "./UserProgressChart";

export const StatsSummary = (props: {
    courseId: number | null
}) => {

    const { courseId } = props;

    const currentUser = useContext(CurrentUserContext);
    const { userStats } = useUserStats(currentUser!.id);
    const { userProgressData, userProgressDataError, userProgressDataState } = useUserProgressData(courseId ?? 0, !!courseId);

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
            //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
            direction="column"
            p="10px"
            minWidth={250}
            style={{
                gridColumn: `auto / span 2`,
                gridRow: `auto / span 2`
            }} >

            {userProgressData && userProgressData.days.length > 0
                ? <UserProgressChart userProgress={userProgressData} />
                : <NoProgressChartYet />}
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
