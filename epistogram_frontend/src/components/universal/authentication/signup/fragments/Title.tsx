import classes from "./title.module.scss";
import {Typography} from "@material-ui/core";
import React from "react";

export const Title = (props: {text: string}) => <div className={classes.questionWrapper}>
    <Typography variant={"h5"}>
        {props.text}
    </Typography>
</div>