import ReactECharts, { EChartsOption } from "echarts-for-react";
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
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: "70%",
                center: ["50%", "50%"],
                color: ["#FB4D3D", "#03CEA4", "#345995", "#EAC435"],
                data: [
                    { value: 30, name: "Videók megtekintése", itemStyle: { color: "#FB4D3D" } },
                    { value: 17, name: "Vizsga / tesztkitöltés", itemStyle: { color: "#03CEA4" } },
                    { value: 10, name: "Kérdések megválaszolása", itemStyle: { color: "#345995" } },
                    { value: 20, name: "Nincs tevékenység", itemStyle: { color: "#EAC435" } }
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: "radius",
                label: {
                    color: "rgba(0,0,0, 0.6)"
                },
                labelLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.3)"
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {/* 
                    color: ['#c23531', "#c23531", "#c23531"], */
                    shadowBlur: 200,
                    shadowColor: "rgba(0, 0, 0, 0.4)"
                },
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]

    } as EChartsOption;

    return <ReactECharts
        option={options}
        style={{
            width: "100%",
            height: "100%"
        }} />;
};