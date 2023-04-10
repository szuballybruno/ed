import { useCourseOverviewData } from '../../../services/api/miscApiService';
import { Id } from '@episto/commontypes';
import { Environment } from '../../../static/Environemnt';
import { isNullOrUndefined } from '../../../static/frontendHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoGrid } from '../../controls/EpistoGrid';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';

export const useAdminCourseUserOverviewDialogLogic = () => {

    const adminCourseUserOverviewDialogLogic = useEpistoDialogLogic<{
        courseId: Id<'Course'>,
        userId: Id<'User'>,
        fullName: string
    }>(useAdminCourseUserOverviewDialogLogic.name);

    return adminCourseUserOverviewDialogLogic;
};

export type AdminCourseUserOverviewDialogLogicType = ReturnType<typeof useAdminCourseUserOverviewDialogLogic>

export const AdminCourseUserOverviewDialog = (props: {
    logic: AdminCourseUserOverviewDialogLogicType
}) => {

    const { logic } = props;

    console.log(logic.params);

    const { courseOverviewData } = useCourseOverviewData(logic.params?.userId || null, logic.params?.courseId || null);

    const courseStatsOverviewData = [
        {
            value: courseOverviewData?.completedVideoCount,
            title: 'Megtekintett videó',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon1.png'),
            suffix: 'db'
        },
        {
            value: courseOverviewData?.coinsAcquired,
            title: 'Megszerzett EpistoCoin',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon2.png'),
            suffix: 'db'
        },
        {
            value: Math.ceil((courseOverviewData?.totalSpentSeconds ?? 0) / 60),
            title: 'alatt teljesítette a kurzust',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon3.png'),
            suffix: 'perc'
        },
        {
            value: courseOverviewData?.answeredVideoQuestionCount,
            title: 'Megválaszolt kérdés',
            iconPath: Environment.getAssetUrl('/images/course_overview_icon4.png'),
            suffix: 'db'
        },
        {
            value: courseOverviewData?.questionSuccessRate,
            title: 'A kérdésekre adott válaszok átlaga',
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
            title: 'A kurzuszáró vizsga eredménye',
            suffix: '%'
        }
    ];

    return <EpistoDialog
        title={'Kurzus összegző jelentés - ' + logic.params?.fullName}
        logic={logic}
        closeButtonType='top'
        fullScreenX
        fullScreenY>

        <EpistoFlex2
            flex='1'
            direction="column"
            justify='flex-start'
            className="whall roundBorders"
            padding="20px">

            <EpistoGrid
                minColumnWidth={'250px'}
                gap={'10px'}
                auto={'fill'}
                width="100%">

                {courseStatsOverviewData
                    .map((item, index) => {
                        return <StatisticsCard
                            key={index}
                            suffix={item.suffix}
                            title={item.title}
                            iconPath={item.iconPath}
                            value={isNullOrUndefined(item.value) ? undefined : item.value + ''}
                            height='150px'
                            padding="10px 10px 10px 30px" />;
                    })}
            </EpistoGrid>

        </EpistoFlex2>
    </EpistoDialog>;
};
