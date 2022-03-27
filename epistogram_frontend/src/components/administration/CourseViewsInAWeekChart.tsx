import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { iterate } from '../../static/frontendHelpers';

export const CourseViewsInAWeekChart = (props: {
    title: string
}) => {

    const dates = [
        "03. 21.",
        "03. 22.",
        "03. 23.",
        "03. 24.",
        "03. 25.",
        "03. 26.",
        "03. 27.",
        "03. 28.",
    ]

    const option = {
        title: {
            show: true,
            text: props.title
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
                formatter: '{value}'
            }
        },
        series: [
            {
                name: "Jelenlegi hét",
                data: [[0, 90], [1, 80], [2, 65], [3, 60], [4, 55], [5, 40], [6, 30], [7, 15]],
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