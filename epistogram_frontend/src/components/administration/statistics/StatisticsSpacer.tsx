import React from 'react';
import classes from './statisticsSpacer.module.scss'

const StatisticsSpacer = (props: {titles: {
        text: string,
        width: number
    }[]}) => {
    return (
        <div className={classes.spacerWrapper}>
            {props.titles.map((title, index) => {
                return <div className={classes.spacerTitle}
                            style={{
                                width: `${title.width}%`
                            }}
                            key={index}>
                    <h1>{title.text}</h1>
                </div>
            })}
        </div>
    );
};

export default StatisticsSpacer;