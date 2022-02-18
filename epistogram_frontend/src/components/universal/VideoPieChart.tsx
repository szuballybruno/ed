import { Flex } from '@chakra-ui/react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from "react";
import wrap from 'word-wrap';
import { PersonalityChartDataDTO } from '../../shared/dtos/PersonalityChartDataDTO';
import { translatableTexts } from '../../static/translatableTexts';

export const VideoPieChart = () => {

    const averageGraphColor = "#ffa565";
    const userGraphColor = "#97deef";
    const gridColor = "#969fb7";
    const shadowColor = "rgba(0, 0, 0, .4)";

    const options = {
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
                name: 'Access From',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: 'Végignézi a videót' },
                    { value: 310, name: '75%-ig nézi meg a videót' },
                    { value: 274, name: '50%-ig nézi meg a videót' },
                    { value: 235, name: '25%-ig nézi meg a videót' },
                    { value: 400, name: '10%-ig nézi meg a videót' }
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(0,0,0, 0.6)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]

    } as EChartsOption;

    return <ReactECharts
        option={options}
        style={{
            minWidth: 500,
            maxWidth: "100%"
        }} />
}