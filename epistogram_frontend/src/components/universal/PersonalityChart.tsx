import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import wrap from 'word-wrap';
import { PersonalityChartDataDTO } from '../../models/shared_models/PersonalityChartDataDTO';

export const PersonalityChart = (props: {
    data: PersonalityChartDataDTO
}) => {

    const personalityData = props.data;

    const traitNames = personalityData
        .traits
        .map(x => wrap(x.traitName, { width: 20 }));

    const traitValues = personalityData
        .traits
        .map(x => x.traitScore);

    const averageGraphColor = "#ffa565";
    const userGraphColor = "#97deef";
    const gridColor = "#969fb7";
    const shadowColor = "rgba(0, 0, 0, .4)";

    const options = {
        textStyle: {
            fontWeight: "400",
            color: "black"
        },
        legend: {
            data: [
                {
                    name: "A felhasználók átlaga",
                    itemStyle: {
                        color: averageGraphColor
                    }
                },
                {
                    name: "A te tanulási analízised",
                    itemStyle: {
                        color: userGraphColor
                    }
                }
            ],
            orient: "vertical",
            icon: "circle",
            bottom: 0,

            left: 0,
            textStyle: {
                fontWeight: "700",
                color: "black"
            }
        },
        radar: {
            splitNumber: 7,
            splitLine: {
                lineStyle: {
                    color: gridColor
                }
            },
            center: ["50%", "50%"],
            splitArea: false,
            indicator: traitNames
                .map(traitName => ({
                    name: traitName,
                    max: 7
                })),
            axisLine: {
                lineStyle: {
                    color: gridColor
                }
            }
        },
        series: [
            {
                type: "radar",
                symbolSize: 0,

                data: [
                    {
                        value: [3, 4, 5, 7, 4, 2, 4, 5, 4, 4],
                        name: "A felhasználók átlaga",
                        lineStyle: {
                            width: 3,
                            color: averageGraphColor,
                            shadowColor: averageGraphColor,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: averageGraphColor,
                            shadowColor: shadowColor,
                            shadowBlur: 12,
                            shadowOffsetY: 10,
                            shadowOffsetX: 4
                        }
                    },
                    {
                        value: traitValues,
                        name: "A te tanulási analízised",
                        lineStyle: {
                            width: 3,
                            color: userGraphColor,
                            shadowColor: userGraphColor,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: userGraphColor,
                            shadowColor: shadowColor,
                            shadowBlur: 12,
                            shadowOffsetY: 10,
                            shadowOffsetX: 4
                        }
                    }
                ]
            }
        ]
    } as EChartsOption;

    return (
        <ReactECharts
            option={options}
            style={{
                height: "100%",
                width: "100%"
            }} />
    );
}
