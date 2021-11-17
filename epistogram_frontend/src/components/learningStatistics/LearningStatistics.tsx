import { Flex } from '@chakra-ui/layout';
import { RoundedCornerOutlined } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import { Bar } from "react-chartjs-2";
import { getAssetUrl, roundNumber } from '../../frontendHelpers';
import { useUserStats } from '../../services/userStatsService';
import StatisticsCard from "../statisticsCard/StatisticsCard";
import classes from './learningStatistics.module.scss';
import { LearningStatisticsSeciton } from "./LearningStatisticsSeciton";

// The default options that should be included with chartjs data object

export const chartDefaultDataOptions = {
    fill: false,
    tension: 0.5,
}

// The default color sets for chartjs charts

export const chartColorSets = {
    colorOne: {
        backgroundColor: 'rgb(63,178,181)',
        borderColor: 'rgba(13,104,140,0.2)',
    },
    colorTwo: {
        backgroundColor: 'rgb(215,33,163)',
        borderColor: 'rgba(139,0,155,0.2)',
    }
}

// Labels for current charts

export const labels = {
    timeSections: ['0:00-3:00', '3:00-6:00', '6:00-9:00', '9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-0:00'],
    daysOfTheWeek: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
}

// Two example chart data object

export const daysWithActivityInTime = {
    labels: labels.timeSections,
    datasets: [
        {
            label: 'Napok száma amikor ebben az idősávban volt aktivitásom',
            data: [0, 0, 1, 1, 3, 3, 1, 0],
            ...chartDefaultDataOptions,
            ...chartColorSets.colorOne
        }
    ],
};
export const howActiveIAm = {
    labels: labels.daysOfTheWeek,
    datasets: [
        {
            label: 'Belépések száma naponta (átlag)',
            data: [1, 2, 3, 1, 2, 4, 1],
            ...chartDefaultDataOptions,
            ...chartColorSets.colorOne
        }, {
            label: 'Sessiönök hossza naponta (átlag, óra)',
            data: [0.67, 2.2, 4.23, 1.75, 0.5, 2, 4],
            ...chartDefaultDataOptions,
            ...chartColorSets.colorTwo
        }
    ],
};

// The default configuration option for charts

export const chartDefaultOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            ticks: {
                display: false,
                beginAtZero: true,
            },
        },
    },
};

type StatisticsGroupType = {
    title: string;
    items: StatisticsItemType[];
}

type StatisticsItemType = {
    iconPath: string;
    value: string;
    suffix: string;
    title: string;
    isOpenByDefault: boolean;
    isDummy?: boolean;
    large?: boolean;
    chart?: ReactNode;
}

