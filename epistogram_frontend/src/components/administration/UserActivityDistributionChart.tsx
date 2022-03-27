import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";

export const UserActivityDistributionChart = (props: {
    title?: string
}) => {


    /* const averageGraphColor = "#ffa565";
    const userGraphColor = "#97deef";
    const gridColor = "#969fb7";
    const shadowColor = "rgba(0, 0, 0, .4)"; */

    const options = {
        title: {
            text: props.title
        },
        /*  legend: {
             top: '7%',
             left: 'center'
         }, */
        /* tooltip: {
            trigger: 'item'
        }, */
        series: [
            {
                name: 'Kurzus neve',
                type: 'pie',
                radius: ['60%', '80%'],
                top: 20,
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                color: ["#FAF33E", "#55505C", "#5D737E", "#7FC6A4", "#D6F8D6"],
                data: [
                    { value: 30, name: "Aktivitás eloszlása" },
                    { value: 25 },
                    { value: 15 },
                    { value: 13 },
                    { value: 17 }
                ]
            }
        ]

    } as EChartsOption;

    return <ReactECharts
        option={options}
        style={{
            width: "100%",
            height: "100%"
        }} />
}