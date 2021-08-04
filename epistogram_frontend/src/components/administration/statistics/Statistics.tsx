import React from 'react';
import classes from "./statistics.module.scss"
import "./chartsCustom.scss"
import AdminDashboardHeader from "../universal/adminDashboardHeader/AdminDashboardHeader";
import StatisticsInfoItem from "./StatisticsInfoItem";
import StatisticsSpacer from "./StatisticsSpacer";

import activityTypeChartData from "../statistics/charts/configurationFiles/activityType"
import spentTimeCompareChartData from "../statistics/charts/configurationFiles/spentTimeCompare"
import voteResultChartData from "../statistics/charts/configurationFiles/voteResult"
import a from "../statistics/charts/configurationFiles/a"

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import {config} from "../../../configuration/config";

// Resolves charts dependancy
charts(FusionCharts);

const Statistics = () => {
    return (
        <div className={classes.statisticsOuterWrapper}>
            <AdminDashboardHeader titleText={"Adatok"} />
            <div className={classes.statisticsInfoOuterContainer}>
                <div className={classes.statisticsInfoInnerContainer}>
                    <div className={classes.statisticsInfoContainer}>
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/aktivfelhasznalok.svg`} titleText={"Aktív felhasználók"} dataNumber={319} dataText={""} />
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/atlagosaneltoltottido.svg`} titleText={"Átlagosan eltöltött idő"} dataNumber={79} dataText={" perc"} />
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/legnepszerubbidosav.svg`} titleText={"Legnépszerűbb idősáv"} dataText={"18:00 - 20:00"} />
                    </div>
                    <div className={classes.statisticsInfoContainer}>
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/oldalakpermunkamenet.svg`} titleText={"Oldalak/munkamenet "} dataNumber={3.12} dataText={""} />
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/tesztekertekelese.svg`} titleText={"Tesztek értékelése"} dataNumber={92} dataText={"%"} />
                        <StatisticsInfoItem imageSource={`${config.assetStorageUrl}/application/hetiatlagosbelepesekszama.svg`} titleText={"Heti átlagos belépések száma"} dataNumber={4.16} dataText={""} />
                    </div>
                </div>
            </div>
            <div className={classes.dateSelectorRow}>
                <div className={classes.dateSelectorInnerWrapper}>
                    <div className={classes.exportWrapper}>
                        <a style={{textDecoration: "none"}} href={"https://cdn.discordapp.com/attachments/746265082639417447/749569210811678720/Riport-Kiss-Amalia-compressed.pdf"} target={"_blank"} rel="noopener noreferrer">
                            <button>Adatok exportálása</button>
                        </a>
                    </div>
                    <div className={classes.dateSelectorWrapper}>
                        <button>2020.08.25. - 2020.09.01</button>
                    </div>
                </div>
            </div>
            <StatisticsSpacer titles={[
                {
                    text: "Aktivitás típusa",
                    width: 50
                },
                {
                    text: "Eltöltött idő az előző 7 naphoz képest",
                    width: 50
                }
            ]} />
            <div className={classes.chartsRow}>
                <div className={classes.activityPieChartWrapper}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts type="doughnut2d" width='100%' height='380' dataFormat="JSON" dataSource={activityTypeChartData} containerBackgroundOpacity={"0"} containerClassName={classes.activityPieChartWrapper}/>
                </div>
                <div className={classes.activityPieChartWrapper}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts
                        type='stackedarea2d'
                        renderAt='chart-container'
                        width='100%'
                        height='380'
                        dataFormat='json'
                        dataSource={spentTimeCompareChartData}
                        containerBackgroundOpacity={"0"}
                    />
                </div>
            </div>
            <StatisticsSpacer titles={[
                {
                    text: "Tanulási hatékonyság",
                    width: 63
                },
                {
                    text: "Szavazás állása",
                    width: 36
                }
            ]} />
            <div className={classes.chartsRow}>
                <div className={classes.activityPieChartWrapper} style={{
                    width: "63%"
                }}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts type='msline' renderAt='chart-container' width='100%' height='380' dataFormat='json' dataSource={a} containerBackgroundOpacity={"0"} />
                </div>
                <div className={classes.activityPieChartWrapper}  style={{
                    width: "36%",
                    minWidth: "unset"
                }}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts {...voteResultChartData} containerBackgroundOpacity={"0"}/>
                </div>
            </div>

            <StatisticsSpacer titles={[
                {
                    text: "Belépési időszakok",
                    width: 50
                },
                {
                    text: "EpistoMate használata",
                    width: 50
                }
            ]} />

            <div className={classes.chartsRow}>
                <div className={classes.activityPieChartWrapper}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts type='bar2d' renderAt='chart-container' width='100%' height='380' dataFormat='json' dataSource={activityTypeChartData} containerBackgroundOpacity={"0"} />
                </div>
                <div className={classes.activityPieChartWrapper} style={{
                    width: "50%"
                }}>
                    <div className={classes.freeFusionCharts} />
                    <ReactFusioncharts type='mscombidy2d' renderAt='chart-container' width='100%' height='380' dataFormat='json' dataSource={spentTimeCompareChartData} containerBackgroundOpacity={"0"} />
                </div>
            </div>

        </div>
    );
};

export default Statistics;
