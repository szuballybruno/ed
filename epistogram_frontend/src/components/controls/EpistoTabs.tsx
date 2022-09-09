import { FC } from 'react';
import { EpistoButton, EpistoButtonPropsType } from './EpistoButton';
import { EpistoFlex2 } from './EpistoFlex';

type EpistoTabProps = {
    isSelected: boolean,
    onClick: () => void
} & Omit<TabItemType<any>, 'key'> & EpistoButtonPropsType;

const EpistoTab: FC<EpistoTabProps> = ({ label, isSelected, ...flexProps }) => {

    return <EpistoButton
        variant={isSelected ? 'colored' : 'plain'}
        style={{
            margin: '0px 5px 0px 5px'
        }}
        {...flexProps}>
        {label}
    </EpistoButton>;
};

export type TabItemType<TKey> = {
    key: TKey,
    label: string,
    icon?: any,
};

export type EpistoTabsProps<TKey> = {
    selectedTabKey: TKey,
    tabItems: TabItemType<TKey>[],
    onChange: (key: TKey) => void,
    itemStyle?: (isSelected: boolean) => EpistoButtonPropsType
};

export const EpistoTabs = <TKey,>({ tabItems, selectedTabKey, itemStyle, onChange }: EpistoTabsProps<TKey>) => {

    return <EpistoFlex2>
        {tabItems
            .map((tabItem, index) => {

                const isSelected = tabItem.key === selectedTabKey;
                const { key, ...tabItemProps } = tabItem;

                return (
                    <EpistoTab
                        key={index}
                        isSelected={isSelected}
                        onClick={() => onChange(tabItem.key)}
                        {...tabItemProps}
                        {...(itemStyle ? itemStyle(isSelected) : {})} />
                );
            })}
    </EpistoFlex2>;
};