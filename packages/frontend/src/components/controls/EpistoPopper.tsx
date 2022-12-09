import { Popover } from '@mui/material';
import React, { ReactNode } from 'react';
import { FlexFloat } from './FlexFloat';

export const EpistoPopper = (props: {
    isOpen: boolean,
    target: HTMLElement | null,
    placementX?: 'left' | 'center' | 'right',
    handleClose: () => void,
    children?: ReactNode,
    style?: React.CSSProperties
}) => {

    const { target, children, isOpen, placementX, handleClose, style } = props;

    return <Popover
        open={isOpen && !!target}
        anchorEl={target}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: placementX ?? 'center',
        }}
        elevation={0}
        className="normalizeChild">

        <FlexFloat
            style={style}
            borderRadius="10px"
            direction="column"
            padding="20px">
            {children}
        </FlexFloat>
    </Popover>;
};
