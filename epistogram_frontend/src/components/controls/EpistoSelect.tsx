import { Box, BoxProps } from "@chakra-ui/layout";
import React from "react";
import { translatableTexts } from "../../static/translatableTexts";

const defaultKey = "___default___";

export const EpistoSelect = <T,>(props: {
    items: T[],
    selectedValue?: T,
    currentKey?: string,
    onSelected: (value: T) => void,
    getCompareKey: (item: T) => string,
    getDisplayValue?: (item: T) => string,
    defaultValue?: string,
    isDisabled?: boolean,
} & BoxProps) => {

    const {
        items,
        getCompareKey,
        selectedValue,
        currentKey,
        onSelected,
        getDisplayValue,
        defaultValue,
        isDisabled,
        ...css
    } = props;

    const onSelectedValue = (key: string) => {

        const currentItem = items.filter(x => getCompareKey(x) === key)[0];

        onSelected(currentItem);
    }

    const isSelectedSomething = selectedValue || currentKey;

    const currentSelectedKey = isSelectedSomething
        ? selectedValue
            ? getCompareKey(selectedValue)
            : currentKey
        : defaultKey;

    return <select
        className="whall roundBorders"
        onChange={(x) => onSelectedValue(x.target.value)}
        value={currentSelectedKey}
        disabled={isDisabled}
        style={{
            background: "transparent",
            outline: "none",
            padding: "10px 10px",
            marginTop: "5px",
            cursor: "pointer",
            pointerEvents: isDisabled ? "none" : undefined
        }}>

        {!isSelectedSomething && <option value={defaultKey}>
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
};
