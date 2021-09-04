import React from 'react';
import classes from './learningStatistics.module.scss'
import LearningStatisticsItem from "./LearningStatisticsItem";
import {List} from "@material-ui/core";
import {Bar} from "react-chartjs-2";
import {LearningStatisticsSeciton} from "./LearningStatisticsSeciton";
import {globalConfig} from "../../../../../configuration/config";

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

// TODO: Create a map function by local history to awoid code duplication

const LearningStatistics = (props: {className?: string}) => {
    return <div className={`${classes.learningContainer} ${props.className}`}>
        <div className={classes.learningInnerContainer}>
            <List className={classes.learningList}>
                <LearningStatisticsSeciton title={"Időbeosztás"}>
                    <LearningStatisticsItem iconPath={globalConfig.assetStorageUrl + "/application/stats/1.session.png"} value={"32"} suffix={"perc"} title={"Session átlagos hossza"} />
                    <LearningStatisticsItem iconPath={globalConfig.assetStorageUrl + "/application/stats/2.preferaltidosav.png"} value={"12-15"} suffix={"óra"} title={"Mely az általam leginkább preferált idősáv?"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={daysWithActivityInTime}/>
                    </LearningStatisticsItem>
                    <LearningStatisticsItem iconPath={globalConfig.assetStorageUrl + "/application/stats/3.leghatekonyabbidosav.png"} value={"9-12"} suffix={"óra"} title={"Mely a leghatékonyabb idősáv?"} />
                    <LearningStatisticsItem iconPath={globalConfig.assetStorageUrl + "/application/stats/4.melynapok.png"} value={"Szerda"} suffix={""} title={"Mely nap(ok)on vagyok a legaktívabb?"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
                </LearningStatisticsSeciton>


                <LearningStatisticsSeciton title={"Videók"}>
                    <LearningStatisticsItem value={"13"} suffix={"db"} title={"Megtekintett videók a hónapban"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
                    <LearningStatisticsItem value={"18.5"} suffix={"óra"} title={"Videónézéssel eltöltött idő a hónapban"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Kurzusok"}>
                    <LearningStatisticsItem value={"8"} suffix={"db"} title={"Elkezdett kurzusok száma"} />
                    <LearningStatisticsItem value={"1"} suffix={"db"} title={"Több mint két hete inaktív kurzusok száma"} />
                    <LearningStatisticsItem value={"4"} suffix={"db"} title={"Kurzusok száma, amelyek legalább 50%-ban készen vannak"} />
                    <LearningStatisticsItem value={"3"} suffix={"db"} title={"Befejezett kurzusok száma"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Vizsgák"}>
                    <LearningStatisticsItem value={"2"} suffix={"db"} title={"Elvégzett vizsgák száma"} />
                    <LearningStatisticsItem value={"75"} suffix={"%"} title={"Átlagos teljesítmény a vizsgákon"} />
                </LearningStatisticsSeciton>
                <LearningStatisticsSeciton title={"Hatékonyság"}>
                    <LearningStatisticsItem value={"17"} suffix={"db"} title={"Megválaszolt tudást vizsgáló kérdések száma"} />
                    <LearningStatisticsItem value={"62"} suffix={"%"} title={"Helyes válaszok aránya"} />
                </LearningStatisticsSeciton>

                <LearningStatisticsSeciton title={"Fókusz"}>
                    <LearningStatisticsItem value={"45"} suffix={"%"} title={"Fókuszálás a videómegtekintések során"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
                    <LearningStatisticsItem value={"3.2"} suffix={"mp"} title={"Reakcióidő fókuszálást vizsgáló kérdésekre"}  />
                    <LearningStatisticsItem value={"9.5"} suffix={"mp"} title={"Reakcióidő tudást vizsgáló kérdésekre"}  />
                </LearningStatisticsSeciton>
                <LearningStatisticsSeciton title={"Feladatok"}>
                    <LearningStatisticsItem value={"8"} suffix={"db"} title={"Elvégzett feladatok"}  />
                    <LearningStatisticsItem value={"12"} suffix={"db"} title={"Fogadott feladatok"}  />
                    <LearningStatisticsItem value={"0"} suffix={"db"} title={"Megszakított feladatok"}  />
                </LearningStatisticsSeciton>
                <LearningStatisticsSeciton title={"EpistoGram"}>
                    <LearningStatisticsItem value={"13.82"} suffix={"db"} title={"Mennyi EpistoCoint szereztem az elmúlt hónapban"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
                </LearningStatisticsSeciton>
                <LearningStatisticsSeciton title={"Szorgalom"}>
                    <LearningStatisticsItem value={"0"} suffix={"%"} title={"Határidők betartása"} chartSize={"large"}>
                        <Bar className={classes.progressLineChart}
                             options={chartDefaultOptions}
                             /*type={"bar"}*/
                             data={howActiveIAm}/>
                    </LearningStatisticsItem>
                </LearningStatisticsSeciton>
            </List>
        </div>
    </div>
};

export default LearningStatistics;
