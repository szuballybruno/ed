import { ExamStatsDTO } from '../../shared/dtos/ExamStatsDTO';
import { Environment } from '../../static/Environemnt';
import { formatTime } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';

export const ExamResultStats = ({ stats }: { stats: ExamStatsDTO | null }) => {

    const {
        examLengthSeconds,
        scorePercentageDiffFromAvg,
        scorePercentage,
        examScore,
        examMaxScore
    } = (stats ?? {
        examLengthSeconds: 0,
        scorePercentage: 0,
        scorePercentageDiffFromAvg: 0,
        examScore: 0,
        examMaxScore: 0
    });

    const successRateDiffInText = (() => {

        if (scorePercentageDiffFromAvg > 30)
            return 'Kimagasló';

        if (scorePercentageDiffFromAvg < -30)
            return 'Átlag alatti';

        return 'Átlagos';
    })();

    return <EpistoGrid
        width="100%"
        minColumnWidth={'280px'}
        gap={'10px'}
        auto={'fill'}>

        {/* score percentage */}
        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_good_answer_count.svg')}
            suffix={translatableTexts.exam.examResultStats.correctAnswersRatio.suffix}
            title={translatableTexts.exam.examResultStats.correctAnswersRatio.title}
            value={scorePercentage} />

        {/* score / max score */}
        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_good_answer_percent.svg')}
            suffix={translatableTexts.exam.examResultStats.correctAnswersCount.suffix}
            title={translatableTexts.exam.examResultStats.correctAnswersCount.title}
            value={`${examScore}/${examMaxScore}`} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_time.svg')}
            suffix={translatableTexts.misc.suffixes.second}
            title={translatableTexts.exam.examResultStats.examDoneInMinutes.title}
            value={formatTime(examLengthSeconds)} />

        <StatisticsCard
            height="150px"
            iconPath={Environment.getAssetUrl('/icons/exam_result_top_percent.svg')}
            suffix={translatableTexts.exam.examResultStats.fromAllUsers.suffix}
            title={translatableTexts.exam.examResultStats.fromAllUsers.title}
            value={successRateDiffInText} />
    </EpistoGrid>;
};