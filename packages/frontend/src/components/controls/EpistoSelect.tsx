import { ArrowDropDown } from '@mui/icons-material';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2, EpistoFlex2Props } from './EpistoFlex';

const unselectedOptionKey = '___default___';

export type EpistoSelectPropsType<TItem> = {
    items: TItem[],
    onSelected: (value: TItem) => void,
    getCompareKey: (item: TItem) => string,
    getDisplayValue: (item: TItem) => string,
    selectedValue?: TItem | null,
    currentKey?: string,
    unselectedValue?: string,
    isDisabled?: boolean,
    noUnselected?: boolean,
    background?: string
};

export const EpistoSelect = <TItem,>({
    items,
    getCompareKey,
    selectedValue,
    currentKey,
    onSelected,
    getDisplayValue,
    unselectedValue,
    noUnselected,
    isDisabled,
    background,
    ...css
}: EpistoSelectPropsType<TItem> & Omit<EpistoFlex2Props, 'background'>) => {

    const onSelectedValue = (key: string) => {

        const currentItem = items
            .filter(x => getCompareKey(x) === key)[0];

        onSelected(currentItem);
    };

    const isSelectedSomething = selectedValue || currentKey;

    const currentSelectedKey = isSelectedSomething
        ? selectedValue
            ? getCompareKey(selectedValue)
            : currentKey
        : unselectedOptionKey;

    return <EpistoFlex2
        position='relative'
        {...css}>

        <select
            className="roundBorders tinyShadow"
            onChange={(x) => onSelectedValue(x.target.value)}
            value={currentSelectedKey}
            disabled={isDisabled}
            style={{
                appearance: 'none',
                background: background ?? 'white',
                outline: 'none',
                margin: '10px 0',
                height: '40px',
                padding: '5px 10px',
                width: '100%',
                cursor: 'pointer',
                pointerEvents: isDisabled ? 'none' : undefined
            }}>

            {/* render unselected option */}
            {!noUnselected && <option value={unselectedOptionKey}>
                {unselectedValue ?? translatableTexts.misc.selectOption}
            </option>}

            {/* render optiosn  */}
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
