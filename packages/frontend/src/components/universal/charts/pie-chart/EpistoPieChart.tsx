import ReactECharts from 'echarts-for-react';
import { getPieDefaultOptions, pieChartVariantOptions } from './pieChartVariants';
import { EpistoPieChartDataType } from './EpistoPieChartTypes';
import { EChartsOption, SeriesOption } from 'echarts';
import { useMemo } from 'react';
import { deepMergeObjects } from '@thinkhub/x-core';

/**
 * Wrapper component for ECharts
 **
 * All chart options:
 * @see Docs: https://echarts.apache.org/en/option.html#title
 */

const useOldOptions = (
    title: string,
    segments: EpistoPieChartDataType,
    optionsBase: EChartsOption,
    isSortValues?: boolean,): any => {

    const {
        visualMap,
        legend,
        tooltip,
        seriesOptions
    } = optionsBase as any;

    return {
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
    };
};

export const EpistoPieChart = ({
    title,
    isSortValues,
    segments,
    style,
    variant,
    options,
    seriesOptions,
    useNewOptions
}: {
    title: string,
    isSortValues?: boolean,
    segments: EpistoPieChartDataType,
    style?: React.CSSProperties,
    variant: keyof typeof pieChartVariantOptions,
    options?: EChartsOption,
    seriesOptions?: SeriesOption,
    useNewOptions?: boolean
}) => {

    const optionsBase = pieChartVariantOptions[variant];

    const oldOptions = useOldOptions(title, segments, optionsBase, isSortValues);

    const defaultStyle = {
        width: '100%',
        height: '100%',
    };

    const finalOptions = useMemo(() => {

        const defaultOptions = getPieDefaultOptions(seriesOptions ?? {});

        return deepMergeObjects(defaultOptions, options ?? {});
    }, [seriesOptions, options]);

    return <ReactECharts
        option={useNewOptions ? finalOptions : oldOptions}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};