import { EpistoLineChartDatasetType } from '@episto/commontypes';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import { EpistoChartXAxisDataType } from '../EpistoChartCommonTypes';
import { simpleLineChart } from './lineChartVariants';

export const EpistoLineChart = ({
    title,
    dataset: datasets,
    xAxisData,
    xAxisLabel,
    yAxisLabel,
    yAxisLabelSuffix,
    style,
    options
}: {
    title: string,
    dataset: EpistoLineChartDatasetType,
    xAxisData?: EpistoChartXAxisDataType
    xAxisLabel?: string,
    yAxisLabel?: string,
    yAxisLabelSuffix?: string,
    style?: React.CSSProperties,
    options?: EChartsOption
}) => {

    const overwrittenOptions = options
        ? Object.assign(simpleLineChart, options)
        : simpleLineChart;

    const {
        legend,
        tooltip,
        xAxis,
        yAxis,
        seriesOptions
    } = overwrittenOptions;

    const defaultStyle = {
        width: '100%',
        height: '100%',
    };

    return <ReactECharts
        option={{
            title: {
                show: !!title,
                text: title
            },
            legend:
                legend
                    ? Object.assign(
                        {
                            show: true,
                            data: datasets.map((data) => ({
                                name: data.name
                            }))
                        },
                        legend)
                    : undefined,
            tooltip: tooltip,
            xAxis:
                xAxis
                    ? Object.assign(
                        {
                            name: xAxisLabel,
                            data: xAxisData
                        },
                        xAxis)
                    : undefined,
            yAxis:
                yAxisLabel
                    ? Object.assign(
                        {
                            name: yAxisLabel,
                            axisLabel: {
                                formatter: `{value}${yAxisLabelSuffix || ''}`
                            }
                        },
                        yAxis)
                    : undefined,
            series: datasets
                .map((dataset, index) => {
                    return Object.assign(
                        dataset,
                        {
                            color: 'lightgreen',
                            showSymbol: seriesOptions.showSymbol,
                            symbol: seriesOptions.symbol,
                            symbolSize: seriesOptions.symbolSize,
                            lineStyle: {
                                color: dataset.lineStyle?.color ? dataset.lineStyle.color : undefined,
                                type: dataset.lineStyle?.type ? dataset.lineStyle.type : undefined,
                                width: seriesOptions?.lineStyle?.width,
                                shadowColor: seriesOptions?.lineStyle?.shadowColor,
                                shadowOffsetX: seriesOptions?.lineStyle?.shadowOffsetX,
                                shadowOffsetY: seriesOptions?.lineStyle?.shadowOffsetY,
                                shadowBlur: seriesOptions?.lineStyle?.shadowBlur
                            }
                        },
                        {
                            type: 'line'
                        }
                    );
                })
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};