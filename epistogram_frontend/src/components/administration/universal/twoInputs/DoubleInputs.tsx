import React from 'react';
import classes from "./doubleInputs.module.scss";
import { TextField, Typography } from "@mui/material";

const DoubleInputs = (props: {
    firstLabelText: string,
    secondLabelText: string,
    firstLabelName: string,
    secondLabelName: string,
    changeHandler: (e: React.ChangeEvent<{ value: string, name: string }>) => void
}) => {
    return (
        <div className={classes.namesRow}>
            <div className={classes.halfDataRow}>
                <div className={classes.halfDataRowLabelWrapper}>
                    <Typography variant={"overline"}>{props.firstLabelText}</Typography>
                </div>
                <div className={classes.halfDataRowLabelWrapper}>
                    <Typography variant={"overline"}>{props.secondLabelText}</Typography>
                </div>

            </div>
            <div className={classes.halfDataRow}>
                <div className={classes.halfDataRowInputWrapper}>
                    <TextField variant={"outlined"} name={props.firstLabelName} className={classes.lastNameColumn} onChange={props.changeHandler} />
                </div>
                <div className={classes.halfDataRowInputWrapper}>
                    <TextField variant={"outlined"} name={props.secondLabelName} className={classes.firstNameColumn} onChange={props.changeHandler} />
                </div>
            </div>
        </div>
    );
};

export default DoubleInputs;
