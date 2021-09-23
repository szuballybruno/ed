import React from "react";
import classes from "./selectFromArray.module.scss";
import { FormControl, Select, Typography } from "@mui/material";

export type OptionType<T> = {
    optionValue: T,
    optionText: string
};

const SelectFromArray = <T,>(props: {
    labelText: string,
    name: string,
    selectedValue: T,
    items: OptionType<T>[]
    onSelected: (value: T) => void,
    getCompareKey: (item: T) => string
}) => {

    const { items, name, labelText, getCompareKey, selectedValue: selectedItem, onSelected } = props;

    const onSelectedValue = (key: string) => {

        const currentItem = items.filter(x => getCompareKey(x.optionValue) === key)[0];

        onSelected(currentItem.optionValue);
    }

    const currentSelectedKey = getCompareKey(selectedItem);

    return <div className={classes.dataRow}>
        <div>
            <Typography variant={"overline"}>{labelText}</Typography>
        </div>
        <FormControl variant={"outlined"} className={classes.formControl} size={"small"}>
            <Select
                native
                name={name}
                onChange={(x) => onSelectedValue(x.target.value)}
                value={currentSelectedKey}>

                {selectedItem && <option value={""}>Kérem válasszon...</option>}

                {items
                    .map((item) => {

                        return <option
                            value={getCompareKey(item.optionValue)}>
                            {item.optionText}
                        </option>
                    })}
            </Select>
        </FormControl>
    </div>
};

export default SelectFromArray;
