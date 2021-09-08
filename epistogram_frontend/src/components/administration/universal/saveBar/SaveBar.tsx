import React from 'react';
import classes from './saveBar.module.scss'
import {Fab} from "@material-ui/core";
import {Add, Done, Edit} from "@material-ui/icons";

export const SaveBar = (props: {
    open: boolean
    onClick: () => void
    onDoneClick?: () => void
}) => {

    return props.open ? <div className={classes.saveBarOuterWrapper}>
        <Fab>
            <Done onClick={props.onDoneClick} />
        </Fab>
    </div> : <div className={classes.saveBarOuterWrapper}>
        <Fab>
            <Edit onClick={props.onClick} />
        </Fab>

        <Fab>
            <Add />
        </Fab>
    </div>
};