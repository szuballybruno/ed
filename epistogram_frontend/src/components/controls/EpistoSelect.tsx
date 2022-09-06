import React from 'react';
import {translatableTexts} from '../../static/translatableTexts';

const defaultKey = '___default___';

export type EpistoSelectPropsType<TItem> = {
    items: TItem[],
    onSelected: (value: TItem) => void,
    getCompareKey: (item: TItem) => string,
    getDisplayValue: (item: TItem) => string,
    selectedValue?: TItem,
    currentKey?: string,
    defaultValue?: string,
    isDisabled?: boolean
};

export const EpistoSelect = <TItem,>(props: EpistoSelectPropsType<TItem>) => {

    const {
        items,
        getCompareKey,
        selectedValue,
        currentKey,
        onSelected,
        getDisplayValue,
        defaultValue,
        isDisabled
    } = props;

    const onSelectedValue = (key: string) => {

        const currentItem = items.filter(x => getCompareKey(x) === key)[0];

        onSelected(currentItem);
    };

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
            background: 'transparent',
            outline: 'none',
            padding: '10px 10px',
            cursor: 'pointer',
            pointerEvents: isDisabled ? 'none' : undefined
        }}>

        <option value={defaultKey}>
            {defaultValue ?? translatableTexts.misc.selectOption}
        </option>

        {items
            .map((item, index) => {

                return <option
                    key={index}
                    value={getCompareKey(item)}>
                    {getDisplayValue
                        ? getDisplayValue(item)
                        : '' + item}
                </option>;
            })}
    </select>;
};
