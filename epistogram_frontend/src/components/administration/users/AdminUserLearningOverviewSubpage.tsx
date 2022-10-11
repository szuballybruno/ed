import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ButtonType } from '../../../models/types';
import { UserApiService } from '../../../services/api/userApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { Id } from '../../../shared/types/versionId';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { Environment } from '../../../static/Environemnt';
import { usePaging } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { EpistoImage } from '../../controls/EpistoImage';
import { EpistoProgressBar } from '../../controls/EpistoProgressBar';
import { FlexFloat } from '../../controls/FlexFloat';
import { NoProgressChartYet } from '../../home/NoProgressChartYet';
import { LearningCourseStatsTile } from '../../learningInsights/LearningCourseStatsTile';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { EpistoPieChart } from '../../universal/charts/base_charts/EpistoPieChart';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EditSection } from '../courses/EditSection';
import { useAdminCourseContentDialogLogic } from './adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from './adminCourseContentDialog/AdminUserCourseContentDialog';

const UserStatisticsProgressWithLabel = (props: {
    title: string,
    value: number,
    isSelected: boolean,
    onClick: () => void
}) => {

    return <EpistoFlex2
        className='roundBorders'
        fontWeight='bold'
        color={props.isSelected ? 'white' : undefined}
        onClick={props.onClick}
        background={props.isSelected ? 'var(--epistoTeal)' : undefined}
        w="100%"
        mt="10px"
        h="40px"
        align="center"
        p="5px 15px">

        <EpistoFont style={{
            minWidth: 100
        }}
            fontSize={'fontExtraSmall'}>
            {props.title}
        </EpistoFont>

        <EpistoProgressBar
            value={props.value}
            variant="determinate"
            color='secondary'
            style={{
                background: props.isSelected ? 'white' : undefined,
                width: '80%',
                margin: '0 10px',
                height: '5px'
            }} />

        <EpistoFont
            style={{
                fontWeight: 600
            }}
            fontSize={'fontSmall'}>

            {props.value}
        </EpistoFont>
    </EpistoFlex2>;
};

const measurementDescriptions = [
    'A hatékony tanulás egyik alappillére, hogy a felhasználó milyen intenzitással képzi magát. A belépések számából, gyakoriságából, valamint időtartamából számoljuk az elköteleződést, és figyeljük azt is, hogyan változik ez a tananyag folyamán, így mérve a kritikus pontokat. Amennyiben a felhasználó számára elérhető vagy teljesítésre váró tanfolyam áll a rendelkezésre, úgy az elköteleződés csökkenéséről értesítjük őt, így segítve, hogy ismét a megfelelő ütemben folytathassa a képzést. Számszerűsítve 50 pont feletti elköteleződés már jónak számít, 70 pont felett pedig motivált tanulóról és rendszerezett tanulásról beszélhetünk.',
    'Teljesítménymutatónk súlyozva összegzi a videós tananyagok, vizsgák, előugró és ismétlő kérdésekre adott válaszok eredményét, így pedig egyetlen, mérőszámból meg tudjuk állapítani, hogy az adott felhasználó eredményesen tanul-e, vagy esetleg összességében szükséges-e javítani a teljesítményén. 70 pont feletti érték esetén beszélhetünk jó teljesítményről, 85 pont felett pedig megnyugodhatunk, felhasználónk rendkívül eredményesen képzi saját magát.',
    'Komplex algoritmusunk a felhasználó összes szokását és tevékenységét megvizsgálja segít megállapítani, mennyire effektív a tanulás. Előfordulhat, hogy egy felhasználó lassan tanul, ugyanakkor kimagasló eredményt ér el, de a gyors haladás sokszor a megértés kárára megy, így nem szabad pusztán a megtekintett videók mennyiségéből kiindulni. Produktivitás mutatónk ezeket összegezve segíti megmutatni, melyek azok a felhasználók, ahol esetleg még lehetne csiszolni az effektivitáson. 70 pont feletti érték esetén beszélhetünk megfelelő produktivitásról, 85 pont felett pedig extrán produktívnak számít az adott felhasználó.',
    'Miért fontos a felhasználók reakcióidejének vizsgálata? Hosszú távon megállapítható, mennyire fejlett döntéshozási, reagálási képességük, valamint az esetleges csalások kiszűrésében is extra segítséget jelent. Az átlagál 3-4x rosszabb reakcióidő, ellenben kiemelkedően magasabb teljesítmény ugyanis azt is jelentheti, hogy a felhasználónk más forrás segítségét is igénybe veszi.'
];

