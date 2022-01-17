import { Flex } from "@chakra-ui/react"
import { getAssetUrl } from "../../static/frontendHelpers"
import StatisticsCard from "../statisticsCard/StatisticsCard"

export const ExamResultStats = (props: {
    correctAnswerRate: number,
    correctAnswerCount: number,
    totalQuestionCount: number
}) => {

    const { correctAnswerRate, correctAnswerCount, totalQuestionCount } = props;

    return <Flex
        width="100%"
        flexWrap="wrap"
        justify="center"
        align="center">

        <StatisticsCard
            iconPath={getAssetUrl("/icons/exam_result_good_answer_count.svg")}
            suffix={"%"}
            title={"Helyes válaszok aránya"}
            value={"" + correctAnswerRate} />

        <StatisticsCard
            iconPath={getAssetUrl("/icons/exam_result_good_answer_percent.svg")}
            suffix={""}
            title={"Helyes válasz a kérdésekre"}
            value={`${correctAnswerCount}/${totalQuestionCount}`} />

        <StatisticsCard
            iconPath={getAssetUrl("/icons/exam_result_time.svg")}
            suffix={"perc"}
            title={"Alatt teljesítetted a tesztet"}
            value={"66"} />

        <StatisticsCard
            iconPath={getAssetUrl("/icons/exam_result_top_percent.svg")}
            suffix={"%"}
            title={"Az összes felhaszáló között"}
            value={"top 20"} />
    </Flex>
}