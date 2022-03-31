import ReactECharts from 'echarts-for-react';
import { EpistoPieChartDataType, EpistoPieChartOptionsType } from './types/EpistoPieChartTypes';

export const EpistoPieChart = (props: {
    title: string,
    isSortValues?: boolean,
    segments: EpistoPieChartDataType,
    style?: React.CSSProperties,
    options: EpistoPieChartOptionsType
}) => {

    const {
        title,
        isSortValues,
        segments,
        style,
        options: {
            visualMap,
            legend,
            tooltip,
            seriesOptions
        }
    } = props


    const defaultStyle = {
        width: "100%",
        height: "100%",
    }

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
                                            color: seriesOptions.color ? seriesOptions.color[index] : ""
                                        })
                                    : d
                            })
                            : segments.map((d, index) => {
                                return seriesOptions.color
                                    ? Object.assign(
                                        d,
                                        {
                                            color: seriesOptions.color ? seriesOptions.color[index] : ""
                                        })
                                    : d
                            }).sort((a, b) => {
                                return a.value - b.value;
                            })
                    },
                    seriesOptions,
                    {
                        type: "pie"
                    })
            ]
        }}
        style={{
            ...defaultStyle,
            ...style
        }} />
}