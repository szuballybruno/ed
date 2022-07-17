import { Flex } from '@chakra-ui/react';
import { Environment } from '../../static/Environemnt';
import { formatTime } from '../../static/frontendHelpers';

import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';

export const ExamResultStats = (props: {
    correctAnswerRate: number,
    correctAnswerCount: number,
    totalQuestionCount: number,
    examLengthSeconds: number | null,
    examSuccessRateDiffFromCompany: number | null
}) => {

    const { correctAnswerRate, correctAnswerCount, totalQuestionCount, examLengthSeconds, examSuccessRateDiffFromCompany } = props;

    const successRateDiffInText = ((successRateDiff: number | null = examSuccessRateDiffFromCompany) => {

        if (!successRateDiff)
            return null;

        if (successRateDiff > 30)
            return 'Kimagasló';

        if (successRateDiff < -30)
            return 'Átlag alatti';

        return 'Átlagos';

    })();

    return <EpistoGrid
        width="100%"
        minColumnWidth={'280px'}
        gap={'10px'}
        auto={'fill'}>

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_good_answer_count.svg')}
            suffix={translatableTexts.exam.examResultStats.correctAnswersRatio.suffix}
            title={translatableTexts.exam.examResultStats.correctAnswersRatio.title}
            value={'' + correctAnswerRate} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_good_answer_percent.svg')}
            suffix={translatableTexts.exam.examResultStats.correctAnswersCount.suffix}
            title={translatableTexts.exam.examResultStats.correctAnswersCount.title}
            value={`${correctAnswerCount}/${totalQuestionCount}`} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_time.svg')}
            suffix={translatableTexts.misc.suffixes.second}
            title={translatableTexts.exam.examResultStats.examDoneInMinutes.title}
            value={examLengthSeconds ? formatTime(examLengthSeconds) : null} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_top_percent.svg')}
            suffix={translatableTexts.exam.examResultStats.fromAllUsers.suffix}
            title={translatableTexts.exam.examResultStats.fromAllUsers.title}
            value={successRateDiffInText} />
    </EpistoGrid>;
};