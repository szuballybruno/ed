import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { iterate } from '../../static/frontendHelpers';

export const MostActiveDaysChart = (props: {
}) => {

    const dates = [
        "Hétfő",
        "Kedd",
        "Szerda",
        "Csütörtök",
        "Péntek",
        "Szombat",
        "Vasárnap"
    ]

    const option = {
        title: {
            show: true,
            text: "Legaktívabb napok"
        },
        legend: {
            data: [
                {
                    name: "Jelenlegi hét",
                },
                {
                    name: "Előző hét",
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
                data: [[0, 6], [1, 7], [2, 10], [3, 9], [4, 6], [5, 4], [6, 3]],
                type: 'bar'
            },
            {
                name: "Előző hét",
                data: [[0, 4], [1, 9], [2, 8], [3, 11], [4, 10], [5, 2], [6, 5]],
                type: 'bar',
                lineStyle: {
                    width: 5,
                    shadowColor: "rgba(0, 0, 0, 0.3)",
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                }
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