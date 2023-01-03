import { deepMergeObjects } from '@thinkhub/x-core';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { defaultOptions } from './lineChartVariants';

export const EpistoLineChart = ({
    options
}: {
    options?: EChartsOption
}) => {

    const finalOptions = options
        ? deepMergeObjects(defaultOptions, options)
        : defaultOptions;

    return <ReactECharts
        option={finalOptions}
        style={{
            width: '100%',
            height: '100%',
        }} />;
};