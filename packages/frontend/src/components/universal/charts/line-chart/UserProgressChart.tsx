import { FlexProps } from '@chakra-ui/layout';
import { instantiate } from '@episto/commonlogic';
import { UserCourseProgressChartDTO } from '@episto/communication';
import { deepMergeObjects } from '@episto/x-core';
import { useMemo } from 'react';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoLineChart } from './EpistoLineChart';
import { EpistoLineChartOptionsType } from './EpistoLineChartTypes';
import { defaultOptions } from './lineChartVariants';

const useUserProgressChartOptions = (
    interval: number,
    userProgress: UserCourseProgressChartDTO) => useMemo(() => {

        /*   const recommendedProgressArray = userProgress
              .map(x => x.recommendedCompletedPercentage);
  
          const dates = userProgress
              .map(x => Formatters
                  .toDateStringFormatted(x.date)); */

        /* const maxProgressValue = userProgress.actualProgress.last();
         const maxYValue = Math.round(Math.min(100, maxProgressValue * 1.8)); */

        return instantiate<EpistoLineChartOptionsType>(deepMergeObjects({
            color: ['orange', 'limegreen'],
            legend: {
                data: [/* 'Ajánlott haladás',  */'Valós haladás', 'Becsült haladás']
            },
            xAxis: {
                data: userProgress.dates,
                name: 'Dátum',
                axisLabel: {
                    interval: interval,
                },
            },
            yAxis: {
                name: 'Haladás',
                max: 100,
                axisLabel: {
                    formatter: '{value}%'
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: ([
                    recommendedCompletedPercentage,
                    previsionedCompletedPercentage,
                    actualCompletedPercentage
                ]: any) => {

                    const asd = (param: any) => {

                        const data = param?.data;
                        if (data === null || data === undefined)
                            return '-';

                        return `${Math.round(data * 10) / 10}%`;
                    };

                    return `
                ${recommendedCompletedPercentage.axisValue} <br />
                Ajánlott haladás: ${asd(recommendedCompletedPercentage)} <br />
                Becsült haladás: ${asd(previsionedCompletedPercentage)} <br />
                Valós haladás: ${asd(actualCompletedPercentage)}
            `;
                }
            },
            seriesOptions: {
                showSymbol: false,
                smooth: true,
                lineStyle: {
                    width: 4
                }

            },


        }, defaultOptions));
    }, [interval, userProgress]);

export const UserProgressChart = ({
    userProgress,
    ...css
}: {
    userProgress: UserCourseProgressChartDTO
} & FlexProps) => {


    const interval = useMemo(() => Math.floor(userProgress.previsionedProgress.length / 7), [userProgress]);
    //const interval = useMemo(() => Math.floor(userProgress.length / 7), [userProgress]);
    const options = useUserProgressChartOptions(interval, userProgress);

    return (
        <EpistoFlex2
            id={UserProgressChart.name}
            {...css}>

            <EpistoLineChart
                title=''
                options={options}
                xAxisData={userProgress.dates}
                xAxisLabel="Dátum"
                yAxisLabel="Haladás"
                yAxisLabelSuffix='%'
                dataset={[
                    {
                        name: 'Valós haladás',
                        data: userProgress.actualProgress,
                        lineStyle: {
                            color: 'orange',
                            type: 'line'
                        }
                    },
                    {
                        name: 'Becsült haladás',
                        data: userProgress.previsionedProgress,
                        lineStyle: {
                            color: 'lightgreen',
                            type: 'dotted'
                        }
                    }
                ]}
                style={{
                    width: '100%',
                    height: '100%'
                }} />
        </EpistoFlex2>
    );
};