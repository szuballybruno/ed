import { deepMergeObjects } from '@episto/x-core';
import { EChartsOption, SeriesOption } from 'echarts';
import { EpistoPieChartOptionsType } from './EpistoPieChartTypes';

export const pieChartVariantOptions: { [K: string]: EpistoPieChartOptionsType } = {
    /* Donut chart */
    donut: {
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
            color: ['#FAF33E', '#55505C', '#5D737E', '#7FC6A4', '#D6F8D6'],

        }
    },

    pie: {
        seriesOptions: {
            radius: '70%',
            center: ['50%', '50%'],
            roseType: 'radius',
            color: ['#FB4D3D', '#03CEA4', '#345995', '#EAC435'],
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
        seriesOptions: {
            radius: '40%',
            center: ['50%', '50%'],
            roseType: 'radius',

            color: ['#FB4D3D', '#03CEA4', '#345995', '#EAC435'],
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
        seriesOptions: {
            radius: '70%',
            center: ['50%', '50%'],
            color: ['#FB4D3D', '#03CEA4', '#345995', '#EEE'],
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
        visualMap: {
            show: false,
            min: 0,
            max: 50,
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
                color: '#c23531',
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }

    },

    twoSegmentRedDoughnut: {
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
            color: ['#933E55', 'grey'],
        }
    },

    twoSegmentGreenDoughnut: {
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
            color: ['#3EAA93', 'grey'],
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