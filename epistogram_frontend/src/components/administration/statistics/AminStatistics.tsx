import React from 'react';
import classes from "./statistics.module.scss"
import { LearningStatisticsSeciton } from "../../profile/profile_components/me/learning_components/LearningStatisticsSeciton";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";


const AminStatistics = () => {

    const data = {
        labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
        datasets: [
            {
                label: 'Unfilled',
                fill: false,
                backgroundColor: "#067daf",
                borderColor: "#067daf",
                data: [57, 26, 31, -42, 34],
            }, {
                label: 'Dashed',
                fill: false,
                backgroundColor: "#d9617d",
                borderColor: "#D9617DFF",
                borderDash: [5, 5],
                data: [5, -59, 72, 32, -19, 23],
            }, {
                label: 'Filled',
                backgroundColor: "#7DE8B2FF",
                borderColor: "#7DE8B2FF",
                data: [12, 93, -58, 42, -89, 24],
                fill: true,
            }
        ]
    };

    const data2 = {
        labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
        datasets: [
            {
                label: 'Unfilled',
                fill: false,
                backgroundColor: "#067daf",
                borderColor: "#067daf",
                data: [57, 26, 31, -42, 34],
            }, {
                label: 'Dashed',
                fill: false,
                backgroundColor: "#d9617d",
                borderColor: "#D9617DFF",
                borderDash: [5, 5],
                data: [5, -59, 72, 32, -19, 23],
                type: 'line'
            }
        ]
    };


    const data3 = [];
    const data4 = [];
    let prev = 100;
    let prev2 = 80;
    for (let i = 0; i < 1000; i++) {
        prev += 5 - Math.random() * 10;
        // @ts-ignore
        data3.push({ x: i, y: prev });
        prev2 += 5 - Math.random() * 10;
        // @ts-ignore
        data4.push({ x: i, y: prev2 });
    }

    const data5 = {
        labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
        datasets: [
            {
                label: 'Unfilled',
                backgroundColor: "#067daf",
                borderColor: "#067daf",
                data: data3,
                radius: 0
            }, {
                label: 'Dashed',
                backgroundColor: "#d9617d",
                borderColor: "#D9617DFF",
                borderDash: [5, 5],
                radius: 0,
                data: data4,
            }
        ]
    };


    const config = {
        type: 'line',
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        },
    };
    return (
        <div className={classes.statisticsOuterWrapper}>
            <div className={classes.statisticsInfoOuterContainer}>
                <LearningStatisticsSeciton title={"Leggyakoribb adatok"}>
                    <StatisticsCard suffix={"%"} value={"95"} title={"Kurzus teljesítési ráta"} />
                    <StatisticsCard suffix={"perc"} value={"38"} title={"Átlagosan eltöltött idő/belépés"} />
                    <StatisticsCard suffix={"óra"} value={"3,15"} title={"Átlagos tanulással töltött idő/hét"} />
                    <StatisticsCard suffix={"%"} value={"70"} title={"Belépési arány a héten"} />
                    <StatisticsCard suffix={"%"} value={"54"} title={"Teljesítés a vizsgákon"} />
                    <StatisticsCard suffix={"%"} value={"80"} title={"Átlagos fókusztartás"} />
                    <StatisticsCard suffix={"%"} value={"3"} title={"Felejtési görbe javulása"} />
                    <StatisticsCard suffix={"pont"} value={"8.5"} title={"Munkavállalói feedback"} />
                </LearningStatisticsSeciton>
            </div>
            <div className={classes.statisticsInfoOuterContainer}>
                <LearningStatisticsSeciton title={"Grafikonok"}>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Line options={config} data={data} /*type={"line"}*/ />
                    </StatisticsCard>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Bar /*type={"bar"}*/ data={data2} />
                    </StatisticsCard>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Line options={{
                            interaction: {
                                intersect: false
                            },
                            plugins: {
                                legend: false
                            },
                            scales: {
                                x: {
                                    type: 'linear'
                                }
                            }
                        }} data={data5} /*type={"line"}*/ />
                    </StatisticsCard>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Pie options={{ responsive: true, maintainAspectRatio: false }} /*type={"pie"}*/ data={{
                            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                            datasets: [
                                {
                                    label: 'Dataset 1',
                                    data: [5, 9, 13, 2, 6, 8],
                                    backgroundColor: ["mediumseagreen", "#7de8b2", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"],
                                }
                            ]
                        }} />
                    </StatisticsCard>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Scatter options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Chart.js Scatter Chart'
                                }
                            }
                        }} /*type={"scatter"}*/ data={{
                            labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
                            datasets: [
                                {
                                    label: 'Unfilled',
                                    backgroundColor: "#067daf",
                                    borderColor: "#067daf",
                                    data: [
                                        { x: 57, y: 32 },
                                        { x: 26, y: 31 },
                                        { x: -42, y: 34 },
                                        { x: 19, y: 28 },
                                        { x: 77, y: 40 }
                                    ],
                                }, {
                                    label: 'Dashed',
                                    backgroundColor: "#d9617d",
                                    borderColor: "#D9617DFF",
                                    data: [
                                        { y: 77, x: 40 },
                                        { y: 26, x: 31 },
                                        { y: -42, x: 34 },
                                        { x: 57, y: 32 },
                                        { x: 19, y: 28 },
                                    ],
                                }
                            ]
                        }} />
                    </StatisticsCard>
                    <StatisticsCard isOpenByDefault suffix={""} title={""} value={""}>
                        <Bar options={{
                            indexAxis: 'y',
                            // Elements options apply to all of the options unless overridden in a dataset
                            // In this case, we are setting the border of each horizontal bar to be 2px wide
                            elements: {
                                bar: {
                                    borderWidth: 2,
                                }
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'right',
                                },
                                title: {
                                    display: true,
                                    text: 'Chart.js Horizontal Bar Chart'
                                }
                            }
                        }} /*type={"bar"}*/ data={{
                            labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
                            datasets: [
                                {
                                    label: 'Unfilled',
                                    fill: false,
                                    backgroundColor: "#067daf",
                                    borderColor: "#067daf",
                                    data: [57, 26, 31, -42, 34],
                                }, {
                                    label: 'Dashed',
                                    fill: false,
                                    backgroundColor: "#d9617d",
                                    borderColor: "#D9617DFF",
                                    borderDash: [5, 5],
                                    data: [5, -59, 72, 32, -19, 23],
                                }
                            ]
                        }} />
                    </StatisticsCard>
                </LearningStatisticsSeciton>
            </div>
        </div>
    );
};

export default AminStatistics;
