import React from 'react';
import classes from './saveBar.module.scss'
import { Fab } from "@mui/material";
import { Add, Done, Edit } from "@mui/icons-material";
import {Flex} from "@chakra-ui/react";

export const SaveBar = (props: {
    open: boolean
    onClick: () => void
    onDoneClick?: () => void
}) => {

    return props.open ? <div className={classes.saveBarOuterWrapper}>
        <Fab className={classes.firstButton} onClick={props.onDoneClick}>
            <Done />
        </Fab>
    </div> : <Flex>
        <Fab className={classes.secondButton} onClick={props.onClick}>
            <Edit />
        </Fab>

        <Fab className={classes.firstButton}>
            <Add />
        </Fab>
    </Flex>
};