import React from 'react';
import { CircularProgress, Typography } from "@material-ui/core";
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const LoadingComponent = () => {

    return <Flex
        direction="column"
        justify="center"
        align="center"
        width="100%"
        height="100vh">

        <CircularProgress style={{ 'color': 'black' }} size={50} />

        <Box padding="20px">
            <Typography>Loading...</Typography>
        </Box>
    </Flex>
}

export const FailedComponent = (props: { error?: any }) => {

    return <Flex align="center" direction="column">
        <ErrorOutlineIcon style={{ width: "100px", height: "100px" }}></ErrorOutlineIcon>
        <Heading as="h1">Az alkalmazás betöltése sikertelen</Heading>
        <Text>{props.error?.message}</Text>
    </Flex>
}