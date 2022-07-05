import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDailyTip } from '../../services/api/dailyTipApiService';
import { useImproveYourselfPageStats } from '../../services/api/userStatsApiService';
import { defaultCharts } from '../../static/defaultChartOptions';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../universal/charts/base_charts/EpistoBarChart';

const weekdayLabels = Object.values(translatableTexts.misc.daysOfWeekFromMonday);

export const ImproveYourselfSection = (props: {
    userId: number
}) => {

    const { userId } = props;

    const { dailyTipData } = useDailyTip();
    const { improveYourselfPageStats } = useImproveYourselfPageStats(userId);

    const [asd, setAsd] = useState<number[][]>([[0, 0]]);

    useEffect(() => {

        if (!improveYourselfPageStats?.mostProductiveTimeRangeChartData)
            return;

        setAsd(improveYourselfPageStats?.mostProductiveTimeRangeChartData);

        console.log(asd);
    }, [improveYourselfPageStats]);

    return <Flex
        minH='300px'>

        <Flex
            flex='1'
            p='20px'
            align='center'>

            <EpistoFont>
                {dailyTipData?.description
                    ? dailyTipData.description
                    : 'A napi tipped megtekintéséhez ki kell töltened a tanulási stílust felmérő kérdőívet.'}
            </EpistoFont>
        </Flex>

        <Flex
            flex='1'
            p='20px'>

            <EpistoGrid
                className='whall'
                auto='fill'
                gap={'10px'}
                minColumnWidth='250px'
                gridAutoRows={'250px'} >

                <StatisticsCard
                    title='Leghatékonyabb idősávod'
                    value={improveYourselfPageStats?.mostProductiveTimeRange}
                    isOpenByDefault
                    chartSize='normal'>

                    <EpistoBarChart
                        title="Leghatékonyabb idősávod"
                        xAxisData={[
                            '0:00 - 3:00',
                            '3:00 - 6:00',
                            '6:00 - 9:00',
                            '9:00 - 12:00',
                            '12:00 - 15:00',
                            '15:00 - 18:00',
                            '18:00 - 21:00',
                            '21:00 - 0:00'
                        ]}
                        xAxisLabel="Idősávok"
                        yAxisLabel="Teljesítmény"
                        yAxisLabelSuffix="%"
                        dataset={[{
                            name: 'Jelenlegi hét',
                            data: asd
                        }]}
                        options={defaultCharts.blueGreenBarChart} />


                </StatisticsCard>

                <StatisticsCard
                    title='Legaktívabb napod'
                    value={improveYourselfPageStats?.mostActiveDay} >

                    <EpistoBarChart
                        title="Napok közötti aktivitás"
                        dataset={[
                            {
                                name: 'Jelenlegi hét',
                                data: [[0, 6], [1, 7], [2, 10], [3, 9], [4, 6], [5, 4], [6, 3]],
                            },
                            {
                                name: 'Előző hét',
                                data: [[0, 4], [1, 9], [2, 8], [3, 11], [4, 10], [5, 2], [6, 5]],
                            }
                        ]}
                        xAxisData={weekdayLabels}
                        xAxisLabel="A hét napjai"
                        yAxisLabel="Belépések időtartama"
                        yAxisLabelSuffix="perc"
                        options={defaultCharts.blueGreenBarChart} />
                </StatisticsCard>
            </EpistoGrid>
        </Flex>
    </Flex>;
}; 