import { EpistoLineChartDatasetType } from '@episto/commontypes';
import { UserProgressChartStep } from '@episto/communication';
import { useMemo } from 'react';
import { Formatters } from '../../../../static/frontendHelpers';
import { EpistoLineChart } from './EpistoLineChart';
import { EpistoLineChartOptionsType, SeriesProps } from './EpistoLineChartTypes';

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
    tooltip: {
        trigger: 'axis',
        formatter: ([
            recommendedCompletedPercentage,
            previsionedCompletedPercentage,
            actualCompletedPercentage
        ]: SeriesProps[]) => {

            return `
                ${recommendedCompletedPercentage.axisValue} <br />
                Ajánlott haladás: ${Math.round(recommendedCompletedPercentage.data * 10) / 10}% <br />
                Becsült haladás: ${Math.round(previsionedCompletedPercentage.data * 10) / 10}% <br />
                Valós haladás: ${actualCompletedPercentage.data ?? '-'}
            `;
            // return 'Időpont: ' + new Date(params[0].axisValue * 1000)
            //     .toISOString()
            //     .substr(14, 5) + ' <br />Felhasználók akik ezen a ponton elhagyták a videót: ' + params[0].data[0];
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

const useChartDatasets = (userProgress: UserProgressChartStep[]) => useMemo((): EpistoLineChartDatasetType => {

    return [
        {
            name: 'Ajánlott haladás',
            data: userProgress.map(x => x.recommendedCompletedPercentage),
            lineStyle: {
                color: 'orange',
                type: 'dotted'
            }
        },
        {
            name: 'Becsült haladás',
            data: userProgress.map(x => x.previsionedCompletedPercentage),
            lineStyle: {
                color: 'lightgreen',
                type: 'dotted'
            }
        },
        {
            name: 'Valós haladás',
            data: userProgress.map(x => x.actualCompletedPercentage),
            lineStyle: {
                color: 'green',
                type: 'line'
            }
        }
    ];
}, [userProgress]);

export const UserProgressChart = ({
    userProgress
}: {
    userProgress: UserProgressChartStep[]
}) => {

    const interval = useMemo(() => Math.floor(userProgress.length / 7), [userProgress]);
    const datasets = useChartDatasets(userProgress);
    const maxProgressValue = datasets[0].data.last() as any;
    const maxYValue = Math.round(Math.min(100, maxProgressValue * 1.8));
    const options = useUserProgressChartOptions(interval, maxYValue);

    return <EpistoLineChart
        title=''
        options={options}
        xAxisData={userProgress
            .map(x => Formatters
                .toDateStringFormatted(x.date))}
        xAxisLabel="Dátum"
        yAxisLabel="Haladás"
        yAxisLabelSuffix='%'
        dataset={datasets}
        style={{
            width: '100%',
            height: '100%'
        }} />;
};