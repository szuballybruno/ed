import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";

export const UserProgressDonutChart = (props: {
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
        /* legend: {
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
                    borderRadius: 7,
                    //borderColor: '#fff',
                    //borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'center'
                },
                emphasis: {

                    label: {
                        formatter: "{b}",
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                color: ["#933E55", "grey"],
                data: [
                    { value: 20, name: "" },
                    { value: 80, name: 'Haladás 20%' },
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