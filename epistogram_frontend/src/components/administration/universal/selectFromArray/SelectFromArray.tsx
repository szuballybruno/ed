import React from "react";
import classes from "./selectFromArray.module.scss";
import {FormControl, Select, Typography} from "@material-ui/core";

const SelectFromArray = (props: {
    labelText: string,
    name: string,
    value: string,
    showNull?: boolean,
    optionValues: {
        optionValue: string,
        optionText: string
    }[]
    changeHandler?: (e: React.ChangeEvent<{ value: unknown, name?: string }>) => void
}) => {
    return <div className={classes.dataRow}>
        <div>
            <Typography variant={"overline"}>{props.labelText}</Typography>
        </div>
        <FormControl variant={"outlined"} className={classes.formControl} size={"small"}>
            <Select native
                    name={props.name}
                    onChange={props.changeHandler}
                    value={props.value}>
                {props.showNull ? <option value={""}>Kérem válasszon...</option> : null}
                {
                    props.optionValues.map((option) => {
                        return <option value={option.optionValue}>{option.optionText}</option>
                    })
                }
            </Select>
        </FormControl>
    </div>
};

export default SelectFromArray;
