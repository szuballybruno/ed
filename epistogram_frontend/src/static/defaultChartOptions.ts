import { EpistoBarChartOptionsType } from '../components/universal/charts/types/EpistoBarChartTypes';
import { EpistoPieChartOptionsType } from '../components/universal/charts/types/EpistoPieChartTypes';

const averageGraphColor = '#ffa565';
const userGraphColor = '#97deef';
const gridColor = '#969fb7';
const shadowColor = 'rgba(0, 0, 0, .4)';

const defaultCharts = {

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
    } as EpistoPieChartOptionsType,

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

    } as EpistoPieChartOptionsType,

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

    } as EpistoPieChartOptionsType,

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
                shadowBlur: 100,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }

    } as EpistoPieChartOptionsType,

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

    /* Stacked bar chart */
    blueGreenBarChart: {
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

    } as EpistoBarChartOptionsType,


    blueGreenBarChart2: {
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

    } as EpistoBarChartOptionsType,

    simpleLineChart: {
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                return 'Időpont: ' + new Date(params[0].axisValue * 1000)
                    .toISOString()
                    .substr(14, 5) + ' <br />Felhasználók akik ezen a ponton elhagyták a videót: ' + params[0].data[0];
            }

        },
        xAxis: {
            type: 'time',
            axisLabel: {
                formatter: (params) => {
                    return new Date(params * 1000)
                        .toISOString()
                        .substr(14, 5);
                }
            }

        },
        seriesOptions: {
            showSymbol: false
        }


    },

    radar: {
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

    }

};

export { defaultCharts };
