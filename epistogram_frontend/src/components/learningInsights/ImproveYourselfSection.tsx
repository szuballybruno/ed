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

export const ImproveYourselfSection = () => {

    const { dailyTipData } = useDailyTip();
    const { improveYourselfPageStats } = useImproveYourselfPageStats();

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
                    chartSize='normal'>

                    {improveYourselfPageStats?.mostProductiveTimeRangeChartData
                        ? <EpistoBarChart
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
                                data: improveYourselfPageStats?.mostProductiveTimeRangeChartData!
                            }]}
                            options={defaultCharts.blueGreenBarChart2} />
                        : <Flex
                            align='center'
                            justify='center'>

                            <EpistoFont>
                                {'A diagram betöltése sikertelen'}
                            </EpistoFont>
                        </Flex>}


                </StatisticsCard>

                <StatisticsCard
                    title='Legaktívabb napod'
                    value={improveYourselfPageStats?.mostActiveDay
                        ? weekdayLabels[improveYourselfPageStats?.mostActiveDay]
                        : null} >

                    {improveYourselfPageStats?.mostActiveDayChartData
                        ? <EpistoBarChart
                            title="Napok közötti aktivitás"
                            dataset={[
                                {
                                    name: 'A hét napjai',
                                    data: improveYourselfPageStats?.mostActiveDayChartData!,
                                }
                            ]}
                            xAxisData={weekdayLabels}
                            xAxisLabel="A hét napjai"
                            yAxisLabel="Belépések időtartama"
                            yAxisLabelSuffix=" perc"
                            options={defaultCharts.blueGreenBarChart} />
                        : <Flex
                            align='center'
                            justify='center'>

                            <EpistoFont>
                                {'A diagram betöltése sikertelen'}
                            </EpistoFont>
                        </Flex>}
                </StatisticsCard>
            </EpistoGrid>
        </Flex>
    </Flex>;
}; 