import { EpistoRadarChartOptionsType } from './EpistoRadarChartTypes';

const averageGraphColor = '#00594F';
const userGraphColor = '#CEDC00';
const gridColor = '#969fb7';
const shadowColor = 'rgba(0, 0, 0, .4)';

export const getRadarOptions = (): EpistoRadarChartOptionsType => ({
    textStyle: {
        color: 'black',
        fontWeight: 400
    },
    legend: {
        orient: 'horizontal',
        icon: 'circle',
        itemHeight: 10,
        top: 10,
        textStyle: {
            fontWeight: 700,
            color: 'black'
        }
    },
    radar: {
        scale: true,
        radius: '60%',
        splitNumber: 7,
        splitLine: {
            lineStyle: {
                color: gridColor
            }
        },
        splitArea: false,
        axisLabel: {
            overflow: 'break'
        },
        axisLine: {
            lineStyle: {
                color: gridColor
            }
        }
    },
    seriesOptions: {
        type: 'radar',
        symbolSize: 0,
        lineStyle: {
            width: 3,
            shadowOffsetY: 2,
            shadowOffsetX: 2
        },
        areaStyle: {
            opacity: 0.8,
            shadowBlur: 12,
            shadowOffsetY: 10,
            shadowOffsetX: 4,
            shadowColor: shadowColor
        },
        color: [averageGraphColor, userGraphColor],
    }
});