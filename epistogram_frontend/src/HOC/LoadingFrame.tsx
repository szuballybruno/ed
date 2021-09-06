import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { BoxProps } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React from 'react';
import { isArray } from "../frontendHelpers";
import { LoadingStateType } from "../models/types";

export const LoadingFrame = (props: BoxProps & {
    loadingState: LoadingStateType | LoadingStateType[],
    error?: any | any[]
}) => {

    const { loadingState, error, ...rootProps } = props;
    const singleError = getError(error);
    const state = getLoadingState(loadingState);
    const showOverlay = state == "error" || state == "loading";

    return <Flex id="loadigFrameRoot" position="relative" width="100%" height="100%" flex="1" {...rootProps}>

        {/* content */}
        {props.children}

        {/* overlay */}
        {showOverlay && <Flex
            id="loadingFrameCenterFlex"
            flex="1"
            justify="center"
            align="center"
            overflow="hidden"
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            bg="#fffffff0"
            p="30px">

            {/* error */}
            {state == "error" && <Flex align="center" direction="column">
                <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
                <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
                <Text maxWidth="300px">{singleError?.message}</Text>
            </Flex>}

            {/* loading */}
            {state == "loading" && <Flex
                id="loadingDisplayContainer"
                direction="column"
                justify="center"
                align="center">

                <CircularProgress style={{ 'color': 'black' }} size={50} />

                <Box pt="20px">
                    <Typography>Loading...</Typography>
                </Box>
            </Flex>}
        </Flex>}
    </Flex>
}

const getLoadingState = (loadingState: LoadingStateType | LoadingStateType[]) => {

    if (isArray(loadingState)) {

        const loadingStates = loadingState as LoadingStateType[];

        if (loadingStates.some(x => x == "error"))
            return "error" as LoadingStateType;

        if (loadingStates.some(x => x == "idle" || x == "loading"))
            return "loading" as LoadingStateType;

        return "success" as LoadingStateType;
    }
    else {

        return loadingState as LoadingStateType;
    }
}

const getError = (error?: any | any[]) => {

    if (!error)
        return error;

    if (isArray(error))
        return (error as any[])[0];

    return error;
}