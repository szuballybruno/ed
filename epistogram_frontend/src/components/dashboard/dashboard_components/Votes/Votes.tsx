import React, {useEffect} from 'react';
import classes from "./votes.module.scss";
import {useState} from "@hookstate/core";
import instance from "../../../../services/axiosInstance";
import userSideState from "../../../../store/user/userSideState";

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Pie2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import {config} from "../../../../configuration/config";
import {Paper} from "@material-ui/core";


const Votes = () => {
    const selectedVoteWindow = useState(1);
    const user = useState(userSideState);

    ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme);


    const chartData = [
        {
            label: "Okosotthon",
            value: `${user.vote.voteFirstAnswerCount.get() || 23}`
        },
        {
            label: "Kommunikáció",
            value: `${user.vote.voteSecondAnswerCount.get() || 64}`
        }
    ];

    const chartConfigs = {
        type: "pie2d", // The chart type
        width: "100%", // Width of the chart
        height: "500", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                //Set the chart caption
                //caption: "Countries With Most Oil Reserves [2017-18]",
                //Set the chart subcaption
                //subCaption: "In MMbbl = One Million barrels",
                //Set the x-axis name
                xAxisName: "Country",
                //Set the y-axis name
                yAxisName: "Reserves (MMbbl)",
                numberSuffix: "K",
                //Set the theme for your chart
                theme: "fusion",
                bgColor: "e2e2e2",
                valueFontColor: "#333",
                legendItemFontColor: "#333"
            },
            // Chart Data
            data: chartData
        }
    };


    const fetchData = () => {
        /*instance.get("/votes/getvote?_id=" + localStorage.getItem("userId")).then((res) => {
            if (!res.status) {
                return selectedVoteWindow.set(2);

            } else {
                if (res.data.responseText === "Még nem szavaztál") {
                    user.vote.set(res.data)
                    return selectedVoteWindow.set(1);
                } else if (res.data.responseText === "Már szavaztál") {
                    user.vote.set(res.data);
                    return selectedVoteWindow.set(1);
                } else {
                    return selectedVoteWindow.set(2);
                }
            }
        }).catch((err) => {
            return console.log("Ez az err: " + err)
        })*/
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateVote = (e: React.MouseEvent<HTMLImageElement>) => {
        instance.get(`/votes/updatevote?voteId=${user.vote._id.get()}&voteValue=${e.currentTarget.alt}&userId=${localStorage.getItem("userId")}`).then(() => {
            fetchData()
        })
    }
    console.log(selectedVoteWindow.get())


    const selectVoteWindow = () => {
        switch (selectedVoteWindow.get()) {
            case 0:
                return <div className={classes.courseSelectorInnerWrapper}>
                    <div className={classes.courseSelectorHeader}>
                        <h1>{user.vote.voteQuestion.get()}</h1>
                    </div>
                    <div className={classes.courseSelectorButtonsWrapper}>
                        <div>
                            <img src={user.vote.voteFirstAnswerPath.get()}
                                 onClick={(e: React.MouseEvent<HTMLImageElement>) => updateVote(e)}
                                 key={"voteFirstAnswerCount"}
                                 alt={user.vote.voteFirstAnswerName.get()}
                                 onError={() => {selectedVoteWindow.set(2)}} />
                        </div>
                        <div>
                            <img src={user.vote.voteSecondAnswerPath.get()}
                                 onClick={(e) => updateVote(e)}
                                 key={"voteSecondAnswerCount"}
                                 alt={user.vote.voteSecondAnswerName.get()}
                                 onError={() => {selectedVoteWindow.set(2)}} />
                        </div>
                    </div>
                </div>;
            case 1:
                return <Paper className={classes.voteStatsWrapper}>
                    <div className={classes.writtenStatsWrapper}>
                        <div className={classes.statsTitleWrapper}>
                            <h1>Eredmények</h1>
                        </div>
                        <div className={classes.writtenStatsInnerWrapper}>
                            <div className={classes.voteQuestionWrapper}>
                                <div className={classes.statItemWrapper}>
                                    <span>A szavazás kérdése</span>
                                    <span>{user.vote.voteQuestion.get()}</span>
                                </div>
                                <div className={classes.statItemWrapper}>
                                    <span>Résztvevők száma</span>
                                    <span>{user.vote.voteAnswersCount.get()}</span>
                                </div>
                                <div className={classes.statItemWrapper}>
                                    <span>A következő szavazás időpontja</span>
                                    <span>2021. 04. 20.</span>
                                </div>
                            </div>
                            <div className={classes.voteImagesWrapper}>
                                <div className={classes.voteImagesInnerWrapper}>
                                    <img alt={""} className={classes.voteImage} src={config.assetStorageUrl + user.vote.voteFirstAnswerPath.get()} />
                                    <img alt={""} className={classes.voteImage} src={config.assetStorageUrl + user.vote.voteSecondAnswerPath.get()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.chartWrapper}>
                        <div className={classes.freeFusionCharts} />
                        <ReactFC {...chartConfigs} />
                    </div>
                </Paper>

            default:
                return <div className={classes.courseSelectorInnerWrapper}>
                    <div className={classes.courseSelectorHeader}>
                        <h1>Jelenleg nem érhető el egyetlen szavazás sem.</h1>
                    </div>
                </div>;
        }
    };

    return (
        <div className={classes.secondRowCourseSelectorContainer}>
            {selectVoteWindow()}
        </div>
    );
};

export default Votes;
