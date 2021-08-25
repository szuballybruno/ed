import React from 'react';
import classes from './saveBar.module.scss'
import {Button} from "@material-ui/core";

export const SaveBar = (props: {
    open: boolean
}) => {

    return props.open ? <div className={classes.saveBarOuterWrapper}>
        <Button variant={"outlined"}>Módosítások mentése</Button>
    </div> : null
};