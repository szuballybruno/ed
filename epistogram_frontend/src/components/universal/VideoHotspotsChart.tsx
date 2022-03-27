import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import { iterate } from '../../static/frontendHelpers';

export const VideoHotspotsChart = () => {

    const options = {
        dataset: [
            {
                id: 'dataset_raw',
                source: [
                    ["Felhasználók száma", "Időpont"],
                    ...iterate(300, (index) => {
                        return [Math.pow(index, 2 + Math.random()) / 1000000, (300 - index)]
                    })
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