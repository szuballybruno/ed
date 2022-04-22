import { Flex } from '@chakra-ui/react';
import { Environment } from '../../static/Environemnt';

import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';

export const ExamResultStats = (props: {
    correctAnswerRate: number,
    correctAnswerCount: number,
    totalQuestionCount: number
}) => {

    const { correctAnswerRate, correctAnswerCount, totalQuestionCount } = props;

    return <EpistoGrid
        width="100%"
        minColumnWidth={'200px'}
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
            suffix={translatableTexts.exam.examResultStats.examDoneInMinutes.suffix}
            title={translatableTexts.exam.examResultStats.examDoneInMinutes.title}
            value={'66'} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_top_percent.svg')}
            suffix={translatableTexts.exam.examResultStats.fromAllUsers.suffix}
            title={translatableTexts.exam.examResultStats.fromAllUsers.title}
            value={'top 20'} />
    </EpistoGrid>;
};