import { EpistoBarChartOptionsType } from './EpistoBarChartTypes';

export const barChartVariants: { [K: string]: EpistoBarChartOptionsType } = {

    /* Stacked bar chart */
    blueGreenBarChart: {
        backgroundColor: 'transparent',
        legend: {
            orient: 'horizontal',
            icon: 'circle',
            itemHeight: 10,
            top: 30,
            textStyle: {
                fontWeight: 700,
                color: 'black'
            }
        },
        xAxis: {
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: {
                fontWeight: 600
            },
            boundaryGap: true,
            type: 'category',
            axisLabel: {
                show: true,
                rotate: 0,
                margin: 20
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontWeight: 600
            },
            type: 'value',
        },
        seriesOptions: {
            type: 'bar',
            itemStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 10
            }
        }

    },

    blueGreenBarChart2: {
        backgroundColor: 'transparent',
        legend: {
            orient: 'horizontal',
            icon: 'circle',
            itemHeight: 10,
            top: 30,
            textStyle: {
                fontWeight: 700,
                color: 'black'
            }
        },
        xAxis: {
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: {
                fontWeight: 600
            },
            boundaryGap: true,
            type: 'category',
            axisLabel: {
                show: true,
                rotate: 15,
                interval: 0,
                margin: 20
            },
            axisLine: {
                show: false
            },
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontWeight: 600
            },
            type: 'value',
        },
        seriesOptions: {
            type: 'bar',
            itemStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 10
            }
        }

    },
};