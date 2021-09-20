import React, { useEffect, useState } from 'react';
import classes from "./learningStatisticsItem.module.scss";
import { Button, Card, Typography } from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { FlexFloat } from '../../../../universal/FlexFloat';

const StatisticsCard = (props: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: string
}) => {

    const [isOpen, setIsOpen] = useState(!!props.isOpenByDefault)
    const iconPath = props.iconPath ? props.iconPath : "https://picsum.photos/100/100";

    return <FlexFloat
        style={{
            gridColumn: `auto / span ${isOpen ? (props.chartSize === "large" ? 4 : 2) : 1}`,
            gridRow: `auto / span ${isOpen ? 2 : 1}`,
            transition: "all 2s"
        }}>
        {isOpen ? <div className={classes.chartOuterWrapper}>
            <div className={classes.headerTitle}>
                <Typography>{props.title}</Typography>
            </div>
            <div className={classes.chartContainer}>
                {props.children}
            </div>
            <Button className={classes.expandButton} onClick={() => { setIsOpen(p => !p) }}>
                <FullscreenExit />
            </Button>
        </div> : <div className={classes.dataTileWrapper}>
            <div className={classes.iconWrapper}>
                {iconPath ? <img className={classes.statItemIcon} src={iconPath} alt={""} /> : <div className={classes.fakeIcon} />}
            </div>
            <div className={classes.contentWrapper}>
                <div className={classes.itemTitleWrapper}>
                    <Typography className={classes.itemTitle}>{props.title}</Typography>
                </div>
                <div className={classes.itemDataWrapper}>
                    <div className={classes.itemValueWrapper}>
                        <Typography variant={"h5"}>{props.value}</Typography>
                    </div>
                    <div className={classes.itemIconWrapper}>
                        <Typography>{props.suffix}</Typography>
                    </div>
                </div>
            </div>
            {props.children && <Button className={classes.expandButton} onClick={() => { setIsOpen(p => !p) }}>
                <Fullscreen />
            </Button>}
        </div>}
    </FlexFloat>
};

export default StatisticsCard;


const data = {
    labels: ['0:00-3:00', '3:00-6:00', '6:00-9:00', '9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-0:00'],
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
    maintainAspectRatio: true,
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
