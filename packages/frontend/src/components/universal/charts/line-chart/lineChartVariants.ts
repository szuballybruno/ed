import { EChartsOption } from 'echarts';

export const defaultOptions: EChartsOption = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    xAxis: {
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
            fontWeight: 600
        },
        boundaryGap: false,
        type: 'category',
        axisLabel: {
            show: true,
            showMaxLabel: true,
            rotate: 0,
            margin: 20,
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
            fontWeight: 600
        },
        type: 'value'
    }
};