import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { iterate } from '../../static/frontendHelpers';

const addDays = (inputDate: Date, days: number) => {

    var date = new Date(inputDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const UserProgressChart = (props: {
    userProgress: UserCourseProgressChartDTO
}) => {

    const { userProgress } = props;

    const courseLengthDays = userProgress.estimatedLengthInDays + 1;

    const dates = iterate(courseLengthDays, index => {

        const date = addDays(userProgress.startDate, index);
        return date.toLocaleDateString();
    });

    const actualProgress = userProgress
        .days
        .map(x => x.completedPercentageSum);

    const interval = Math.floor(dates.length / 20);

    console.log(interval);

    const option = {
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                show: true,
                interval: interval,
                rotate: 70,
            },
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: dates
                    .map((_, index) => (100 / dates.length) * (index + 1)),
                type: 'line'
            },
            {
                data: actualProgress,
                type: 'line'
            }
        ]
    } as EChartsOption;

    return (
        <Flex>
            <ReactECharts
                className="whall"
                option={option}></ReactECharts>
        </Flex>
    )
}