import React from 'react';
import {CircularProgress} from "@material-ui/core";
import classes from "./loadingComponents.module.scss"

export const LoadingComponent = () => <div className={classes.dashBoardStateContainer}>
    <CircularProgress className={classes.loadingCircle} size={50} />
</div>

export const NullComponent = () => <div className={classes.dashBoardStateContainer} />
export const FailedComponent = () => <div className={classes.dashBoardStateContainer}>Az alkalmazás betöltése sikertelen</div>