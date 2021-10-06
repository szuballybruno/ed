import React from "react";
import { FormControl, Select, Typography } from "@mui/material";
import { Box, BoxProps } from "@chakra-ui/layout";

export const EpistoSelect = <T,>(props: {
    items: T[],
    selectedValue: T,
    onSelected: (value: T) => void,
    getCompareKey: (item: T) => string,
    getDisplayValue?: (item: T) => string,
    defaultValue?: string
} & BoxProps) => {

    const {
        items,
        getCompareKey,
        selectedValue,
        onSelected,
        getDisplayValue,
        defaultValue,
        ...css
    } = props;

    const onSelectedValue = (key: string) => {

        const currentItem = items.filter(x => getCompareKey(x) === key)[0];

        onSelected(currentItem);
    }

    const currentSelectedKey = getCompareKey(selectedValue);

    return <Box className="controlPadding simpleBorder roundBorders" {...css} >

        <select
            className="whall"
            onChange={(x) => onSelectedValue(x.target.value)}
            value={currentSelectedKey}
            style={{
                outline: "none",
                cursor: "pointer"
            }}>

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
        </select>
    </Box>
};
