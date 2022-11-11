import { instantiate } from '@episto/commonlogic';
import { Id } from '@episto/commontypes';
import { QuestionModuleCompareDTO } from '@episto/communication';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseOverviewData, useCourseOverviewModuleCompareData } from '../../../services/api/miscApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { isNullOrUndefined } from '../../../static/frontendHelpers';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { ExamLayout } from '../../exam/ExamLayout';
import StatisticsCard from '../../statisticsCard/StatisticsCard';

class RowType {
    moduleVersionId: Id<'ModuleVersion'>;
    moduleName: string;
    pretestExamScorePercentage: number;
    finalExamScorePercentage: number;
    scoreDifferencePercentage: number;
};

export const CourseOverviewSubpage = () => {

    const { courseOverviewData } = useCourseOverviewData();
    const { courseOverviewModuleCompareData } = useCourseOverviewModuleCompareData();

    const { navigate2 } = useNavigation();

    const mapToRow = (modules: QuestionModuleCompareDTO[]): RowType[] => {


        return modules
            .map(x => (instantiate<RowType>({
                moduleVersionId: x.moduleVersionId,
                moduleName: x.moduleName,
                pretestExamScorePercentage: x.pretestExamScorePercentage,
                finalExamScorePercentage: x.finalExamScorePercentage,
                scoreDifferencePercentage: x.scoreDifferencePercentage
            })));
    };

    const columns = new EpistoDataGridColumnBuilder<RowType, Id<'ModuleVersion'>>()
        .add({
            field: 'moduleName',
            width: 300,
            headerName: 'Modul',
        })
        .add({
            field: 'pretestExamScorePercentage',
            width: 250,
            headerName: 'Előzetesen felmért eredmény',
            renderCell: (value => value.value ? Math.round(value.value) + '%' : '-')
        })
        .add({
            field: 'finalExamScorePercentage',
            width: 250,
            headerName: 'A kurzus elvégzését követően elért eredmény',
            renderCell: (value => value.value ? Math.round(value.value) + '%' : '-')
        })
        .add({
            field: 'scoreDifferencePercentage',
            headerName: 'Különbség',
            renderCell: (value => value.value ? Math.round(value.value) + '%' : '-')
        })
        .getColumns();

    /**
    * Összesen ennyi videót néztél meg
    * Ennyi EpistoCoint szereztél közben
    * Ennyi idő alatt végezted el a kurzust
    * Összesen ennyi kérdésre válaszoltál
    * A kérdésekre adott válaszaid átlaga
    * A témazárók átlaga
    * A kurzuszáró vizsgád eredménye
    **/

    const courseStatsOverviewData = [
        {
            value: courseOverviewData?.completedVideoCount,
            title: 'Összesen ennyi videót néztél meg',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon1.png'),
            suffix: 'db'
        },
        {
            value: courseOverviewData?.coinsAcquired,
            title: 'Ennyi EpistoCoint szereztél közben',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon2.png'),
            suffix: 'db'
        },
        {
            value: Math.ceil((courseOverviewData?.totalSpentSeconds ?? 0) / 60),
            title: 'Ennyi idő alatt végezted el a kurzust',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon3.png'),
            suffix: 'perc'
        },
        {
            value: courseOverviewData?.answeredVideoQuestionCount,
            title: 'Összesen ennyi kérdésre válaszoltál',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon4.png'),
            suffix: 'db'
        },
        {
            value: courseOverviewData?.questionSuccessRate,
            title: 'A kérdésekre adott válaszaid átlaga',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon5.png'),
            suffix: '%'
        },
        {
            value: courseOverviewData?.examSuccessRateAverage,
            iconPath: Environment.getAssetUrl('/images/course_overview_icon6.png'),
            title: 'A témazárók átlaga',
            suffix: '%'
        },
        {
            value: courseOverviewData?.finalExamSuccessRate,
            iconPath: Environment.getAssetUrl('/images/course_overview_icon7.png'),
            title: 'A kurzuszáró vizsgád eredménye',
            suffix: '%'
        }
    ];

    return (
        <ExamLayout
            headerCenterText={'A kurzus során elért eredményed'}
            footerButtons={[
                {
                    title: 'Vissza a tanfolyamkeresobe',
                    action: () => {
                        navigate2(applicationRoutes.availableCoursesRoute);
                    },
                },
            ]}>

            <EpistoFlex2
                flex='1'
                background='var(--transparentWhite70)'
                direction="column"
                justify='flex-start'
                className="whall roundBorders mildShadow"
                p="20px">

                <EpistoGrid
                    minColumnWidth={'250px'}
                    gap={'10px'}
                    auto={'fill'}
                    marginBottom={'10px'}
                    w="100%">

                    {courseStatsOverviewData
                        .map((item, index) => {
                            return <StatisticsCard
                                key={index}
                                suffix={item.suffix}
                                title={item.title}
                                iconPath={item.iconPath}
                                value={isNullOrUndefined(item.value) ? undefined : item.value + ''}
                                height='150px'
                                p="10px 10px 10px 30px" />;
                        })}
                </EpistoGrid>


                <EpistoDataGrid
                    rows={mapToRow(courseOverviewModuleCompareData || [])}
                    columns={columns}
                    getKey={x => x.moduleVersionId} />

            </EpistoFlex2>
        </ExamLayout>
    );
};
