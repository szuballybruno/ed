import { useMediaQuery } from '@chakra-ui/react';
import { useUserLearningPageStats } from '../../services/api/userStatsApiService';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../statisticsCard/StatisticsCard';

export const getProgressFromLagBehind = (lagBehindPercentage?: number | null) => {
    if (!lagBehindPercentage)
        return '-';

    if (lagBehindPercentage > 30)
        return 'Elmarad';

    if (lagBehindPercentage > 15)
        return 'Megfelelő';

    return 'Tökéletes';
};

export type StatisticsGroupType = {
    title: string;
    items: StatisticsCardProps[];
}

const weekdayLabels = Object.values(translatableTexts.misc.daysOfWeekFromMonday);

export const LearningStatistics = (props: {
    userId: number
}) => {

    const { userId } = props;
    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    // http
    const { userLearningPageStats } = useUserLearningPageStats(userId);

    const statsss: StatisticsCardProps[] = [
        {
            title: 'Haladásom',
            value: getProgressFromLagBehind(userLearningPageStats?.totalLagBehindPercentage)
        }, {
            title: 'Ismétlésre ajánlott videók',
            suffix: 'db',
            value: userLearningPageStats?.videosToBeRepeatedCount
        }, {
            title: 'Ismétlésre ajánlott kérdések',
            suffix: 'db',
            value: userLearningPageStats?.questionsToBeRepeatedCount
        }, {
            title: 'Megtekintett videók száma',
            suffix: 'db',
            value: userLearningPageStats?.completedVideoCount + '' || '-'
        }, {
            title: 'Aktívan eltöltött idő',
            suffix: 'óra',
            value: userLearningPageStats?.totalSessionLengthSeconds
                ? Math.floor(userLearningPageStats.totalSessionLengthSeconds / 60 / 60)
                : '-'
        }, {
            title: 'Megválaszolt kérdések száma',
            suffix: 'db',
            value: userLearningPageStats?.answeredQuestionsCount
        }, {
            title: 'Helyes válaszok aránya',
            suffix: '%',
            value: userLearningPageStats?.totalCorrectAnswerRate
        }, {
            title: 'Céges rangsor',
            suffix: '%',
            value: userLearningPageStats?.rankInsideCompany
        }
    ];


    return <EpistoGrid
        width="100%"
        minWidth={isSmallerThan1400 ? '1060px' : undefined}
        pt='10px'
        minColumnWidth={'250px'}
        gap={'10px'}
        auto={'fill'}>

        {statsss.map((stat, index) => {
            return <StatisticsCard
                h='140px'
                key={index}
                {...stat} />;
        })}

    </EpistoGrid>;
};
