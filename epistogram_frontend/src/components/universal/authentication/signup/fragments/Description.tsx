import classes from "./description.module.scss";
import {Typography} from "@material-ui/core";
import React from "react";

export const Description = (props: {text?: string}) => <div className={classes.descriptionWrapper}>
    <Typography>
        {props.text}
    </Typography>
</div>