import ReactECharts from "echarts-for-react";
import React from "react";
import { EpistoBarChartDatasetType, EpistoBarChartOptionsType } from "./types/EpistoBarChartTypes";
import { EpistoChartXAxisDataType } from "./types/EpistoChartCommonTypes";
import { EpistoLineChartDatasetType, EpistoLineChartOptionsType } from "./types/EpistoLineChartTypes";

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
            seriesOptions
        }
    } = props;


    const defaultStyle = {
        width: "100%",
        height: "100%",
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
                                formatter: `{value}${yAxisLabelSuffix || ""}`
                            }
                        },
                        yAxis)
                    : undefined,
            series: dataset.map((d, index) => {
                return Object.assign(
                    d,
                    seriesOptions,
                    {
                        type: "line"
                    }
                );
            })
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};