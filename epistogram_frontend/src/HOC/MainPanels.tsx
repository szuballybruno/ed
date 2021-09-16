import { Box, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FlexFloat } from '../components/universal/FlexFloat';

export const MainWrapper = (props: { children: ReactNode }) => {

    return <Flex id="mainWrapper" direction="column" height="100%" width="100%" maxWidth={"1920px"} overflow="hidden">
        {props.children}
    </Flex>
};

export const ContentWrapper = (props: { children: ReactNode }) => {
    return <Flex id="contentWrapper" flex="1" overflow="hidden">
        {props.children}
    </Flex>
};

export const LeftPanel = (props: { children: ReactNode }) => {
    return (
        <FlexFloat
            id="leftPanel"
            bg="white"
            flexDirection="column"
            zIndex={1}
            flexBasis="400px" >

            <Box flex="1">
                <Flex
                    direction="column"
                    align="center"
                    justify="flex-start"
                    borderLeft="2px solid #e2e2e2">
                    {props.children}
                </Flex>
            </Box>
        </FlexFloat>
    );
};

export const RightPanel = (props: { children: ReactNode, noPadding?: boolean }) => {
    return (
        <Box
            id="rightPanel"
            bg="#fafafa"
            pl={props.noPadding ? undefined : "20px"}
            flex="1"
            overflowX="hidden"
            overflowY="scroll"
            direction="column">
            {props.children}
        </Box>
    );
};
