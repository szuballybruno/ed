import React from "react";
import { FormControl, Select, Typography } from "@mui/material";
import { Box, BoxProps } from "@chakra-ui/layout";
import { translatableTexts } from "../../translatableTexts";

const defaultKey = "___default___";

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

    const currentSelectedKey = selectedValue ? getCompareKey(selectedValue) : defaultKey;

    return <Box className="controlPadding simpleBorder roundBorders" {...css} >

        <select
            className="whall"
            onChange={(x) => onSelectedValue(x.target.value)}
            value={currentSelectedKey}
            style={{
                width: "fit-content",
                outline: "none",
                cursor: "pointer"
            }}>

            {!selectedValue && <option value={defaultKey}>
                {defaultValue ?? translatableTexts.misc.selectOption}
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
