import React from 'react';
import { CircularProgress } from "@material-ui/core";
import classes from "./loadingComponents.module.scss"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const LoadingComponent = () => <div className={classes.dashBoardStateContainer}>
    <CircularProgress className={classes.loadingCircle} size={50} />
</div>

export const NullComponent = () => <div className={classes.dashBoardStateContainer} />

export const FailedComponent = (props: { error?: any }) => {

    return <Flex align="center" direction="column">
        <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
        <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
        <Text>{props.error?.message}</Text>
    </Flex>
}