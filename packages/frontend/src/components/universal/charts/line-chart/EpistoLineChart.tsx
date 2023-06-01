import ReactECharts from 'echarts-for-react';
import React from 'react';
import { EpistoChartXAxisDataType } from '../EpistoChartCommonTypes';
import { EpistoLineChartDatasetType, EpistoLineChartOptionsType } from './EpistoLineChartTypes';


/**
 * Wrapper component for ECharts
 **
 * All chart options:
 * @see Docs: https://echarts.apache.org/en/option.html#title
 */

export const EpistoLineChart = (props: {
    title: string,
    dataset: EpistoLineChartDatasetType,
    xAxisData?: EpistoChartXAxisDataType
    xAxisLabel?: string,
    yAxisLabel?: string,
    yAxisLabelSuffix?: string,
    style?: React.CSSProperties,
    options: EpistoLineChartOptionsType
}) => {

    const {
        title,
        dataset,
        xAxisData,
        xAxisLabel,
        yAxisLabel,
        yAxisLabelSuffix,
        style,
        options: {
            legend,
            tooltip,
            xAxis,
            yAxis,
            seriesOptions,
            backgroundColor
        }
    } = props;


    const defaultStyle = {
        width: '100%',
        height: '100%'
    };

    return <ReactECharts
        option={{
            color: dataset.map(d => d.lineStyle?.color),
            title: {
                show: !!title,
                text: title
            },
            backgroundColor,
            legend:
                legend
                    ? Object.assign(
                        {
                            show: true,
                            data: dataset.map((data) => ({
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
            series: dataset.map((d, index) => {
                return Object.assign(
                    d,
                    {
                        color: seriesOptions.color,
                        showSymbol: seriesOptions.showSymbol,
                        symbol: seriesOptions.symbol,
                        symbolSize: seriesOptions.symbolSize,
                        smooth: seriesOptions.smooth,
                        lineStyle: {
                            color: d.lineStyle?.color ? d.lineStyle.color : undefined,
                            type: d.lineStyle?.type ? d.lineStyle.type : undefined,
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