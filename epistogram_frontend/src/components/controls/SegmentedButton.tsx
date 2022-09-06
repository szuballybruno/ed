import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {CSSProperties} from 'react';
import {PagingType} from '../../static/frontendHelpers';
import {SegmentedButtonStyleType} from './segmentedButtonStyles';

export const SegmentedButton = <T,>(props: {
    paging: PagingType<T>,
    stylePreset: SegmentedButtonStyleType,
    getDisplayValue?: (item: T) => string,
    buttonStyle?: CSSProperties
}) => {

    const { paging, getDisplayValue, buttonStyle, stylePreset } = props;

    const disp = getDisplayValue ?? ((item: T) => item);

    return <>
        <ToggleButtonGroup
            sx={stylePreset.toggleButtonGroupSx}
            style={stylePreset.toggleButtonGroupStyle}>

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
                                ...buttonStyle
                            }}
                            sx={stylePreset.toggleButtonSx}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>

                            {disp(item)}
                        </ToggleButton>
                    );
                })}
        </ToggleButtonGroup>
    </>;
};
