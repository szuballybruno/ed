import React from 'react';
import { CircularProgress, Typography } from "@material-ui/core";
import classes from "./loadingComponents.module.scss"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const LoadingComponent = () => {

    return <div className={classes.dashBoardStateContainer} >
        <CircularProgress className={classes.loadingCircle} style={{ 'color': 'black' }} size={50} />
        <Box padding="20px">
            <Typography>Loading...</Typography>
        </Box>
    </div>
}

export const NullComponent = () => <div className={classes.dashBoardStateContainer} />

export const FailedComponent = (props: { error?: any }) => {

    return <Flex align="center" direction="column">
        <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
        <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
        <Text>{props.error?.message}</Text>
    </Flex>
}