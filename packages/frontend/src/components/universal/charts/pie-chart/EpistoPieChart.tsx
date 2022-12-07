import ReactECharts from 'echarts-for-react';
import { pieChartVariantOptions } from './pieChartVariants';
import { EpistoPieChartDataType } from './EpistoPieChartTypes';

/**
 * Wrapper component for ECharts
 **
 * All chart options:
 * @see Docs: https://echarts.apache.org/en/option.html#title
 */

export const EpistoPieChart = ({
    title,
    isSortValues,
    segments,
    style,
    variant
}: {
    title: string,
    isSortValues?: boolean,
    segments: EpistoPieChartDataType,
    style?: React.CSSProperties,
    variant: keyof typeof pieChartVariantOptions
}) => {

    const optionsBase = pieChartVariantOptions[variant];

    const {
        visualMap,
        legend,
        tooltip,
        seriesOptions
    } = optionsBase;

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
                            data: segments.map((data) => ({
                                name: data.name
                            }))
                        },
                        legend)
                    : undefined,
            tooltip: tooltip,
            visualMap: visualMap,
            series: [
                Object.assign(
                    {
                        data: !isSortValues
                            ? segments.map((d, index) => {
                                return seriesOptions.color
                                    ? Object.assign(
                                        d,
                                        {
                                            itemStyle: {
                                                color: seriesOptions.color[index]
                                            },
                                            color: seriesOptions.color ? seriesOptions.color[index] : undefined
                                        })
                                    : d;
                            })
                            : segments.map((d, index) => {
                                return seriesOptions.color
                                    ? Object.assign(
                                        d,
                                        {
                                            itemStyle: {
                                                color: seriesOptions.color[index]
                                            },
                                            color: seriesOptions.color ? seriesOptions.color[index] : undefined
                                        })
                                    : d;
                            })
                                .sort((a, b) => {
                                    return a.value - b.value;
                                })
                    },
                    seriesOptions,
                    {
                        type: 'pie'
                    })
            ]
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};