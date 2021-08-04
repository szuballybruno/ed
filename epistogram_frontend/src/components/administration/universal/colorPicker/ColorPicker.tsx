import {HexColorPicker} from "react-colorful";
import React from "react";
import classes from "./colorPicker.module.scss"
import {Typography} from "@material-ui/core";

export const ColorPicker = (props: {
    title: string
    currentColor: string,
    onChange: (color: string) => void
}) => <div className={classes.tagWrapper}>
    <Typography variant={"overline"}>{props.title}</Typography>
    <HexColorPicker style={{width: "100%"}} color={props.currentColor} onChange={props.onChange} />
</div>