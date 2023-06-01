import { Grid } from '@chakra-ui/react';
import { instantiate } from '@episto/commonlogic';
import { UserCheckPermissionDTO } from '@episto/communication';
import { useEffect, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCheckPermission } from '../../../services/api/permissionsApiService';
import { Environment } from '../../../static/Environemnt';
import { ArrayBuilder } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { StatisticsGroupType } from '../../learningInsights/LearningStatistics';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoBarChart } from '../../universal/charts/bar-chart/EpistoBarChart';
import { EpistoPieChart } from '../../universal/charts/pie-chart/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export const CourseStatisticsSubpage = () => {

    const params = useRouteParams2(applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute);

    const courseId = params
        .getValue(x => x.courseId);

    const { checkPermissionAsync, checkPermissionState } = useCheckPermission();

    const [canEditCourse, setCanEditCourse] = useState<boolean>(false);



    useEffect(() => {
        const handleCheckPermission = async () => {

            const hasPermission = await checkPermissionAsync(instantiate<UserCheckPermissionDTO>({
                permissionCode: 'EDIT_COURSE',
                contextCourseId: courseId,
                contextCompanyId: null
            }));

            return setCanEditCourse(hasPermission);
        };

        handleCheckPermission();

    }, [checkPermissionAsync, courseId]);

    const adminHomeDetailsStatistics = useMemo((): StatisticsGroupType[] => [
        {
            title: '',
            items: [

                /* Course completion rate */
                {
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Kurzus teljesítési ráta',
                    value: '79',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic1.png'),
                    isOpenByDefault: false
                },

                /* Average time spent with learning per week */
                {
                    title: 'Átlagos tanulással töltött idő/hét',
                    value: '3.5',
                    suffix: 'óra',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic2.png'),
                    isOpenByDefault: false
                },

                /* Performance on exam */
                {
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Teljesítés a vizsgákon',
                    value: '67',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic3.png'),
                    isOpenByDefault: false
                },

                /* Average time spent per sessions */
                {
                    title: 'Átlagosan eltöltött idő/alkalom',
                    value: '38',
                    suffix: 'perc',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic4.png'),
                    isOpenByDefault: false
                },

                /* User activity distribution chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoPieChart
                        title="Felhasználók aktivitása"
                        isSortValues
                        segments={[
                            { value: 30, name: 'Videók megtekintése' },
                            { value: 17, name: 'Vizsga / tesztkitöltés' },
                            { value: 10, name: 'Kérdések megválaszolása' },
                            { value: 20, name: 'Nincs tevékenység' }]}
                        variant="pie2" />
                },
            ]
        }, {
            title: '',
            items: [

                /* Most active time ranges chart */
                {
                    isOpenByDefault: true,
                    children: <EpistoBarChart
                        title='Kurzus megtekintések alakulása'
                        variant="blueGreenBarChart"
                        xAxisData={[
                            '03. 21.',
                            '03. 22.',
                            '03. 23.',
                            '03. 24.',
                            '03. 25.',
                            '03. 26.',
                            '03. 27.',
                            '03. 28.',
                        ]}
                        xAxisLabel="A hét napjai"
                        yAxisLabel="Kurzus megtekintések"
                        dataset={[{
                            name: 'Jelenlegi hét',
                            color: '#00594F',
                            data: [[0, 90], [1, 80], [2, 65], [3, 60], [4, 55], [5, 40], [6, 30], [7, 15]]
                        }]} />,
                },

                /* Average watched videos per day */
                {
                    additionalInfo: {
                        change: 'up',
                        value: '32',
                        suffix: '%'
                    },
                    title: 'Átlagosan megtekintett videók naponta',
                    value: '6',
                    suffix: 'videó',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic5.png'),
                    isOpenByDefault: false
                },

                /* Productivity rate */
                {
                    title: 'Produktivitás alakulása (produktív folyamatok aránya nő a non produktívhoz képest)',
                    value: '38',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic6.png'),
                    isOpenByDefault: false
                },

                /* Dropout rate */
                {
                    additionalInfo: {
                        change: 'down',
                        value: '20',
                        suffix: '%'
                    },
                    title: 'Lemorzsolódás',
                    value: '12',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic7.png'),
                    isOpenByDefault: false,
                },

                /* Commitment rate */
                {
                    title: 'Elköteleződés',
                    value: '73',
                    suffix: '%',
                    iconPath: Environment.getAssetUrl('images/teacherdashboardstatistic8.png'),
                    isOpenByDefault: false,
                }
            ]
        }
    ], []);

    return (
        <CourseAdministartionFrame
            isAnySelected={true} >

            <AdminSubpageHeader
                direction="column"
                tabMenuItems={new ArrayBuilder()
                    .addIf(canEditCourse, applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute)
                    .addIf(canEditCourse, applicationRoutes.administrationRoute.coursesRoute.courseContentRoute)
                    .add(applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute)
                    .add(applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute)
                    .getArray()
                }>

                {adminHomeDetailsStatistics
                    .map((section, index) => {
                        return <EpistoFlex2 key={index}
                            mt="10px">

                            <Grid
                                className="whall"
                                gap="10px"
                                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                                gridAutoRows="200px"
                                gridAutoFlow="column dense">

                                {section
                                    .items
                                    .map((item, index) => {
                                        return (
                                            <StatisticsCard
                                                key={index}
                                                {...item} />
                                        );
                                    })}
                            </Grid>
                        </EpistoFlex2>;
                    })}
            </AdminSubpageHeader >
        </CourseAdministartionFrame >
    );
};
