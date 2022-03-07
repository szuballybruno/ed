import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { m } from 'framer-motion';
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
        legend: {
            data: [
                {
                    name: "Valós haladás",
                },
                {
                    name: "Becsült haladás",
                }
            ],
            orient: "horizontal",
            icon: "circle",
            itemHeight: 10,
            top: 10,
            show: true,
            textStyle: {
                fontWeight: "700",
                color: "black"
            }
        },
        xAxis: {
            name: "Dátum",
            nameLocation: "middle",
            nameGap: 40,
            nameTextStyle: {
                fontWeight: "bold"
            },
            boundaryGap: false,
            type: 'category',
            data: dates,
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
            name: "Haladás",
            nameLocation: "middle",
            nameGap: 40,
            nameTextStyle: {
                fontWeight: "bold"
            },
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: "Becsült haladás",
                data: dates
                    .map((_, index) => (100 / dates.length) * (index + 1)),
                type: 'line',
                symbolSize: 10,
                symbol: "circle",
                lineStyle: {
                    width: 5,
                    shadowColor: "rgba(0, 0, 0, 0.3)",
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                }
            },
            {
                name: "Valós haladás",
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