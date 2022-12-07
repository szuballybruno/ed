import { EpistoLineChartDatasetType } from '@episto/commontypes';
import { UserCourseProgressChartDTO } from '@episto/communication';
import { useMemo } from 'react';
import { EpistoLineChart } from './base_charts/EpistoLineChart';
import { EpistoLineChartOptionsType } from './types/EpistoLineChartTypes';

const useUserProgressChartOptions = (interval: number, maxYValue: number) => useMemo((): EpistoLineChartOptionsType => ({
    legend: {
        orient: 'horizontal',
        icon: 'circle',
        itemHeight: 10,
        top: 10,
        show: true,
        textStyle: {
            fontWeight: 700,
            color: 'black'
        }
    },
    xAxis: {
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
            fontWeight: 600
        },
        boundaryGap: false,
        type: 'category',
        axisLabel: {
            show: true,
            interval: interval,
            showMaxLabel: true,
            rotate: 0,
            margin: 20
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        name: 'Haladás',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
            fontWeight: 600
        },
        type: 'value',
        max: maxYValue
    },
    seriesOptions: {
        type: 'line',
        symbolSize: 10,
        symbol: 'circle',
        lineStyle: {
            width: 4,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 10
        }
    }
}), [interval, maxYValue]);

const useChartDatasets = (userProgress: UserCourseProgressChartDTO) => useMemo((): EpistoLineChartDatasetType => {

    const progressItems = userProgress
        .dates
        .map((x, index) => ({
            date: x,
            actualProgress: (userProgress.actualProgress as any as (number | null)[])[index] ?? null,
            previsionedProgress: (userProgress.previsionedProgress as any as (number | null)[])[index] ?? null
        }));

    const previsionedRangeLength = progressItems.length - progressItems.filter(x => x.actualProgress !== null).length;
    const orderedActualProgresses = progressItems
        .filter(x => x.actualProgress !== null)
        .map(x => x.actualProgress!)
        .orderBy(x => x);

    const actualProgressEndIndex = orderedActualProgresses.length;

    const prevoiusGrowth = orderedActualProgresses.last() - orderedActualProgresses.first();
    const growthStep = prevoiusGrowth / previsionedRangeLength;

    const previsinedGrowthSeries = progressItems
        .map((x, i) => i < actualProgressEndIndex ? x.actualProgress : i * growthStep);

    const actualProgressSeries = progressItems
        .filter(x => x.actualProgress !== null)
        .map(x => x.actualProgress);

    return [
        {
            name: 'Becsült haladás',
            data: previsinedGrowthSeries,
            lineStyle: {
                color: 'lightgreen',
                type: 'dotted'
            }
        },
        {
            name: 'Valós haladás',
            data: actualProgressSeries,
            lineStyle: {
                color: 'green',
                type: 'line'
            }
        },
    ];
}, [userProgress]);

export const UserProgressChart = ({
    userProgress
}: {
    userProgress: UserCourseProgressChartDTO
}) => {


    const interval = useMemo(() => Math.floor(userProgress.previsionedProgress.length / 7), [userProgress.previsionedProgress.length]);
    const datasets = useChartDatasets(userProgress);
    const maxProgressValue = datasets[0].data.last() as any;
    const maxYValue = Math.round(Math.min(100, maxProgressValue * 1.8));
    const options = useUserProgressChartOptions(interval, maxYValue);

    return <EpistoLineChart
        title=''
        options={options}
        xAxisData={userProgress.dates}
        xAxisLabel="Dátum"
        yAxisLabel="Haladás"
        yAxisLabelSuffix='%'
        dataset={datasets}
        style={{
            width: '100%',
            height: '100%'
        }} />;
};