import { Box, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import classes from './mainPanels.module.scss'

export const MainWrapper = (props: { children: ReactNode }) => {

    return <Flex id="mainWrapper" direction="column" height="100vh">
        {props.children}
    </Flex>
};

// export const ContentWrapper = ({ children }: { children?: ReactNode }) => {
//     return (
//         <div className={classes.contentWrapper} style={{ background: "red" }}>
//             {children}
//         </div>
//     ) as unknown as JSX.Element;
// };

export const ContentWrapper = (props: { children: ReactNode }) => {
    return <Flex id="contentWrapper" height="100%" >
        {props.children}
    </Flex>
};

export const LeftPanel = ({ children }: { children?: ReactNode }) => {
    return (
        <Flex
            id="leftPanel"
            bg="#f2f2f2"
            flexDirection="column"
            flexBasis="400px" >
            <Box flex="1">
                <div className={classes.leftPanel}>
                    {children}
                </div>
            </Box>
        </Flex >
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
