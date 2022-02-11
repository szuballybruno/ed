import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import wrap from 'word-wrap';
import { PersonalityChartDataDTO } from '../../models/shared_models/PersonalityChartDataDTO';
import { translatableTexts } from '../../static/translatableTexts';

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
                    name: translatableTexts.learningOverview.usersAverage,
                    itemStyle: {
                        color: averageGraphColor
                    }
                },
                {
                    name: translatableTexts.learningOverview.yourLearningAnalysis,
                    itemStyle: {
                        color: userGraphColor
                    }
                }
            ],
            orient: "horizontal",
            icon: "circle",
            itemHeight: 10,
            top: 10,
            textStyle: {
                fontWeight: "700",
                color: "black"
            }
        },
        radar: {
            scale: true,
            radius: "60%",
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
                        name: translatableTexts.learningOverview.usersAverage,
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
                        name: translatableTexts.learningOverview.yourLearningAnalysis,
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

    return <ReactECharts
        option={options}
        style={{
            height: "100%",
            minHeight: 350,
            minWidth: 500,
            maxWidth: "100%"
        }} />
}
