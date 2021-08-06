import React from 'react';
import classes from './learningStatistics.module.scss'
import LearningStatisticsItem from "./LearningStatisticsItem";
import {List} from "@material-ui/core";
import {Bar} from "react-chartjs-2";
import {LearningStatisticsSeciton} from "./LearningStatisticsSeciton";

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
    timeSections: ['0:00-3:00','3:00-6:00', '6:00-9:00', '9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-0:00'],
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
        },{
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

const LearningStatistics = (props: {className?: string}) => {


    return <div className={`${classes.learningContainer} ${props.className}`}>
        <div className={classes.learningInnerContainer}>
            <List className={classes.learningList}>
                <LearningStatisticsSeciton title={"Időbeosztás"}>
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Session átlagos hossza"} />
                    <LearningStatisticsItem value={"32"} suffix={"óra"} title={"Mely a leghatékonyabb idősáv?"} />
                    <LearningStatisticsItem value={"12-15"} suffix={"óra"} title={"Mely az általam leginkább preferált idősáv?"}>
                        <Bar className={classes.progressLineChart}
                              options={chartDefaultOptions}
                              type={"bar"}
                              data={daysWithActivityInTime}/>
                    </LearningStatisticsItem>
                    <LearningStatisticsItem suffix={""} title={"Mely nap(ok)on vagyok a legaktívabb?"} value={"Szerda"} chartSize={"large"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             type={"bar"}
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
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
};

export default LearningStatistics;
