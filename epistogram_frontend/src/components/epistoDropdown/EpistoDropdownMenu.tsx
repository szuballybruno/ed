import {IconButton, Menu, MenuItem} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {EpistoButton} from '../controls/EpistoButton';

type EpistoDropdownMenuItems = {
    name: string;
    onClick?: () => void;
}

type EpistoDropdownMenuProps = {
    menuItems: EpistoDropdownMenuItems[];
};

const EpistoDropdownMenu = ({menuItems}: EpistoDropdownMenuProps) => {
    const buttonRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (optionClick) => {
        optionClick();
        setAnchorEl(null);
    };

    return (
        <>
            <EpistoButton
                ref={buttonRef}
                icon={<MoreVertIcon />}
                onClick={() => setAnchorEl(buttonRef.current)}
            />
            <Menu
                anchorEl={anchorEl}
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                open={open}
                onClose={handleClose}
            >
                {menuItems.map((option) => (
                    <MenuItem
                        key={option.name}
                        onClick={() => handleMenuItemClick(option.onClick)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default EpistoDropdownMenu;
