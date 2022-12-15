import { UserStatisticsDTO } from '@episto/communication';
import { useMemo } from 'react';
import { coalesce } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../../universal/charts/pie-chart/EpistoPieChart';

export const ActivityChart = ({ data }: { data: UserStatisticsDTO | null }) => {

    const {
        examCompletionPercentage,
        questionAnsweringPercentage,
        videoWatchActivityPercentage
     } = coalesce(data?.activityDistribution ?? null, {
        examCompletionPercentage: 0,
        questionAnsweringPercentage: 0,
        videoWatchActivityPercentage: 0
    });

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const chartSteps = useMemo(() => [
        {
            value: videoWatchActivityPercentage,
            name: texts.activitiesPieChartTexts.watchingVideos
        },
        {
            value: examCompletionPercentage,
            name: texts.activitiesPieChartTexts.doingExamsOrTests
        },
        {
            value: questionAnsweringPercentage,
            name: texts.activitiesPieChartTexts.answeringQuestions
        }
    ], [texts, videoWatchActivityPercentage, examCompletionPercentage, questionAnsweringPercentage]);

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