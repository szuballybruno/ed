import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { iterate } from '../../static/frontendHelpers';

export const UserMostActiveTimeRangeChart = (props: {
}) => {

    const dates = [
        "6:00",
        "9:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
    ]

    const option = {
        title: {
            show: true,
            text: "Legaktívabb idősávok"
        },
        /* legend: {
            data: [
                {
                    name: "Jelenlegi hét",
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
        }, */
        xAxis: {
            name: "A hét napjai",
            nameLocation: "middle",
            nameGap: 40,
            nameTextStyle: {
                fontWeight: "bold"
            },
            boundaryGap: true,
            type: 'category',
            data: dates,
            axisLabel: {
                show: true,
                rotate: 0,
                margin: 20
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: "Belépések száma",
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
                name: "Jelenlegi hét",
                data: [[0, 6], [1, 9], [2, 10], [3, 9], [4, 3], [5, 4]],
                type: 'bar'
            }
        ]
    } as EChartsOption;

    return <ReactECharts
        style={{
            width: "100%",
            height: 380
        }}
        option={option}>

    </ReactECharts>

}