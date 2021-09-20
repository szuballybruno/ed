import { Box, Flex } from '@chakra-ui/react';
import { Button, Typography } from "@mui/material";
import React, { ReactNode } from 'react';
import { LoadingFrame } from '../HOC/LoadingFrame';
import { LoadingStateType } from '../../models/types';

export const QuestionnaierAnswer = (props: {
    children: ReactNode,
    onClick: () => void,
    isIncorrect: boolean,
    isCorrect: boolean
}) => {

    const { children, onClick, isIncorrect, isCorrect } = props;

    const getBg = () => {

        if (isIncorrect)
            return "#fa6767";

        if (isCorrect)
            return "#7cf25e";

        return "white";
    }

    return <Box p="5px">
        <Button
            variant={"contained"}
            onClick={() => onClick()}
            style={{ background: getBg() }}>
            {children}
        </Button>
    </Box>
}

export const QuestionnaireLayout = (props: {
    title: string,
    children: ReactNode,
    loadingState?: LoadingStateType,
    loadingError?: any,
    buttonsEnabled: boolean
}) => {

    const { title, buttonsEnabled, children, loadingError, loadingState } = props;

    return (
        <Flex id="questionnaireRoot" direction="column" p="20px">

            {/* title */}
            <Typography variant={"button"} style={{ fontSize: "18px", textAlign: "center" }}>
                {title}
            </Typography>

            {/* answers */}
            <LoadingFrame loadingState={loadingState ?? "idle"} error={loadingError}>
                <Flex
                    id="answersListContainer"
                    direction="column"
                    alignItems="center"
                    width="100%"
                    mt="20px"
                    pointerEvents={buttonsEnabled ? "all" : "none"}>
                    {children}
                </Flex>
            </LoadingFrame>
        </Flex>
    );
}