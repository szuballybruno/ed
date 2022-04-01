import React from "react";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { Bar, Doughnut, Line, Pie, Radar } from "react-chartjs-2";
import { getAssetUrl } from "../../../static/frontendHelpers";
import { Flex } from "@chakra-ui/react";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { LearningStatisticsSeciton } from "../../learningInsights/LearningStatisticsSeciton";


const AdminStatistics = () => {
    function getColors(length: number) {
        const pallet = [
            "#7dabe8",
            "#a8c0e7",
            "#478dea",
            "#518fe7",
            "#95baec",
            "#6199e3",
            "#bfcde0",
        ];
        const colors: string[] = [];

        for (let i = 0; i < length; i++) {
            colors.push(pallet[i % pallet.length]);
        }

        return colors;
    }
    const dadata1 = {
        labels: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
        datasets: [
            {
                label: "Múlt hét",
                fill: false,
                backgroundColor: "#067daf",
                borderColor: "#067daf",
                data: [83, 120, 140, 170, 30, 20, 10],
            }, {
                label: "Jelenlegi hét",
                fill: false,
                backgroundColor: "#067daf",
                borderColor: "#067daf",
                data: [95, 110, 165, 142, 70, 30, 90],
            }
        ]
    };

    return (
        <Flex>
            <AdminSubpageHeader direction="column">
                <LearningStatisticsSeciton title={"Leggyakoribb adatok"}>
                    <StatisticsCard suffix={"%"}
value={"95"}
title={"Kurzus teljesítési ráta"}
iconPath={getAssetUrl("company_statistics_icons/course_progress_rate.svg")} />
                    <StatisticsCard suffix={"perc"}
value={"38"}
title={"Átlagosan eltöltött idő/belépés"}
iconPath={getAssetUrl("company_statistics_icons/spent_time_login.svg")} />
                    <StatisticsCard suffix={"óra"}
value={"3,15"}
title={"Átlagos tanulással töltött idő/hét"}
iconPath={getAssetUrl("company_statistics_icons/spent_time_learning_week.svg")} />
                    <StatisticsCard suffix={"%"}
value={"70"}
title={"Belépési arány a héten"}
iconPath={getAssetUrl("company_statistics_icons/login_ratio_week.svg")} />
                    <StatisticsCard suffix={"%"}
value={"54"}
title={"Teljesítés a vizsgákon"}
iconPath={getAssetUrl("company_statistics_icons/exam_progress.svg")} />
                    <StatisticsCard suffix={"%"}
value={"80"}
title={"Átlagos fókusztartás"}
iconPath={getAssetUrl("company_statistics_icons/focus.svg")} />
                    <StatisticsCard suffix={"%"}
value={"3"}
title={"Felejtési görbe javulása"}
iconPath={getAssetUrl("company_statistics_icons/knowledge_graph.svg")} />
                    <StatisticsCard suffix={"pont"}
value={"8.5"}
title={"Munkavállalói feedback"}
iconPath={getAssetUrl("company_statistics_icons/workers_feedback.svg")} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Grafikonok"}>
                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Legaktívabb napok"
                                },
                            },
                            interaction: {
                                mode: "index",
                                intersect: false
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: "A hét napjai"
                                    }
                                },
                                y: {
                                    display: true,
                                    max: 180,
                                    title: {
                                        display: true,
                                        text: "Belépések száma"
                                    }
                                }
                            }
                        }}
data={dadata1} />
                    </StatisticsCard>


                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Pie
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Aktivitás átlagos felosztása"
                                    },
                                },
                            }}
