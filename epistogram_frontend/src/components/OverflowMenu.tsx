import React, { useState, useMemo, ReactNode } from 'react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import classes from './css/stylesheet.module.css';
import { Flex } from '@chakra-ui/react';

export default function OverflowMenu(props: {
  children: any,
  className: string,
  visibilityMap: any
}) {

  const { children, className, visibilityMap } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shouldShowMenu = useMemo(() => {

    return Object.values(visibilityMap)
.some((v) => v === false);
  }, [visibilityMap]);

  if (!shouldShowMenu)
    return null;

  return (
    <Flex minWidth={40}
      width={40}
      alignItems={'center'}
      justifyContent={'center'}
      className={className}>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}>
        {children
          .map((child: any, index) => {

            if (visibilityMap[child.props['name']])
              return null;

            return (
              <MenuItem
                key={child}
                onClick={handleClose}>
                {React.cloneElement(child, {
                  className: `${child.className} ${classes.inOverflowMenu}`
                })}
              </MenuItem>
            );
          })}
      </Menu>
    </Flex>
  );
}
