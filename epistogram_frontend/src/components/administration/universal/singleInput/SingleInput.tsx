import React from 'react';
import classes from "./singleInput.module.scss";
import {TextField, Typography} from "@material-ui/core";

const SingleInput = (props: {
    labelText: string,
    name: string,
    style?: object,
    type?: string,
    id?: string,
    changeHandler?: (e: React.ChangeEvent<{ value: string, name: string }>) => void}) => {
    return (
        <div className={classes.dataRow} style={props.style}>
            <div>
                <Typography variant={"overline"}>{props.labelText}</Typography>
            </div>
            <TextField variant={"outlined"}
                       type={props.type}
                       id={props.id}
                       name={props.name}
                       onChange={props.changeHandler}/>
        </div>
    );
};

export default SingleInput;
