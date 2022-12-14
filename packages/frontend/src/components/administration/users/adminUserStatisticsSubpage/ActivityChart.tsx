import { UserLearningOverviewDataDTO } from '@episto/communication';
import { useMemo } from 'react';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../../universal/charts/pie-chart/EpistoPieChart';

export const ActivityChart = ({ data }: { data: UserLearningOverviewDataDTO | null }) => {

    const watchingVideosPercentage = data?.userActivityDistributionData.watchingVideosPercentage || 0;
    const completingExamsPercentage = data?.userActivityDistributionData.completingExamsPercentage || 0;
    const answeringQuestionsPercentage = data?.userActivityDistributionData.answeringQuestionsPercentage || 0;

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const chartSteps = useMemo(() => [
        {
            value: watchingVideosPercentage,
            name: texts.activitiesPieChartTexts.watchingVideos
        },
        {
            value: completingExamsPercentage,
            name: texts.activitiesPieChartTexts.doingExamsOrTests
        },
        {
            value: answeringQuestionsPercentage,
            name: texts.activitiesPieChartTexts.answeringQuestions
        }
    ], [texts, watchingVideosPercentage, completingExamsPercentage, answeringQuestionsPercentage]);

    return (
        <StatisticsCard
            isOpenByDefault
            padding='10px'
            minWidth='250px'
            style={{
                gridColumn: 'auto / span 2',
                gridRow: 'auto / span 2'
            }}>

            <EpistoFlex2
                width='100%'
                height='100%'>

                <EpistoPieChart
                    useNewOptions
                    options={{

                    }}
                    seriesOptions={{
                        data: chartSteps
                    }}
                    title=''
                    isSortValues
                    segments={[]}
                    variant='pie3' />
            </EpistoFlex2>
        </StatisticsCard>
    );
};