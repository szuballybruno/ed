import { deepMergeObjects } from '@episto/x-core';
import { EChartsOption, SeriesOption } from 'echarts';
import { EpistoPieChartOptionsType } from './EpistoPieChartTypes';

export const pieChartVariantOptions: { [K: string]: EpistoPieChartOptionsType } = {
    /* Donut chart */
    donut: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        legend: {
            top: '7%',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        seriesOptions: {
            radius: ['40%', '60%'],
            top: 20,
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            color: ['#CEDC00', '#00594F', '#10776b', '#9ba515', '#209b8c'],

        }
    },

    pie: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        seriesOptions: {
            radius: '70%',
            center: ['50%', '50%'],
            roseType: 'radius',
            color: ['#CEDC00', '#10776b', '#209b8c', '#9ba515'],
            label: {
                color: 'rgba(0,0,0, 0.6)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                shadowBlur: 200,
                shadowColor: 'transparent'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }

    },

    pie2: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        seriesOptions: {
            radius: '40%',
            center: ['50%', '50%'],
            roseType: 'radius',

            color: ['#CEDC00', '#10776b', '#209b8c', '#9ba515'],
            label: {
                color: 'rgba(0,0,0, 0.6)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                shadowBlur: 200,
                shadowColor: 'transparent'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }

    },

    pie3: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        seriesOptions: {
            radius: '70%',
            center: ['50%', '50%'],
            color: ['#CEDC00', '#10776b', '#209b8c', '#9ba515'],
            label: {
                color: 'rgba(0,0,0, 0.6)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                shadowBlur: 200,
                shadowColor: 'transparent'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }
    },

    redRadiusPie: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        seriesOptions: {
            radius: '70%',
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                color: 'rgba(0,0,0, 0.6)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#00594F',
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }

    },

    twoSegmentRedDoughnut: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        seriesOptions: {
            type: 'pie',
            radius: ['60%', '80%'],
            top: 20,
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 7,
                //borderColor: '#fff',
                //borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}',
                position: 'center',
                emphasis: {
                    show: true
                }
            },
            emphasis: {

                label: {
                    formatter: '{b}',
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            color: ['#00594F', 'grey'],
        }
    },

    twoSegmentGreenDoughnut: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        seriesOptions: {
            type: 'pie',
            radius: ['60%', '80%'],
            top: 20,
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 7,
                //borderColor: '#fff',
                //borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}',
                position: 'center',
                emphasis: {
                    show: true
                }
            },
            emphasis: {

                label: {
                    formatter: '{b}',
                    show: false,
                    fontSize: '18',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            color: ['#00594F', 'grey'],
        }
    },
};

export const getPieDefaultOptions = (seriesOptions: SeriesOption): EChartsOption => ({
    legend: {
        top: 'bottom',
        show: true
    },
    series: [
        deepMergeObjects({
            type: 'pie',
            labelLine: {
                show: false
            },
            label: {
                show: false,
            },
            roseType: 'area',
            radius: [10, 140],
            tooltip: {
                show: false
            },
        } as SeriesOption, seriesOptions)
    ]
});