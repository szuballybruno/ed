import React from 'react';
import classes from "./statisticsInfoItem.module.scss";
import CountUp from 'react-countup'
import {globalConfig} from "../../../configuration/config";

const StatisticsInfoItem = (props: {
    className?: string
    imageSource?: string
    imageAlt?: string
    titleText: string
    dataNumber?: number
    dataText: string
}) => {
    return (
        <div className={props.className ? props.className : classes.statisticsInfoItemOuterWrapper}>
            <div className={classes.imageWrapper}>
                <img src={props.imageSource || `${globalConfig.assetStorageUrl}/application/croissant.svg`}
                     alt={props.imageAlt || "Statisztika elem"}
                     onError={(e) => {
                        e.currentTarget.src = `${globalConfig.assetStorageUrl}/application/croissant.svg`
                     }} />
            </div>
            <div className={classes.statisticsInfoItemDataWrapper}>
                <div className={classes.titleWrapper}>
                    <span>{props.titleText}</span>
                </div>
                <div className={classes.dataWrapper}>
                    {props.dataNumber && <CountUp end={props.dataNumber} />}
                    <span>{props.dataText}</span>
                </div>
            </div>

        </div>
    );
};

export default StatisticsInfoItem;