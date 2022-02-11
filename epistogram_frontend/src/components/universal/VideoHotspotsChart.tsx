import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import wrap from 'word-wrap';
import { PersonalityChartDataDTO } from '../../models/shared_models/PersonalityChartDataDTO';
import { translatableTexts } from '../../static/translatableTexts';

export const VideoHotspotsChart = () => {

    const averageGraphColor = "#ffa565";
    const userGraphColor = "#97deef";
    const gridColor = "#969fb7";
    const shadowColor = "rgba(0, 0, 0, .4)";

    const options = {
        dataset: [
            {
                id: 'dataset_raw',
                source: [
                    ["Felhasználók száma", "Időpont"],
                    [70, 12],
                    [68, 13],
                    [50, 14],
                    [30, 15]
                ]
            }
        ],
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                return "Időpont: " + new Date(params[0].axisValue * 1000).toISOString().substr(14, 5) + " <br />Felhasználók akik ezen a ponton elhagyták a videót: " + params[0].data[0]
            }

        },
        xAxis: {
            name: 'Időpont',
            type: "time",
            axisLabel: {
                formatter: (params) => {
                    return new Date(params * 1000).toISOString().substr(14, 5)
                }
            }

        },
        yAxis: {
            name: 'Felhasználók'
        },
        series: [
            {
                type: 'line',
                datasetId: 'dataset_raw',
                showSymbol: false,
                encode: {
                    x: 'Időpont',
                    y: 'Felhasználók száma',
                    itemName: 'Felhasználók száma',
                    tooltip: ['Időpont']
                }
            }

        ]

    } as EChartsOption;

    return <ReactECharts
        option={options}
        style={{
            height: "350px",
            minHeight: 350,
            minWidth: 500,
            maxWidth: "100%"
        }} />
}