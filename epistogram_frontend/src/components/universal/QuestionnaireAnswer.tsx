import { Box, BoxProps } from '@chakra-ui/react';
import { Button } from "@mui/material";
import React, { ReactNode } from 'react';
import { EpistoButton } from './EpistoButton';

export const QuestionnaierAnswer = (props: {
    children: ReactNode,
    onClick: () => void,
    isIncorrect: boolean,
    isCorrect: boolean
} & BoxProps) => {

    const { children, onClick, isIncorrect, isCorrect, ...css } = props;

    const getBg = () => {

        if (isIncorrect)
            return "#fa6767";

        if (isCorrect)
            return "#7cf25e";

        return "white";
    }

    return <Box {...css}>
        <EpistoButton
            className="whall tinyShadow"
            variant="outlined"
            onClick={() => onClick()}
            style={{
                background: getBg(),
                borderRadius: "0",
                borderWidth: "2px"
            }}>
            {children}
        </EpistoButton>
    </Box>
}