export const LearningStatistics = () => {

    const { userStats } = useUserStats();

    console.log(userStats);

    const statistics = [
        {
            title: "Időbeosztás",
            items: [
                {
                    value: userStats ? roundNumber(userStats.totalSessionLengthSeconds / 60) : 0,
                    title: "Aktívan töltött idő",
                    suffix: "perc",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/average_session_length.svg")
                },
                {
                    value: userStats ? roundNumber(userStats.averageSessionLengthSeconds / 60) : 0,
                    suffix: "perc",
                    title: "Belépés átlagos hossza",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/average_session_length.svg")
                },
                {
                    value: "12-15",
                    suffix: "óra",
                    title: "Mely az általam leginkább preferált idősáv?",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/most_preferred_time_range.svg"),
                    chart: <Bar
                        className={classes.progressLineChart}
                        options={chartDefaultOptions}
                        data={daysWithActivityInTime} />
                },
                {
                    value: "9-12",
                    suffix: "óra",
                    title: "Mely a leghatékonyabb idősáv?",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/most_productive_time_range.svg")
                },
                {
                    value: "Szerda",
                    suffix: "",
                    title: "Mely nap(ok)on vagyok a legaktívabb?",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/most_productive_days.svg"),
                    chart: <Bar
                        className={classes.progressLineChart}
                        options={chartDefaultOptions}
                        data={howActiveIAm} />
                },
            ]
        },
        {
            title: "Videók",
            items: [
                {
                    value: userStats?.completedVideoCount ?? 0,
                    suffix: "db",
                    title: "Megtekintett videók a hónapban",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/watched_videos.svg"),
                    chart: <Bar
                        className={classes.progressLineChart}
                        options={chartDefaultOptions}
                        data={howActiveIAm} />
                },
                {
                    value: userStats ? roundNumber(userStats.totalVideoPlaybackSeconds / 60 / 60) : 0,
                    suffix: "óra",
                    title: "Videónézéssel eltöltött idő a hónapban",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/total_watching_time.svg"),
                }
            ]
        },
        {
            title: "Kurzusok",
            items: [
                {
                    value: "8",
                    suffix: "db",
                    title: "Elkezdett kurzusok száma",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/started_courses.svg"),
                },
                {
                    value: "1",
                    suffix: "db",
                    title: "Több mint két hete inaktív kurzusok száma",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/inactive_courses.svg"),
                },
                {
                    value: "4",
                    suffix: "db",
                    title: "Kurzusok száma, amelyek legalább 50%-ban készen vannak",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/half_done_courses.svg"),
                },
                {
                    value: "3",
                    suffix: "db",
                    title: "Befejezett kurzusok száma",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/completed_courses.svg"),
                }
            ]
        },
        {
            title: "Vizsgák",
            items: [
                {
                    value: userStats ? userStats.completedExamCount : 0,
                    suffix: "db",
                    title: "Elvégzett vizsgák száma",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/completed_exams.svg"),
                },
                {
                    value: userStats ? userStats.totalAnswerSessionSuccessRate : 0,
                    suffix: "%",
                    title: "Átlagos teljesítmény a vizsgákon",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/average_performance_on_exams.svg"),
                }
            ]
        },
        {
            title: "Hatékonyság",
            items: [
                {
                    value: userStats?.totalGivenAnswerCount ?? 0,
                    suffix: "db",
                    title: "Megválaszolt tudást vizsgáló kérdések száma",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/answered_questions.svg"),
                },
                {
                    value: userStats ? roundNumber(userStats?.totalCorrectAnswerRate) : 0,
                    suffix: "%",
                    title: "Helyes válaszok aránya",
                    isOpenByDefault: false,
                    iconPath: getAssetUrl("statistics_icons/correct_answer_rate.svg"),
                }
            ]
        },
        {
            title: "Fókusz",
            items: [
                {
                    value: "45",
                    suffix: "%",
                    title: "Fókuszálás a videómegtekintések során",
                    isOpenByDefault: true,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/focus_during_videos.svg"),
                    large: true,
                    chart: <Bar
                        className={classes.progressLineChart}
                        options={chartDefaultOptions}
                        data={howActiveIAm} />
                },
                {
                    value: "3.2",
                    suffix: "mp",
                    title: "Reakcióidő fókuszálást vizsgáló kérdésekre",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/reaction_time_still_watching.svg"),
                },
                {
                    value: "9.5",
                    suffix: "mp",
                    title: "Reakcióidő tudást vizsgáló kérdésekre",
                    isOpenByDefault: false,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/reaction_time_question.svg"),
                }
            ]
        },
        {
            title: "EpistoGram",
            items: [
                {
                    value: "13.82",
                    suffix: "db",
                    title: "Mennyi EpistoCoint szereztem az elmúlt hónapban",
                    isOpenByDefault: true,
                    isDummy: true,
                    iconPath: getAssetUrl("statistics_icons/acquired_episto_coin.svg"),
                    chart: <Bar
                        className={classes.progressLineChart}
                        options={chartDefaultOptions}
                        data={howActiveIAm} />
                }
            ]
        }
    ] as StatisticsGroupType[];

    return <Flex direction="column" flex="1">
        {statistics
            .map(statisticSectionData => {

                return <LearningStatisticsSeciton title={statisticSectionData.title}>
                    {statisticSectionData
                        .items
                        .map(item => {

                            return <StatisticsCard
                                title={item.title}
                                value={item.value}
                                suffix={item.suffix}
                                iconPath={item.iconPath}
                                isOpenByDefault={item.isOpenByDefault}
                                isDummy={item.isDummy}
                                chartSize={item.large ? "large" : undefined}>
                                {item.chart}
                            </StatisticsCard>
                        })}
                </LearningStatisticsSeciton>
            })}
    </Flex>
};
