import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoButton } from './EpistoButton';

export const QuestionnaierAnswerMinimal = (props: {
    children: ReactNode,
    onClick: () => void,
    isIncorrect: boolean,
    isCorrect: boolean
} & BoxProps) => {

    const { children, onClick, isIncorrect, isCorrect, ...css } = props;

    return <Box {...css}>
        <div
            onClick={() => onClick()}>
            {children}
        </div>
    </Box>
}
