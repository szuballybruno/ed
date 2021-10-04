import React from "react";
import { FormControl, Select, Typography } from "@mui/material";

export const EpistoSelect = <T,>(props: {
    items: T[],
    selectedValue: T,
    onSelected: (value: T) => void,
    getCompareKey: (item: T) => string,
    getDisplayValue?: (item: T) => string,
    defaultValue?: string
}) => {

    const {
        items,
        getCompareKey,
        selectedValue,
        onSelected,
        getDisplayValue,
        defaultValue
    } = props;

    const onSelectedValue = (key: string) => {

        const currentItem = items.filter(x => getCompareKey(x) === key)[0];

        onSelected(currentItem);
    }

    const currentSelectedKey = getCompareKey(selectedValue);
    // , border: "1px solid var(--mildGrey)"    
    return <FormControl variant={"outlined"} size={"small"} style={{ border: "none" }}>
        <Select
            native
            onChange={(x) => onSelectedValue(x.target.value)}
            value={currentSelectedKey}
            style={{ height: "43px" }}>

            {selectedValue && <option value={""}>
                {defaultValue}
            </option>}

            {items
                .map((item) => {

                    return <option
                        value={getCompareKey(item)}>
                        {getDisplayValue
                            ? getDisplayValue(item)
                            : "" + item}
                    </option>
                })}
        </Select>
    </FormControl>
};
