import { ArrowDropDown } from '@mui/icons-material';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from './EpistoFlex';

const defaultKey = '___default___';

export type EpistoSelectPropsType<TItem> = {
    items: TItem[],
    onSelected: (value: TItem) => void,
    getCompareKey: (item: TItem) => string,
    getDisplayValue: (item: TItem) => string,
    selectedValue?: TItem | null,
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

    return <EpistoFlex2
        position='relative'>

        <select
            className="roundBorders tinyShadow"
            onChange={(x) => onSelectedValue(x.target.value)}
            value={currentSelectedKey}
            disabled={isDisabled}
            style={{
                appearance: 'none',
                background: 'white',
                outline: 'none',
                margin: '10px 0',
                height: '40px',
                padding: '5px 10px',
                width: '100%',
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
                            ? item !== undefined && item !== null
                                ? getDisplayValue(item)
                                : ''
                            : '' + item}
                    </option>;
                })}


        </select>

        <ArrowDropDown
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                right: '10px',
                height: '20px',
                top: '20px'
            }} />
    </EpistoFlex2>;
};
