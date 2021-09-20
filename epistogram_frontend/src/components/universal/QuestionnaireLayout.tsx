import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { Divider, Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { LoadingStateType } from '../../models/types';
import { LoadingFrame } from '../HOC/LoadingFrame';
import { EpistoText } from './EpistoText';

export const QuestionnaireLayout = (props: {
    title: string,
    children: ReactNode,
    loadingState?: LoadingStateType,
    loadingError?: any,
    buttonsEnabled: boolean
} & FlexProps) => {

    const { title, buttonsEnabled, children, loadingError, loadingState, ...css } = props;

    return (
        <Flex id="questionnaireRoot" direction="column" p="20px" align="center" {...css}>

            {/* title */}
            <Flex align="center">
                <img
                    style={{
                        borderRadius: "50%",
                        padding: "8px",
                        width: "50px",
                        height: "50px",
                        marginRight: "20px"
                    }}
                    src="https://static.thenounproject.com/png/92068-200.png"
                    className="tinyShadow" />

                <EpistoText
                    isAutoFontSize
                    text={title}
                    style={{ width: "100%" }} />
                {/* <Typography variant={"button"} style={{ fontSize: "18px", textAlign: "center" }}>
                    {title}
                </Typography> */}
            </Flex>

            {/* divider */}
            <Box width="40%" bg="var(--epistoTeal)" height="2px" m="4px" />

            {/* answers */}
            <LoadingFrame loadingState={loadingState ?? "idle"} error={loadingError}>
                <Flex
                    id="answersListContainer"
                    direction="column"
                    width="100%"
                    mt="20px"
                    pointerEvents={buttonsEnabled ? "all" : "none"}>
                    {children}
                </Flex>
            </LoadingFrame>
        </Flex>
    );
}