export const AdminUserStatisticsSubpage = ({
    tabMenuItems,
    headerButtons,
    userId
}: {
    tabMenuItems: any[],
    headerButtons: ButtonType[],
    userId: Id<'User'>
}) => {

    const { addRoute, userRoute: { teacherInfoRoute, editRoute, statsRoute, courseContentRoute } } = applicationRoutes.administrationRoute.usersRoute;

    const { navigate2 } = useNavigation();
    const navigateToAddUser = () => navigate2(addRoute);

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();
    const paging = usePaging({ items: ['a', 'b', 'c', 'd'] });

    const { userEditData } = UserApiService
        .useEditUserData(userId);

    const { userLearningOverviewData, userLearningOverviewDataError, userLearningOverviewDataStatus } = UserApiService
        .useUserLearningOverviewData(userId);

    const engagementPoints = userLearningOverviewData?.engagementPoints || 0;
    const performancePoints = Math.floor(userLearningOverviewData?.performancePercentage || 0);
    const productivityPoints = Math.floor(userLearningOverviewData?.productivityPercentage || 0);
    const reactionTimeScorePoints = userLearningOverviewData?.reactionTimeScorePoints || 0;

    const watchingVideosPercentage = userLearningOverviewData?.userActivityDistributionData.watchingVideosPercentage || 0;
    const completingExamsPercentage = userLearningOverviewData?.userActivityDistributionData.completingExamsPercentage || 0;
    const answeringQuestionsPercentage = userLearningOverviewData?.userActivityDistributionData.answeringQuestionsPercentage || 0;
    const noActivityPercentage = userLearningOverviewData?.userActivityDistributionData.noActivityPercentage || 0;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const texts = translatableTexts.administration.userLearningOverviewSubpage;

    const handleSelectMeasurementDescription = (index: number) => {

        return paging.setItem(index);
    };

    return (
        <AdminSubpageHeader
            direction="column"
            tabMenuItems={tabMenuItems}
            headerButtons={headerButtons}>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            {/* learning insights header */}
            <EditSection
                title={texts.sectionTitles.learningOverviewReport}
                rightSideComponent={(

                    /* set date range */
                    <EpistoFlex2
                        justify="center"
                        align="center"
                        my="10px">
                    </EpistoFlex2>
                )}>

                <EpistoFlex2
                    mt='10px'>

                    <EpistoFlex2
                        direction="column"
                        justify="flex-start"
                        flex="4"
                        p="0 5px 0 0">

                        <EpistoFlex2
                            background="var(--transparentWhite70)"
                            className="roundBorders mildShadow"
                            align="center"
                            p="10px"
                            maxH="150px"
                            flex="1"
                            position="relative">

                            <EpistoImage
                                h={'120px'}
                                w={'120px'}
                                src={Environment.getAssetUrl('/images/happyfacechart.png')} />

                            <EpistoFlex2
                                direction="column"
                                p="10px">

                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={'fontLargePlus'}>

                                    {`${Math.floor(userLearningOverviewData?.overallPerformancePercentage || 0)}/100 Pont`}
                                </EpistoFont>

                                <EpistoFont
                                    style={{
                                        fontWeight: 600
                                    }}
                                    fontSize={'fontNormal14'}>

                                    {texts.userPerformanceTitles.performedWell}
                                </EpistoFont>

                                <EpistoFont
                                    fontSize={'fontNormal14'}>

                                    {texts.userPerformanceDescriptions.performedWell}
                                </EpistoFont>
                            </EpistoFlex2>
                        </EpistoFlex2>

                        <EpistoFlex2
                            w="100%"
                            mt="20px"
                            direction="column">

                            <UserStatisticsProgressWithLabel
                                title={texts.progressLabels.engagement}
                                onClick={() => handleSelectMeasurementDescription(0)}
                                isSelected={paging.currentIndex === 0}
                                value={engagementPoints} />

                            <UserStatisticsProgressWithLabel
                                title={texts.progressLabels.performance}
                                onClick={() => handleSelectMeasurementDescription(1)}
                                isSelected={paging.currentIndex === 1}
                                value={performancePoints} />

                            <UserStatisticsProgressWithLabel
                                title={texts.progressLabels.productivity}
                                onClick={() => handleSelectMeasurementDescription(2)}
                                isSelected={paging.currentIndex === 2}
                                value={productivityPoints} />

                            <UserStatisticsProgressWithLabel
                                title={texts.progressLabels.reactionTime}
                                onClick={() => handleSelectMeasurementDescription(3)}
                                isSelected={paging.currentIndex === 3}
                                value={reactionTimeScorePoints} />
                        </EpistoFlex2>
                    </EpistoFlex2>
                    <EpistoFlex2
                        direction="column"
                        flex="5"
                        p="0 0 10px 20px">

                        <EpistoFlex2 h="150px">

                            <StatisticsCard
                                iconPath={Environment.getAssetUrl('images/learningreport01.png')}
                                value={`${Math.floor((userLearningOverviewData?.totalTimeActiveOnPlatformSeconds || 0) / 60 / 60)}`}
                                suffix={translatableTexts.misc.suffixes.hour}
                                style={{
                                    marginRight: 10
                                }}
                                title={texts.statisticsCards.activeTimeSpentOnPlatform} />

                            <StatisticsCard
                                iconPath={Environment.getAssetUrl('images/learningreport02.png')}
                                value={`${userLearningOverviewData?.watchedVideos || 0}`}
                                suffix={translatableTexts.misc.suffixes.count}
                                title={texts.statisticsCards.watchedVideosInMonth} />
                        </EpistoFlex2>

                        <EpistoFlex2 p="20px 10px 10px 2px">

                            {measurementDescriptions[paging.currentIndex]}
                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoFlex2>
            </EditSection>

            <EditSection
                title={texts.sectionTitles.coursesInMonth}>

                <EpistoGrid
                    auto="fill"
                    gap="15px"
                    minColumnWidth="250px"
                    p="10px 0">

                    {userLearningOverviewData?.inProgressCourses && userLearningOverviewData.inProgressCourses.map((course, index) => {
                        return <LearningCourseStatsTile
                            actionButtons={[{
                                children: translatableTexts.misc.details,
                                onClick: () => adminCourseContentDialogLogic
                                    .openDialog({
                                        courseId: course.courseId,
                                        userId
                                    })
                            }]}
                            course={course}
                            key={index} />;
                    })}
                </EpistoGrid>
            </EditSection>

            <EditSection
                title={texts.sectionTitles.averageProgressWithCourses}>

                <EpistoFlex2 p="10px 0">
                    <div
                        style={{
                            width: '80%',
                            marginRight: '10px',
                            display: 'grid',
                            boxSizing: 'border-box',
                            gap: '10px',
                            gridAutoFlow: 'row dense',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gridAutoRows: '160px'
                        }}>

                        {/* total completed video count */}
                        <StatisticsCard
                            title={texts.statisticsCards.answeredVideoAndPractiseQuizQuestions}
                            value={`${userLearningOverviewData?.answeredVideoAndPractiseQuizQuestions || 0}`}
                            suffix={translatableTexts.misc.suffixes.count}
                            iconPath={Environment.getAssetUrl('images/learningreport03.png')}
                            isOpenByDefault={false} />

                        {/* total playback time */}
                        <StatisticsCard
                            title={texts.statisticsCards.correctAnswerRatePercentage}
                            value={`${Math.floor(userLearningOverviewData?.correctAnswerRatePercentage || 0)}`}
                            suffix={translatableTexts.misc.suffixes.percentage}
                            iconPath={Environment.getAssetUrl('images/learningreport04.png')}
                            isOpenByDefault={false} />

                        {/* total given answer count  */}
                        <StatisticsCard
                            title={texts.statisticsCards.reactionTime}
                            value={(userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) > 20
                                ? texts.statisticsCards.belowAverage
                                : (userLearningOverviewData?.userReactionTimeDifferencePercentage || 0) < -20
                                    ? texts.statisticsCards.aboveAverage
                                    : texts.statisticsCards.average}
                            suffix={''}
                            iconPath={Environment.getAssetUrl('images/learningreport05.png')}
                            isOpenByDefault={false} />

                        {/* correct answer rate  */}
                        <StatisticsCard
                            title={texts.statisticsCards.averageWatchedVideosPerDay}
                            value={`${Math.floor(userLearningOverviewData?.averageWatchedVideosPerDay || 0)}`}
                            suffix={translatableTexts.misc.suffixes.countPerDay}
                            iconPath={Environment.getAssetUrl('images/learningreport06.png')}
                            isOpenByDefault={false} />

                    </div>
                    {/* chart item  */}
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        direction="column"
                        p="10px"
                        minWidth='250px'
                        style={{
                            gridColumn: 'auto / span 2',
                            gridRow: 'auto / span 2'
                        }}>

                        <NoProgressChartYet />

                    </FlexFloat>
                </EpistoFlex2>

            </EditSection>

            <EditSection title={texts.sectionTitles.activities}>
                <div
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        display: 'grid',
                        boxSizing: 'border-box',
                        padding: '10px 0',
                        gap: '10px',
                        gridAutoFlow: 'row dense',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gridAutoRows: '160px'
                    }}>

                    {/* chart item  */}
                    <FlexFloat
                        background="var(--transparentWhite70)"
                        direction="column"
                        p="10px"
                        minWidth='250px'
                        style={{
                            gridColumn: 'auto / span 2',
                            gridRow: 'auto / span 2'
                        }}>

                        <EpistoPieChart
                            title=""
                            isSortValues
                            segments={[
                                {
                                    value: watchingVideosPercentage,
                                    name: texts.activitiesPieChartTexts.watchingVideos
                                },
                                {
                                    value: completingExamsPercentage,
                                    name: texts.activitiesPieChartTexts.doingExamsOrTests
                                },
                                {
                                    value: answeringQuestionsPercentage,
                                    name: texts.activitiesPieChartTexts.answeringQuestions
                                },
                                {
                                    value: noActivityPercentage,
                                    name: texts.activitiesPieChartTexts.noActivity
                                }
                            ]}
                            options={defaultCharts.pie3} />

                    </FlexFloat>

                    {/* total completed video count */}
                    <StatisticsCard
                        title={texts.statisticsCards.mostFrequentTimeRange}
                        value={`${userLearningOverviewData?.mostFrequentTimeRange || translatableTexts.misc.unknown}`}
                        suffix={''}
                        iconPath={Environment.getAssetUrl('images/learningreport07.png')}
                        isOpenByDefault={false} />

                    {/* total playback time */}
                    <StatisticsCard
                        title={texts.statisticsCards.totalDoneExams}
                        value={`${userLearningOverviewData?.totalDoneExams || 0}`}
                        suffix={translatableTexts.misc.suffixes.count}
                        iconPath={Environment.getAssetUrl('images/learningreport08.png')}
                        isOpenByDefault={false} />

                    {/* total given answer count  */}
                    <StatisticsCard
                        title={texts.statisticsCards.averageSessionLength}
                        value={`${Math.floor((userLearningOverviewData?.averageSessionLengthSeconds || 0) / 60)}`}
                        suffix={translatableTexts.misc.suffixes.minute}
                        iconPath={Environment.getAssetUrl('images/learningreport09.png')}
                        isOpenByDefault={false} />

                    {/* correct answer rate  */}
                    <StatisticsCard
                        title={texts.statisticsCards.videosToBeRepeated}
                        value={`${userLearningOverviewData?.videosToBeRepeatedCount || 0}`}
                        suffix={translatableTexts.misc.suffixes.count}
                        iconPath={Environment.getAssetUrl('images/learningreport10.png')}
                        isOpenByDefault={false} />
                </div>
            </EditSection>
        </AdminSubpageHeader>
    );
};
