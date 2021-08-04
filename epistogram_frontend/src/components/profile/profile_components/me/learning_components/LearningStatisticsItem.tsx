import React from 'react';
import classes from "./learningStatisticsItem.module.scss";
import Grid from "@material-ui/core/Grid";
import {Button, Card, Typography} from "@material-ui/core";
import {ExpandMore, Fullscreen, More, MoreSharp} from "@material-ui/icons";

const LearningStatisticsItem = ({iconPath, suffix, title, value}: {
    iconPath?: string
    suffix: string
    title: string
    value: string
}) => {
    return <Card className={classes.itemWrapper} style={{
        gridColumn: `auto / span ${1}`,
        gridRow: `auto / span ${1}`
    }}>
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
        <Button className={classes.expandButton}>
            <Fullscreen />
        </Button>
    </Card>
};

export default LearningStatisticsItem;
