import { CSSProperties } from 'react';

export type SegmentedButtonStyleType = {
    toggleButtonGroupSx: {
        [key: string]: CSSProperties
    },
    toggleButtonSx: {
        [key: string]: CSSProperties
    },
    toggleButtonGroupStyle: CSSProperties,
    toggleButtonStyle: CSSProperties,
    disableRipple?: boolean
}

export const segmentedButtonStyles = {

    default: {
        toggleButtonSx: {

            '&.MuiToggleButton-root': {
                color: '#444',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                padding: '6px 16px',
                border: 'none',
                fontSize: '12px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                height: '41px',
                minHeight: '0px'
            },

            '&.MuiTouchRipple-root': {
                lineHeight: '0px',
                background: 'green'
            },

            '&.Mui-selected, &.Mui-selected:hover': {
                color: 'var(--eduptiveDeepDarkGreen)',
                fontWeight: 'bold',
                background: 'var(--eduptiveTransparentYellowGreen)'

            }
        },
        toggleButtonGroupSx: {
            '&.MuiToggleButtonGroup-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                minHeight: 0
            }
        },
        toggleButtonGroupStyle: {
            background: 'var(--transparentWhite90)'
        },
        toggleButtonStyle: {
            border: 'none',
            padding: '15px 25px'
        }
    } as SegmentedButtonStyleType,

    tab: {
        toggleButtonSx: {

            '&.MuiToggleButton-root': {
                color: 'var(--eduptiveDeepDarkGreen)',
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
                color: 'var(--eduptiveDeepDarkGreen)',
                fontWeight: 'bold',
                background: 'var(--eduptiveTransparentYellowGreen)'

            },
            '&.Mui-selected, &.Mui-selected:hover': {
                color: 'var(--eduptiveDeepDarkGreen)',
                fontWeight: 'bold',
                background: 'var(--eduptiveTransparentYellowGreen)' // theme.palette.primary.main
            }
        },
        toggleButtonGroupSx: {
            '&.MuiToggleButtonGroup-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                minHeight: 0
            }
        },
        toggleButtonGroupStyle: {
            borderRadius: 7
        },
        toggleButtonStyle: {
            border: 'none',
            borderRadius: 7,
            margin: '0 10px 0 5px',
            padding: '15px 15px'
        },
        disableRipple: true
    } as SegmentedButtonStyleType
};
