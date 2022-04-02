import ReactECharts from 'echarts-for-react';
import { EpistoRadarChartDataType, EpistoRadarChartOptionsType } from './types/EpistoRadarChartTypes';

export const EpistoRadarChart = (props: {
    title: string,
    isSortValues?: boolean,
    areas: EpistoRadarChartDataType,
    style?: React.CSSProperties,
    radarIndicators?: {
        name: string,
        max?: number
    }[]
    options: EpistoRadarChartOptionsType
}) => {


    const {
        title,
        areas,
        style,
        radarIndicators,
        options: {
            visualMap,
            legend,
            tooltip,
            radar,
            seriesOptions
        }
    } = props;


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