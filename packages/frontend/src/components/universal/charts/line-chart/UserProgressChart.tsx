import { instantiate } from '@episto/commonlogic';
import { UserProgressChartStep } from '@episto/communication';
import { EChartsOption } from 'echarts';
import { useMemo } from 'react';
import { Formatters } from '../../../../static/frontendHelpers';
import { EpistoLineChart } from './EpistoLineChart';

const useUserProgressChartOptions = (
    interval: number,
    userProgress: UserProgressChartStep[]) => useMemo(() => {

        const recommendedProgressArray = userProgress
            .map(x => x.recommendedCompletedPercentage);

        const dates = userProgress
            .map(x => Formatters
                .toDateStringFormatted(x.date));

        const maxProgressValue = recommendedProgressArray.last();
        const maxYValue = Math.round(Math.min(100, maxProgressValue * 1.8));

        return instantiate<EChartsOption>({
            color: ['orange', 'limegreen', 'green'],
            legend: {
                data: ['Ajánlott haladás', 'Becsült haladás', 'Valós haladás']
            },
            xAxis: {
                data: dates,
                name: 'Dátum',
                axisLabel: {
                    interval: interval,
                },
            },
            yAxis: {
                name: 'Haladás',
                max: maxYValue,
                axisLabel: {
                    formatter: '{value}%'
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: ([
                    recommendedCompletedPercentage,
                    previsionedCompletedPercentage,
                    actualCompletedPercentage
                ]: any) => {

                    return `
                ${recommendedCompletedPercentage.axisValue} <br />
                Ajánlott haladás: ${Math.round(recommendedCompletedPercentage.data * 10) / 10}% <br />
                Becsült haladás: ${Math.round(previsionedCompletedPercentage.data * 10) / 10}% <br />
                Valós haladás: ${actualCompletedPercentage.data 
                    ? `${Math.round(actualCompletedPercentage.data * 10) / 10}%` 
                    : '-'}
            `;
                }
            },
            series: [
                {
                    name: 'Ajánlott haladás',
                    type: 'line',
                    data: recommendedProgressArray,
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        type: 'dotted',
                        width: 4
                    }
                },
                {
                    name: 'Becsült haladás',
                    type: 'line',
                    data: userProgress.map(x => x.previsionedCompletedPercentage),
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        type: 'dotted',
                        width: 4
                    }
                },
                {
                    name: 'Valós haladás',
                    type: 'line',
                    data: userProgress.map(x => x.actualCompletedPercentage as any),
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        width: 4
                    }
                }
            ]
        });
    }, [interval, userProgress]);

export const UserProgressChart = ({
    userProgress
}: {
    userProgress: UserProgressChartStep[]
}) => {

    const interval = useMemo(() => Math.floor(userProgress.length / 7), [userProgress]);
    const options = useUserProgressChartOptions(interval, userProgress);

    return <EpistoLineChart
        options={options} />;
};