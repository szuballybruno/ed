import { Box, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FlexFloat } from '../components/universal/FlexFloat';
import classes from './mainPanels.module.scss'

export const MainWrapper = (props: { children: ReactNode }) => {

    return <Flex id="mainWrapper" direction="column" height="100%" width="100%" overflow="hidden">
        {props.children}
    </Flex>
};

export const ContentWrapper = (props: { children: ReactNode }) => {
    return <Flex id="contentWrapper" height="100%" >
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
        </FlexFloat >
    );
};

// export const RightPanel = ({ children }: { children?: ReactNode }) => {
//     return (
//         <div className={classes.rightPanel}>
//             {children}
//         </div>
//     ) as unknown as JSX.Element;
// };

export const RightPanel = (params: { children: ReactNode }) => {
    return (
        <Box
            id="rightPanel"
            bg="#e2e2e2"
            pl="20px"
            flex="1"
            overflowX="hidden"
            overflowY="scroll"
            direction="column">
            {params.children}
        </Box>
    );
};
