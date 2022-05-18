import { UserCourseProgressChartDTO } from '../../../shared/dtos/UserCourseProgressChartDTO';
import { iterate } from '../../../static/frontendHelpers';
import { EpistoLineChart } from './base_charts/EpistoLineChart';
import { EpistoLineChartDataType } from './types/EpistoLineChartTypes';

export const UserProgressChart = (props: {
    userProgress: UserCourseProgressChartDTO
}) => {

    const { userProgress } = props;

    const courseLengthDays = userProgress.estimatedLengthInDays + 1;

    const dates = iterate(courseLengthDays, index => {

        const date = new Date(userProgress.startDate)
            .addDays(index);

        return date.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit'
        });
    });

    const actualProgress = userProgress
        .days
        .map(x => x.completedPercentageSum);

    const interval = Math.floor(dates.length / 7);

    const userProgressChartOptions = {
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
            type: 'value'
        },
        seriesOptions: {
            type: 'line',
            symbolSize: 10,
            symbol: 'circle',
            lineStyle: {
                width: 5,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 10
            }
        }

    };

    return <EpistoLineChart
        title=''
        options={userProgressChartOptions}
        xAxisData={dates}
        xAxisLabel="Dátum"
        yAxisLabel="Haladás"
        yAxisLabelSuffix='%'
        dataset={[
            {
                name: 'Becsült haladás',
                data: dates.map((_, index) => (100 / dates.length) * (index + 1)) as EpistoLineChartDataType
            }, {
                name: 'Valós haladás',
                data: actualProgress
            }
        ]}
        style={{
            width: '100%',
            height: '100%'
        }} />;
};