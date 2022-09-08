import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFont } from './EpistoFont';

export const SegmentedButton = <T,>(props: {
    paging: PagingType<T>,
    getDisplayValue?: (item: T) => string,
    buttonStyle?: CSSProperties
}) => {

    const { paging, getDisplayValue, buttonStyle } = props;

    const disp = getDisplayValue ?? ((item: T) => item);

    return <>
        <ToggleButtonGroup
            sx={{
                '&.MuiToggleButtonGroup-root': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 45,
                    minHeight: 0
                }
            }}
            style={{
                background: 'var(--transparentWhite90)'
            }}>

            {paging
                .items
                .map((item, index) => {

                    const isActive = index === paging.currentIndex;

                    return (
                        <ToggleButton
                            selected={isActive}
                            style={{
                                border: 'none',
                                padding: '15px 25px',
                                ...buttonStyle
                            }}
                            sx={{
                                '&.MuiToggleButton-root': {
                                    color: '#444',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    padding: '6px 16px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '41px',
                                    minHeight: '0px'
                                },
                                '&.MuiTouchRipple-root': {
                                    lineHeight: '0px'
                                },
                                '&.Mui-selected': {
                                    color: '#444',
                                    fontWeight: 'bold',
                                    background: 'var(--transparentIntenseTeal)'
                                }
                            }}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>

                            <EpistoFont fontSize="fontNormal14">
                                {disp(item) as ReactNode}
                            </EpistoFont>
                        </ToggleButton>
                    );
                })}
        </ToggleButtonGroup>
    </>;
};