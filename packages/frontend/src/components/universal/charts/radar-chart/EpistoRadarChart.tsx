import ReactECharts from 'echarts-for-react';
import { EpistoRadarChartDataType } from './EpistoRadarChartTypes';
import { getRadarOptions } from './radarVariantOptions';

/**
 * Wrapper component for ECharts
 **
 * All chart options:
 * @see Docs: https://echarts.apache.org/en/option.html#title
 */

export const EpistoRadarChart = ({
    title,
    areas,
    style,
    radarIndicators,
}: {
    title: string,
    isSortValues?: boolean,
    areas: EpistoRadarChartDataType,
    style?: React.CSSProperties,
    radarIndicators?: {
        name: string,
        max?: number
    }[]
}) => {

    const {
        visualMap,
        legend,
        tooltip,
        radar,
        seriesOptions
    } = getRadarOptions();

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
            radar:
                radar
                    ? Object.assign(
                        {
                            indicator: radarIndicators
                        },
                        radar
                    )
                    : undefined,
            legend:
                legend
                    ? Object.assign(
                        {
                            show: true,
                            data: areas.map((data) => ({
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
                        data: areas.map((data, index) => ({
                            value: data.value,
                            name: data.name,
                            lineStyle: {
                                color: seriesOptions.color[index],
                                shadowColor: seriesOptions.color[index]
                            },
                            areaStyle: {
                                color: seriesOptions.color[index]
                            }
                        }))
                    },
                    seriesOptions,
                    {
                        type: 'radar'
                    })
            ]
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />;
};