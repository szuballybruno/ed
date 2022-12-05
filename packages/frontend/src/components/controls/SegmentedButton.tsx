import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ReactNode } from 'react';
import { PagingType } from '../../static/frontendHelpers';
import { segmentedButtonStyles } from './segmentedButtonStyles';

export const SegmentedButton = <T,>({
    paging,
    getDisplayValue,
    variant,
    additionalButtonStyle,
    additionalWrapperStyle
}: {
    paging: PagingType<T>,
    variant: 'default' | 'tab',
    getDisplayValue?: (item: T) => string,
    additionalButtonStyle?: React.CSSProperties,
    additionalWrapperStyle?: React.CSSProperties
}) => {

    const disp = getDisplayValue ?? ((item: T) => item);

    const stylePreset = variant === 'default'
        ? segmentedButtonStyles.default
        : segmentedButtonStyles.tab;

    const buttonStyle = variant === 'default'
        ? segmentedButtonStyles.default.toggleButtonStyle
        : undefined;

    return <>
        <ToggleButtonGroup
            sx={stylePreset.toggleButtonGroupSx}
            style={{
                ...stylePreset.toggleButtonGroupStyle,
                ...additionalWrapperStyle
            }}>

            {paging
                .items
                .map((item, index) => {

                    const isActive = index === paging.currentIndex;

                    return (
                        <ToggleButton
                            disableRipple={stylePreset.disableRipple}
                            selected={isActive}
                            style={{
                                ...stylePreset.toggleButtonStyle,
                                ...buttonStyle,
                                ...additionalButtonStyle
                            }}
                            sx={stylePreset.toggleButtonSx}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>

                            {disp(item) as ReactNode}
                        </ToggleButton>
                    );
                })}
        </ToggleButtonGroup>
    </>;
};
