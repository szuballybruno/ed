import React from 'react';
import classes from "./learningStatisticsItem.module.scss";
import Grid from "@material-ui/core/Grid";
import {Button, Card, Typography} from "@material-ui/core";
import {ExpandMore, Fullscreen, More, MoreSharp} from "@material-ui/icons";
import {useState} from "@hookstate/core";
import {Line} from "react-chartjs-2";

const LearningStatisticsItem = ({iconPath, suffix, title, value}: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    hasChart?: boolean
}) => {
    const open = useState(false)

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


    return <Card className={classes.itemWrapper} style={{
        gridColumn: `auto / span ${open.get() ? 2 : 1}`,
        gridRow: `auto / span ${open.get() ? 2 : 1}`
    }}>
        {open.get() ? <div>
            <div className={classes.headerTitle}>
                <Typography>Mely az általam leginkább preferált idősáv?</Typography>
            </div>
            <div className={classes.chartContainer}>
                <Line className={classes.progressLineChart}
                      options={options}
                      type={"line"}
                      data={data}/>
            </div>
            <Button className={classes.expandButton} onClick={() => {open.set(p => !p)}}>
                <Fullscreen />
            </Button>
        </div> : <div>
            <div className={classes.iconWrapper}>
                <div className={classes.fakeIcon} />
            </div>
            <div className={classes.contentWrapper}>
                <div className={classes.itemTitleWrapper}>
                    <Typography className={classes.itemTitle}>{title}</Typography>
                </div>
                <div className={classes.itemDataWrapper}>
                    <div className={classes.itemValueWrapper}>
                        <Typography>{value}</Typography>
                    </div>
                    <div className={classes.itemIconWrapper}>
                        {iconPath ? <img alt={""} src={iconPath} /> : null}
                        <Typography>{suffix}</Typography>
                    </div>
                </div>
            </div>
            <Button className={classes.expandButton} onClick={() => {open.set(p => !p)}}>
                <Fullscreen />
            </Button>
        </div>}


    </Card>
};

export default LearningStatisticsItem;
