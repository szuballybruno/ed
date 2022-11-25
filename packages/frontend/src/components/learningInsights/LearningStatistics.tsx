import { useUserLearningPageStats } from '../../services/api/userStatsApiService';
import { Id } from '@episto/commontypes';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard, { StatisticsCardProps } from '../statisticsCard/StatisticsCard';
import { Responsivity } from '../../helpers/responsivity';

export const getProgressFromLagBehind = (lagBehindPercentage?: number | null) => {

    if (lagBehindPercentage === null || lagBehindPercentage === undefined)
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
    userId: Id<'User'>
}) => {

    const { userId } = props;

    const isLargerThan1400 = Responsivity
        .useIsLargerThan('1400px');

    // http
    const { userLearningPageStats } = useUserLearningPageStats(userId);

    const statsss: StatisticsCardProps[] = [
        {
            title: 'Haladásom',
            iconPath: Environment.getAssetUrl('/images/learningpagestaticon1.png'),
            value: getProgressFromLagBehind(userLearningPageStats?.avgRelativeUserPaceDiff)
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


    return <EpistoGrid
        width="100%"
        minWidth={isLargerThan1400 ? '1060px' : undefined}
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
