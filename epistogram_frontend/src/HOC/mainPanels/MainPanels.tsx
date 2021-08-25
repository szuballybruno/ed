import { Box, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import classes from './mainPanels.module.scss'

export const MainWrapper = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.mainWrapper}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};

export const ContentWrapper = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.contentWrapper}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};

export const LeftPanel = ({ children }: { children?: ReactNode }) => {
    return (
        <Flex flexDirection="column" height="calc(100vh - 80px)" width="400px">
            <Box flex="1">
                <div className={classes.leftPanel}>
                    {children}
                </div>
            </Box>
            {/* <Box bg="red" width="100%" flexBasis="20px">

            </Box> */}
        </Flex >
    );
};

export const RightPanel = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.rightPanel}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};
