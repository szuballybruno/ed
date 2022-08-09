import { UserCourseProgressChartDTO } from '../../../shared/dtos/UserCourseProgressChartDTO';
import { EpistoLineChart } from './base_charts/EpistoLineChart';

export const UserProgressChart = (props: {
    userProgress: UserCourseProgressChartDTO
}) => {

    const { userProgress } = props;

    const interval = Math.floor(userProgress.previsionedProgress.length / 7);

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
        xAxisData={userProgress.dates}
        xAxisLabel="Dátum"
        yAxisLabel="Haladás"
        yAxisLabelSuffix='%'
        dataset={[
            {
                name: 'Eredetileg becsült haladás',
                data: userProgress.originalPrevisionedProgress
            },
            {

                name: 'Becsült haladás',
                data: userProgress.previsionedProgress
            },
            {
                name: 'Valós haladás',
                data: userProgress.actualProgress
            }
        ]}
        style={{
            width: '100%',
            height: '100%'
        }} />;
};