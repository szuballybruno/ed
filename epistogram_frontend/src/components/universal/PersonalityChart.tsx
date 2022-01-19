import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import wrap from 'word-wrap';
import { PersonalityDataDTO } from "../../models/shared_models/PersonalityDataDTO";

export const PersonalityChart = (props: { data: PersonalityDataDTO }) => {

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
            top: 0,
            orient: "horizontal",
            icon: "circle",
            itemHeight: 30,
            textStyle: {
                fontWeight: "700",
                color: "black"
            }
        },
        radar: {
            scale: true,
            radius: "50%",
            splitNumber: 7,
            splitLine: {
                lineStyle: {
                    color: gridColor
                }
            },
            splitArea: false,
            axisLabel: {
                overflow: "break"
            },
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
                minHeight: 350,
                minWidth: 500,
                maxWidth: "100%"
            }} />
    );
}
