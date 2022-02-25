import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';

const addDays = (inputDate: Date, days: number) => {

    var date = new Date(inputDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const UserProgressChart = (props: {
    userProgress: UserCourseProgressChartDTO
}) => {

    const { userProgress } = props;

    let dates = [] as string[];

    for (let index = 0; index <= userProgress.estimatedLengthInDays; index++) {

        const date = addDays(userProgress.startDate, index);
        dates.push(date.toLocaleDateString());
    }

    const actualProgress = userProgress
        .days
        .map(x => x.completedPercentageSum);

    const option = {
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                show: true,
                interval: 0,
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