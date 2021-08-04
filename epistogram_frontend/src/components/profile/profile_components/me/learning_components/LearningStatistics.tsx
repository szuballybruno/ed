import React, {useRef} from 'react';
import classes from './learningStatistics.module.scss'
import LearningStatisticsItem from "./LearningStatisticsItem";
import {Card, Divider, Grid, List, Typography} from "@material-ui/core";
import spentTimeCompareChartData from "../../../../administration/statistics/charts/configurationFiles/spentTimeCompare";
import ReactFusioncharts from "react-fusioncharts";
import {Bar, Line} from "react-chartjs-2";
import {LearningStatisticsSeciton} from "./LearningStatisticsSeciton";

const LearningStatistics = (props: {className?: string}) => {
    const data = {
        labels: ['0:00-3:00','3:00-6:00', '6:00-9:00', '9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-0:00'],
        datasets: [
            {
                label: 'Napok száma amikor ebben az idősávban volt aktivitásom',
                data: [0, 0, 1, 1, 3, 3, 1, 0],
                fill: false,
                backgroundColor: 'rgb(63,178,181)',
                borderColor: 'rgba(13,104,140,0.2)',
                tension: 0.5
            }
        ],
    };
    const data2 = {
        labels: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'],
        datasets: [
            {
                label: 'Belépések száma naponta (átlag)',
                data: [1, 2, 3, 1, 2, 4, 1],
                fill: false,
                backgroundColor: 'rgb(63,178,181)',
                borderColor: 'rgba(13,104,140,0.2)',
                tension: 0.5,

            },{
                label: 'Sessiönök hossza naponta (átlag, óra)',
                data: [0.67, 2.2, 4.23, 1.75, 0.5, 2, 4],
                fill: false,
                backgroundColor: 'rgb(215,33,163)',
                borderColor: 'rgba(139,0,155,0.2)',
                tension: 0.5
            }
        ],
    };
    const options = {
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
    return <div className={`${classes.learningContainer} ${props.className}`}>
        <div className={classes.learningInnerContainer}>
            <List className={classes.learningList}>
                <LearningStatisticsSeciton title={"Időbeosztás"}>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Session átlagos hossza"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely a leghatékonyabb idősáv?"} />
                    <Card className={classes.gridItemChart} >
                        <div className={classes.headerTitle}>
                            <Typography>Mely az általam leginkább preferált idősáv?</Typography>
                        </div>
                        <div className={classes.chartContainer}>
                            <Line className={classes.progressLineChart}
                                  options={options}
                                  type={"line"}
                                  data={data}/>
                        </div>
                    </Card>
                    <Card className={classes.gridItemChart}>
                        <div className={classes.headerTitle}>
                            <Typography>Mely napokon vagyok a legaktívabb?</Typography>
                        </div>
                        <div className={classes.chartContainer}>
                            <Bar className={classes.progressLineChart}
                                 options={options}
                                 type={"bar"}
                                 data={data2}/>
                        </div>
                    </Card>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely az általam leginkább preferált idősáv?"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely napokon vagyok a legaktívabb?"} />
                </LearningStatisticsSeciton>


                <LearningStatisticsSeciton title={"Videók"}>
                    <LearningStatisticsItem value={"13"} suffix={"db"} title={"Megtekintett videók a hónapban"} />
                    <LearningStatisticsItem value={"72"} suffix={"%"} title={"Videónézéssel eltöltött idő a hónapban"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Kurzusok"}>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Elkezdett kurzusok száma"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Több mint két hete inaktív kurzusok száma"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Kurzusok száma, amelyek legalább 50%-ban készen vannak"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Befejezett kurzusok száma"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Vizsgák"}>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Elvégzett vizsgák száma"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Átlagos teljesítmény a vizsgákon"} />
                </LearningStatisticsSeciton>
                <LearningStatisticsSeciton title={"Hatékonyság"}>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Tudás NMI-re adott válaszok"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Megválaszolt kérdések száma"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Fókusz"}>
                    <LearningStatisticsItem suffix={"01"} title={"%"} value={""} />
                </LearningStatisticsSeciton>
            </List>
        </div>
    </div>
    /*return (
        <div className={`${classes.learningContainer} ${props.className}`}>
            <div className={classes.learningInnerContainer}>
                <List className={classes.learningList}>
                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Időbeosztás</Typography>
                    </div>

                    <Divider style={{width: "99%"}} />
                    <div className={classes.flexibleListContainer}>
                        <div className={classes.learningLeftContainer}>
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Session átlagos hossza"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely az általam leginkább preferált idősáv?"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely a leghatékonyabb idősáv?"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely napokon vagyok a legaktívabb?"} />
                        </div>
                        <div className={classes.learningRightContainer}>
                            <div className={classes.headerTitle}>
                                <Typography>Mely az általam leginkább preferált idősáv?</Typography>
                            </div>
                            <div className={classes.chartContainer}>
                                <Line className={classes.progressLineChart}
                                      options={options}
                                      type={"line"}
                                      data={data}/>
                            </div>
                            <div className={classes.headerTitle}>
                                <Typography>Mely napokon vagyok a legaktívabb?</Typography>
                            </div>
                            <div className={classes.chartContainer}>
                                <Bar className={classes.progressLineChart}
                                      options={options}
                                      type={"bar"}
                                      data={data2}/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Videók</Typography>
                    </div>
                    <Divider style={{width: "99%"}} />
                    <div className={classes.flexibleListContainer}>
                        <div className={classes.learningLeftContainer}>
                            <LearningStatisticsItem value={"13"} suffix={"db"} title={"Megtekintett videók a hónapban"} />
                            <LearningStatisticsItem value={"72"} suffix={"%"} title={"Videónézéssel eltöltött idő a hónapban"} />
                        </div>
                    </div>
                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Kurzusok</Typography>
                    </div>
                    <Divider style={{width: "99%"}} />
                    <div className={classes.flexibleListContainer}>
                        <div className={classes.learningLeftContainer}>

                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Elkezdett kurzusok száma"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Több mint két hete inaktív kurzusok száma"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Kurzusok száma, amelyek legalább 50%-ban készen vannak"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Befejezett kurzusok száma"} />
                        </div>
                    </div>
                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Vizsgák</Typography>
                    </div>
                    <Divider style={{width: "99%"}} />
                    <div className={classes.flexibleListContainer}>
                        <div className={classes.learningLeftContainer}>
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Elvégzett vizsgák száma"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Átlagos teljesítmény a vizsgákon"} />
                        </div>
                    </div>
                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Hatékonyság</Typography>
                    </div>
                    <Divider style={{width: "99%"}} />
                    <div className={classes.flexibleListContainer}>
                        <div className={classes.learningLeftContainer}>

                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Tudás NMI-re adott válaszok"} />
                            <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Megválaszolt kérdések száma"} />
                        </div>
                    </div>

                    <div className={classes.learningListHeaderWrapper}>
                        <Typography variant={"overline"}>Fókusz</Typography>
                    </div>
                </List>
            </div>
        </div>
    );*/
};

export default LearningStatistics;
