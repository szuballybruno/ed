import { Flex, Image } from '@chakra-ui/react';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { UserCourseProgressChartDTO } from '../../../../shared/dtos/UserCourseProgressChartDTO';
import { defaultCharts } from '../../../../static/defaultChartOptions';
import { getAssetUrl, roundNumber } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFont } from '../../../controls/EpistoFont';
import { TabPanel } from '../../../courseDetails/TabPanel';
import { EpistoDialog, EpistoDialogLogicType } from '../../../EpistoDialog';
import { NoProgressChartYet } from '../../../home/NoProgressChartYet';
import { UserProgressChart } from '../../../universal/charts/UserProgressChart';
import StatisticsCard from '../../../statisticsCard/StatisticsCard';
import { AdminUserVideosDataGridControl } from '../dataGrids/AdminUserVideosDataGridControl';
import { EpistoPieChart } from '../../../universal/charts/base_charts/EpistoPieChart';

export const AdminUserCourseContentDialogSubpage = (props: {
    userStats: {
        userProgressData: UserCourseProgressChartDTO,
        completedVideoCount: number,
        totalVideoPlaybackSeconds: number,
        totalGivenAnswerCount: number,
        totalCorrectAnswerRate: number
    }
}) => {

    const { userStats } = props;

    return <Flex
        direction="column"
        p="20px"
        flex="1">

        <Flex
            flex="1">

            <Flex
                h="350px"
                flex="1"
                align="stretch">

                <Flex flex="1">

                    <EpistoPieChart
                        title="Teljesítmény"
                        segments={[
                            { value: 70, name: 'Teljesítmény 70%' },
                            { value: 30, name: '' },
                        ]}
                        options={defaultCharts.twoSegmentGreenDoughnut} />
                </Flex>
                <Flex flex="1">

                    <EpistoPieChart
                        title="Haladás"
                        segments={[
                            { value: 20, name: '' },
                            { value: 80, name: 'Haladás 20%' },
                        ]}
                        options={defaultCharts.twoSegmentRedDoughnut} />
                </Flex>
                <Flex flex="1">

                    <EpistoPieChart
                        title="Aktivitás eloszlása"
                        isSortValues
                        segments={[
                            { value: 30, name: '' },
                            { value: 17, name: '' },
                            { value: 10, name: '' },
                            { value: 20, name: '' }
                        ]}
                        options={defaultCharts.pie} />
                </Flex>
            </Flex>

            <Flex
                h="350px"
                className="roundBorders"
                flex="1"
                direction="column"
                background="var(--transparentWhite70)">

                {userStats.userProgressData && userStats.userProgressData.days.length > 0
                    ? <UserProgressChart userProgress={userStats.userProgressData} />
                    : <NoProgressChartYet />}
            </Flex>
        </Flex>

        <div
            style={{
                width: '100%',
                maxWidth: '100%',
                display: 'grid',
                boxSizing: 'border-box',
                marginTop: '20px',
                gap: '10px',
                gridAutoFlow: 'row dense',
                gridTemplateColumns: 'repeat(auto-fill, minmax(23%, 1fr))',
                gridAutoRows: '160px'
            }}>

            {/* total completed video count */}
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.title}
                value={userStats ? userStats.completedVideoCount + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.watchedVideosInThisMonth.suffix}
                iconPath={getAssetUrl('images/watchedvideos3Dsmaller.png')}
                isOpenByDefault={false} />

            {/* total playback time */}
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.title}
                value={userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.timeSpentWithWatchingVideosInThisMonth.suffix}
                iconPath={getAssetUrl('images/watch3D.png')}
                isOpenByDefault={false} />

            {/* total given answer count  */}
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.title}
                value={userStats ? userStats.totalGivenAnswerCount + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.totalGivenAnswersCount.suffix}
                iconPath={getAssetUrl('images/answeredquestions3D.png')}
                isOpenByDefault={false} />

            {/* correct answer rate  */}
            <StatisticsCard
                title={translatableTexts.homePage.statsSummary.correctAnswerRate.title}
                value={userStats ? roundNumber(userStats.totalCorrectAnswerRate) + '' : '0'}
                suffix={translatableTexts.homePage.statsSummary.correctAnswerRate.suffix}
                iconPath={getAssetUrl('images/rightanswer3D.png')}
                isOpenByDefault={false} />
        </div>
    </Flex>;
};



export const AdminUserCourseContentDialog = (props: {
    userCourseStatsData: {
        userProgressData: UserCourseProgressChartDTO,
        completedVideoCount: number,
        totalVideoPlaybackSeconds: number,
        totalGivenAnswerCount: number,
        totalCorrectAnswerRate: number
    },
    dialogLogic: EpistoDialogLogicType
}) => {

    const { userCourseStatsData: userStats, dialogLogic } = props;

    const [currentTab, setCurrentTab] = useState(0);


    const moreInfoDialogTabs = [
        {
            title: 'Áttekintés',
            component: <AdminUserCourseContentDialogSubpage userStats={userStats} />
        },
        {
            title: 'Videók',
            component: <Flex>
                <AdminUserVideosDataGridControl />
            </Flex>
        },
        {
            title: 'Vizsgák',
            component: <Flex>

            </Flex>
        },
        {
            title: 'Kommentek/kérdések',
            component: <Flex>
                Kommentek/kérdések
            </Flex>
        }
    ];

    return <EpistoDialog fullScreenX
        fullScreenY
        logic={dialogLogic}>
        <Flex
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* tabs */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                justify="space-between"
                align="center"
                position="sticky"
                w="100%"
                top="0"
                maxH="80px"
                p="20px 30px 20px 30px"
                className="mildShadow"
                zIndex="1000"
                flex="1">

                <Flex
                    align="center"
                    h="50px">
                    <Flex
                        h="50px"
                        direction="column"
                        mr="20px">

                        <EpistoFont
                            fontSize={'fontLarge'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                fontWeight: 600
                            }}>
                            Microsoft PowerPoint alapok
                        </EpistoFont>
                        <EpistoFont fontSize={'fontMid'}>
                            Kiss Edina
                        </EpistoFont>
                    </Flex>
                </Flex>
                <Tabs
                    value={currentTab}
                    onChange={(_, y) => setCurrentTab(y as number)}
                    className="roundBorders"
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    sx={{
                        '&.MuiTabs-root': {
                            //background: "var(--transparentIntenseBlue85)",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 45,
                            minHeight: 0
                        }
                    }}>

                    {moreInfoDialogTabs
                        .map((x, index) => {

                            return <Tab
                                key={index}
                                sx={{
                                    '&.MuiTab-root': {
                                        color: '#444',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        padding: '6px 16px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '41px',
                                        minHeight: '0px'
                                    },
                                    '&.MuiTouchRipple-root': {
                                        lineHeight: '0px'
                                    },
                                    '&.Mui-selected': {
                                        color: '#444',
                                        fontWeight: 'bold',
                                        background: 'var(--transparentIntenseTeal)'
                                    }
                                }}
                                label={x.title}
                                id={`simple-tab-${index}`} />;
                        })}
                </Tabs>
            </Flex>

            { /* tab contents */}
            {moreInfoDialogTabs
                .map((x, index) => <TabPanel
                    key={index}
                    value={currentTab}
                    index={index}>

                    {x.component}
                </TabPanel>)}
        </Flex>
    </EpistoDialog>;
};