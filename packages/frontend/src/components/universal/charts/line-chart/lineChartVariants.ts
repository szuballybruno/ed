import { EChartsOption } from 'echarts-for-react';

export const simpleLineChart: EChartsOption = {
    tooltip: {
        trigger: 'axis',
        // formatter: (params) => {
        //     return 'Időpont: ' + new Date(params[0].axisValue * 1000)
        //         .toISOString()
        //         .substr(14, 5) + ' <br />Felhasználók akik ezen a ponton elhagyták a videót: ' + params[0].data[0];
        // }
    },
    xAxis: {
        type: 'time',
        axisLabel: {
            formatter: (params) => {

                return 'asd';
                // return new Date(params * 1000)
                //     .toISOString()
                //     .substr(14, 5);
            }
        }

    },
    seriesOptions: {
        showSymbol: false
    }
};