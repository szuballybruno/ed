import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FlexFloat } from '../universal/FlexFloat';

export const MainWrapper = (props: { children: ReactNode }) => {

    return <Flex
        id="mainWrapper"
        direction="column"
        height="100%"
        width="100%"
        overflow="hidden">

        {props.children}
    </Flex>
};

export const ContentWrapper = (props: {
    children: ReactNode
} & FlexProps) => {

    const { children, ...css } = props;

    return <Flex
        id="contentWrapper"
        flex="1"
        overflow="hidden"
        {...css}>
        {children}
    </Flex>
};

export const LeftPanel = (props: FlexProps) => {

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPanel"
            bg="white"
            zIndex={2}
            flexBasis="400px"
            direction="column"
            align="stretch"
            padding="0 15px 0 15px"
            justify="flex-start"
            borderLeft="2px solid #e2e2e2"
            {...props}>

            {props.children}
        </FlexFloat>
    );
};

export const RightPanel = (props: FlexProps & { noPadding?: boolean }) => {

    const { noPadding, ...css } = props;

    return (
        <Flex
            id="rightPanel"
            //bg="#fafafa"
            bg="white"
            p={props.noPadding ? undefined : "20px"}
            flex="1"
            overflowX="hidden"
            overflowY="scroll"
            direction="column"
            {...css}>
            {props.children}
        </Flex>
    );
};