data={{
                                labels: ["Videók megtekintése", "Kérdések megválaszolása", "Vizsgakitöltés", "Nincs tevékenység"],
                                datasets: [
                                    {
                                        label: "Aktivitás átlagos felosztása",
                                        data: [56, 5, 19, 20],
                                        backgroundColor: ["mediumseagreen", "#7de8b2", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"],
                                    }
                                ]
                            }} />
                    </StatisticsCard>


                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Radar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Felhasználók átlagos tanulási stílusa"
                                    },
                                    legend: {
                                        display: false
                                    }
                                },/*
                            scales: {
                                min: 0,
                                max: 7
                            }*/

                            }}
                            data={{
                                labels: [
                                    "Egyedüli",
                                    "Hangos kimondás",
                                    "Elméleti",
                                    "Vizuális alapú",
                                    "Analitikus",
                                    "Szociális",
                                    "Térbeli elhelyezés",
                                    "Gyakorlati",
                                    "Audió alapú",
                                    "Kreatív"
                                ],
                                datasets: [
                                    {
                                        data: [5, 4, 5, 5, 3, 5, 5, 5, 4, 5],
                                        backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                                    }
                                ]
                            }} />
                    </StatisticsCard>


                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Doughnut
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Legnépszerűbb kurzusok"
                                    },
                                },
                            }}
data={{
                                labels: ["Excel", "Word", "Power Point", "B2B Sales Masterclass"],
                                datasets: [
                                    {
                                        label: "Aktivitás átlagos felosztása",
                                        data: [34, 19, 15, 32],
                                        backgroundColor: ["mediumseagreen", "#7de8b2", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"],
                                    }
                                ]
                            }} />
                    </StatisticsCard>

                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Legaktívabb idősávok"
                                },
                                legend: {
                                    display: false
                                }
                            },
                            interaction: {
                                mode: "index",
                                intersect: false
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: false,
                                        text: "A hét napjai"
                                    }
                                },
                                y: {
                                    display: true,
                                    max: 360,
                                    title: {
                                        display: true,
                                        text: "Belépések száma"
                                    }
                                }
                            }
                        }}
data={{
                            labels: ["6:00", "9:00", "12:00", "15:00", "17:00", "19:00", "21:00"],
                            datasets: [
                                {
                                    label: "Múlt hét",
                                    fill: false,
                                    backgroundColor: getColors(7),
                                    borderColor: "#067daf",
                                    data: [95, 185, 290, 240, 70, 210, 30],
                                }
                            ]
                        }} />
                    </StatisticsCard>


                    <StatisticsCard isOpenByDefault
suffix={""}
title={""}
value={""}>
                        <Line options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Kiosztott feladatok megoldása"
                                },
                            },
                            interaction: {
                                mode: "index",
                                intersect: false
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: false,
                                        text: "Month"
                                    }
                                },
                                y: {
                                    display: true,
                                    max: 25,
                                    min: 0,
                                    title: {
                                        display: false,
                                        text: "Value"
                                    }
                                }
                            }
                        }}
data={{
                            labels: ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
                            datasets: [
                                {
                                    label: "Megoldott feladatok száma",
                                    fill: false,
                                    backgroundColor: "#067daf",
                                    borderColor: "#067daf",
                                    //@ts-ignore
                                    lineTension: 0.5,
                                    data: [3, 8, 19, 13, 4, 8, 2],
                                }, {
                                    label: "Elutasított feladatok száma",
                                    fill: false,
                                    backgroundColor: "#d9617d",
                                    borderColor: "#D9617D",
                                    //@ts-ignore
                                    lineTension: 0.5,
                                    data: [1, 5, 8, 3, 3, 4, 7],
                                }, {
                                    label: "Kiosztásra került feladatok száma",
                                    backgroundColor: "#7DE8B2FF",
                                    borderColor: "#7DE8B2FF",
                                    //@ts-ignore
                                    lineTension: 0.5,
                                    data: [5, 22, 8, 2, 14, 1, 0],
                                    fill: false,
                                }, {
                                    label: "Beadott feladatok száma",
                                    backgroundColor: "#E8BD7DFF",
                                    borderColor: "#E8BD7DFF",
                                    //@ts-ignore
                                    lineTension: 0.5,
                                    data: [5, 9, 4, 24, 18, 8, 7],
                                    fill: false,
                                }
                            ]
                        }} /*type={"line"}*/ />
                    </StatisticsCard>

                </LearningStatisticsSeciton>
            </AdminSubpageHeader>
        </Flex>
    );
};

export default AdminStatistics;
