import { Flex } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';

export const UserProgressChart = (props: {
    userProgress: UserCourseProgressChartDTO
}) => {

    const { userProgress } = props;

    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            },
            {
                data: [50, 100],
                type: 'line'
            }
        ]
    };

    return (
        <Flex>
            <ReactECharts
                className="whall"
                option={option}></ReactECharts>
        </Flex>
    )
}