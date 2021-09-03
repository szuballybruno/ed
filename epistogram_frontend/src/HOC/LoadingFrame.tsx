import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React from 'react';
import { isArray } from "../frontendHelpers";
import { LoadingStateType } from "../models/types";

export const LoadingFrame = (props: FlexProps & {
    loadingState: LoadingStateType | LoadingStateType[],
    error?: any | any[]
}) => {

    const { loadingState, error, ...flexProps } = props;

    const getLoadingState = (loadingState: LoadingStateType | LoadingStateType[]) => {

        if (isArray(loadingState)) {

            const loadingStates = props.loadingState as LoadingStateType[];

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

    const singleError = getError(error);
    const state = getLoadingState(loadingState);
    const showContent = state == "idle" || state == "success";

    return <>
        {!showContent && <Flex
            id="loadingFrameCenterFlex"
            flex="1"
            justify="center"
            align="center"
            overflow="hidden"
            p="30px"
            {...flexProps}>

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

        {/* content */}
        {showContent && props.children}
    </>
}
