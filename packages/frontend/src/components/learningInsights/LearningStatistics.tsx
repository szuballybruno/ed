import { Id } from '@episto/commontypes';
import { useMemo } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { useUserLearningPageStats } from '../../services/api/userStatsApiService';
import { Environment } from '../../static/Environemnt';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../statisticsCard/StatisticsCard';

export type StatisticsGroupType = {
    title: string;
    items: StatisticsCardProps[];
}

export const LearningStatistics = (props: {
    userId: Id<'User'>
}) => {

    const { userId } = props;

    const isLargerThan1400 = Responsivity
        .useIsLargerThan('1400px');

    // http
    const { userLearningPageStats } = useUserLearningPageStats(userId);

    /*  const { userPerformancePercentage, userPerormanceRating } = coalesce(userLearningPageStats, {
         userPerformancePercentage: 0,
         userPerormanceRating: 'average'
     }); */

    //const { color, text } = useUserTempoDisplayValues(userPerormanceRating);

    const statistics = useMemo((): StatisticsCardProps[] => {

        return [
            {
                title: 'Haladásom',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon1.png'),
                value: 'text'
            }, {
                title: 'Ismétlésre ajánlott videók',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon2.png'),
                suffix: 'db',
                value: userLearningPageStats?.videosToBeRepeatedCount
            }, {
                title: 'Ismétlésre ajánlott kérdések',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon3.png'),
                suffix: 'db',
                value: userLearningPageStats?.questionsToBeRepeatedCount
            }, {
                title: 'Megtekintett videók száma',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon4.png'),
                suffix: 'db',
                value: userLearningPageStats?.completedVideoCount + '' || '-'
            }, {
                title: 'Aktívan eltöltött idő',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon5.png'),
                suffix: 'óra',
                value: userLearningPageStats?.totalSessionLengthSeconds
                    ? Math.floor(userLearningPageStats.totalSessionLengthSeconds / 60 / 60)
                    : '-'
            }, {
                title: 'Megválaszolt kérdések száma',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon6.png'),
                suffix: 'db',
                value: userLearningPageStats?.answeredQuestionsCount
            }, {
                title: 'Helyes válaszok aránya',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon7.png'),
                suffix: '%',
                value: userLearningPageStats?.totalCorrectAnswerRate
                    ? Math.floor(userLearningPageStats.totalCorrectAnswerRate)
                    : '-'
            }, {
                title: 'Céges rangsor',
                iconPath: Environment.getAssetUrl('/images/learningpagestaticon8.png'),
                suffix: '%',
                value: userLearningPageStats?.rankInsideCompany
            }
        ];
    }, [userLearningPageStats]);

    return <EpistoGrid
        width="100%"
        minWidth={isLargerThan1400 ? '1060px' : undefined}
        pt='10px'
        minColumnWidth={'250px'}
        gap={'10px'}
        auto={'fill'}>

        {statistics
            .map((stat, index) => {
                return <StatisticsCard
                    height='140px'
                    key={index}
                    {...stat} />;
            })}

    </EpistoGrid>;
};
