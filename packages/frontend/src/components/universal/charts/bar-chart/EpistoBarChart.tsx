import ReactECharts from 'echarts-for-react';
import React from 'react';
import { EpistoBarChartDatasetType } from './EpistoBarChartTypes';
import { EpistoChartXAxisDataType } from '../EpistoChartCommonTypes';
import { barChartVariants } from './barChartVariants';

/**
 * Wrapper component for ECharts
 **
 * All chart options:
 * @see Docs: https://echarts.apache.org/en/option.html#title
 */

export const EpistoBarChart = ({
    title,
    dataset,
    xAxisData,
    xAxisLabel,
    yAxisLabel,
    yAxisLabelSuffix,
    style,
    variant
}: {
    title: string,
    dataset: EpistoBarChartDatasetType,
    xAxisData?: EpistoChartXAxisDataType
    xAxisLabel?: string,
    yAxisLabel?: string,
    yAxisLabelSuffix?: string,
    style?: React.CSSProperties,
    variant: keyof typeof barChartVariants
}) => {

    const {
        seriesOptions,
        legend,
        tooltip,
        xAxis,
        yAxis,
        backgroundColor
    } = barChartVariants[variant];

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
                yAxis
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
                    seriesOptions
                );
            })
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};