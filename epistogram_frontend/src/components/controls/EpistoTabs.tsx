import { FC } from 'react';
import { EpistoButton, EpistoButtonPropsType } from './EpistoButton';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { segmentedButtonStyles } from './segmentedButtonStyles';

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
    onChange: (key: TKey) => void
};

export const EpistoTabs = <TKey,>({ tabItems, selectedTabKey, onChange }: EpistoTabsProps<TKey>) => {

    return <ToggleButtonGroup
        sx={segmentedButtonStyles.tab.toggleButtonGroupSx}
        style={segmentedButtonStyles.tab.toggleButtonGroupStyle}>

        {tabItems
            .map((tabItem, index) => {

                const isSelected = tabItem.key === selectedTabKey;
                const { key, ...tabItemProps } = tabItem;

                return (
                    <ToggleButton
                        key={index}
                        value={index}
                        disableRipple={segmentedButtonStyles.tab.disableRipple}
                        sx={segmentedButtonStyles.tab.toggleButtonSx}
                        style={{ ...segmentedButtonStyles.tab.toggleButtonGroupStyle, color: isSelected ? 'white' : undefined }}
                        selected={isSelected}
                        onClick={() => onChange(tabItem.key)}
                        {...tabItemProps}>

                        {tabItem.label}
                    </ToggleButton>
                );
            })}
    </ToggleButtonGroup>;
};
