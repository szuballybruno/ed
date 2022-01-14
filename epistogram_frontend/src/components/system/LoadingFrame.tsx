import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { isArray } from "../../static/frontendHelpers";
import { LoadingStateType } from "../../models/types";

export type LoadingFramePropsType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: any | any[],
    onlyRenderIfLoaded?: boolean
};

export const LoadingFrame = (props: FlexProps & LoadingFramePropsType) => {

    const {
        loadingState,
        error,
        onlyRenderIfLoaded,
        ...rootProps
    } = props;

    const singleError = getError(error);
    const state = getLoadingState(loadingState, singleError);

    const [prevState, setPrevState] = useState<LoadingStateType>("idle");
    const showOverlay = prevState === "error" || prevState === "loading";
    const renderContent = onlyRenderIfLoaded ? !showOverlay : true;
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {

        if (prevState === state)
            return;

        if (state !== "loading") {

            setPrevState(state);
            return;
        }

        setTimeout(() => {

            setTrigger(x => x + 1);
        }, 200);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {

        if (prevState === state)
            return;

        setPrevState(state);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    const finalState = prevState;

    return <Flex
        id="loadigFrameRoot"
        position="relative"
        {...rootProps}>

        {/* content */}
        {renderContent && props.children}

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
            left="0"
            bg="var(--gradientBlueBackground)"
            p="30px">

            {/* error */}
            {finalState === "error" && <Flex align="center" direction="column">
                <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
                <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
                <Text maxWidth="300px">{singleError?.message}</Text>
            </Flex>}

            {/* loading */}
            {finalState === "loading" && <Flex
                id="loadingDisplayContainer"
                direction="column"
                justify="center"
                align="center">

                <CircularProgress style={{ 'color': 'black' }} size={50} />

                <Box pt="20px">
                    <Typography>Betöltés...</Typography>
                </Box>
            </Flex>}
        </Flex>}
    </Flex>
}

const getLoadingState = (loadingState?: LoadingStateType | LoadingStateType[], error?: any): LoadingStateType => {

    if (error)
        return "error";

    if (!loadingState)
        return "idle";

    if (isArray(loadingState)) {

        const loadingStates = loadingState as LoadingStateType[];

        if (loadingStates.some(x => x === "error"))
            return "error";

        if (loadingStates.some(x => x === "loading"))
            return "loading";

        if (loadingStates.some(x => x === "success"))
            return "success";

        return "idle";
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
